import './style.scss';
import {ShopBody} from "./body/ShopBody";
import {ShopFooter} from "./footer/ShopFooter";

const Shop = () => {
  return (
    <div className={'soon-page-wrapper'}>
      {/*<ShopHeader />*/}
      <ShopBody />
      <ShopFooter />
    </div>
  );
};

export default Shop;
