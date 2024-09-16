import refresh from "../../assets/images/Linear/Arrows/Refresh.svg";
import {useEffect, useState} from "react";
import {getAccount, getBalance, signData} from "../../../utils/MetaMask";
import * as authApi from "../../../api/auth";
import * as neobuxApi from "../../../api/neobux";
import './style.css'

export const Wallet = () => {
  const [isMobileMenuOpen, setIsMobMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 430;
  const [balance, setBalance] = useState("0.0");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBalance().then();
  }, []);

  const walletLogin = async () => {
    const account = await getAccount();
    const data = (await authApi.getData(account)).data.data;
    console.log(data, 'data acc')
    const sign = await signData(data);
    await authApi.login(account, sign);
    await getBalance();
    if(data){
      setIsAuthenticated(true)
    }
  }

  const getBalance = async () => {
    setIsLoading(true);
    const account = await getAccount();
    const balance = (await neobuxApi.balanceOf(account)).data.balance;
    setBalance(balance);
    setIsLoading(false);
  }

  console.log(isAuthenticated, 'isAuthenticated');
  console.log(balance, 'balance')

  return(
    <div className={isMobile ? "wallet-container-mob" : "wallet-container"}>
      <div className={'balance-box'}>
        <button
          className={'button-balance'}
          onClick={walletLogin}
        >
          <span>{isAuthenticated ? "Connected" : 'WalletConnect'}</span>
        </button>
        <div className={'balance-text'}>
          <span>Your Balance:</span>
          <div className={'balance-count'}>{balance} NEOBux</div>
          <button
            className={'reload-btn'}
            onClick={getBalance}
          >
            <img
              src={refresh}
              alt={'refresh-balance'}
              className={`refresh-balance ${isLoading ? 'spinning' : ''}`}
            /></button>
        </div>
      </div>
    </div>
  )
}