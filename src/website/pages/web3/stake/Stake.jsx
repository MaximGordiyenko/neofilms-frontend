import { HeaderStaking } from './header/StakingHeader';
import { FooterCreds } from '../../../components/credsFooter/FooterCreds';
import { StakingBody } from './body/StakingBody';
import { useEffect, useState } from 'react';
import { CustomModal } from '../../../components/modal/Modal';
import { Button } from '../../../components/button/Button';
import Checkbox from '../../../components/checkbox/Checkbox';
import { MobButton } from '../../../components/button/MobButton';
export const NeoStaking = () => {
  const [isOpen, setIsOpen] = useState(localStorage.getItem('agreed') !== 'true');
  const [agreed, setAgreed] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem('agreed', 'true');
  };
  function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('selected');
  }

  const isMobile = window.innerWidth <= 430;

  const modalContent = (
    <div className="modal-content-box">
      <h2>STAKING & REWARDS INSTRUCTIONS</h2>
      <div className="list">
        <ul>
          <li>With NEO Staking you can Stake and Unstake at any time</li>
          <li>
            While your NFTs are staked, they will be moved to a staking contract, upon unstaking
            they will return to your wallet
          </li>
          <li>NEOBux only accumulate during the time your NFT(s) are staked</li>
          <li>
            When Purchasing Reward NFTs: Holders are only eligible to redeem 1 Reward NFT per each
            founder pass/ genesis NFT you hold at the time of the snapshot for the Reward Period
          </li>
          <li>Your NEOBux will remain claimable even if you unstake as long as you hold the NFT</li>
          <li>All Reward NFT purchases will be verified by the NEO Masterpiece Films team</li>
          <li>If you are not eligible; we will notify you and return your NEOBux</li>
          <li>Successful verifications will have their Reward NFTs airdropped with 72 hours</li>
        </ul>
        <p> For all questions: please submit a ticket in the NEO discord server</p>
      </div>
      <div className="agreement">
        <div className="agreement-text">
          <Checkbox onChange={setAgreed} />
          <span style={isMobile ? { fontSize: '10px' } : {}}>
            I have read and understand the above
          </span>
        </div>
        <Button text="i agree" disabled={!agreed} onClick={() => closeModal()} />
      </div>
    </div>
  );
  return (
    <>
      <HeaderStaking />
      <StakingBody />
      <FooterCreds />
      {isOpen && <CustomModal isOpen={isOpen} onClose={closeModal} content={modalContent} />}
    </>
  );
};
