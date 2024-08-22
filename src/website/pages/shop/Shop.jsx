import './style.scss';
import {ShopBody} from "./body/ShopBody";
import {ShopFooter} from "./footer/ShopFooter";
import bg from '../../assets/images/image 66.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useMediaQuery} from "@mui/material";

const Shop = () => {
  const isMobile = useMediaQuery('(max-width: 430px)');
  return (
    <div className={'soon-page-wrapper'}>
      {/*<ShopHeader />*/}
      {/*{!isMobile && <LazyLoadImage src={bg} wrapperClassName='shop-header-box' effect='blur'/>}*/}
      <ShopBody />
      <ShopFooter />
    </div>
  );
};

export default Shop;
