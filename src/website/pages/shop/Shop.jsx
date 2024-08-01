import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/header/Header';
import { FooterCreds } from '../../components/credsFooter/FooterCreds';
import satelite from '../../assets/images/constructor-img.svg';
import './style.scss';
import { MobMenu } from '../../components/mobileMenu/MobMenu';
import menuMobile from '../../assets/images/burger-menu.svg';
import { Navbar } from '../../components/navbar/Navbar';
import { Text } from "../../components/text/Text";
import {ShopifyProduct} from "../../components/product/product";
import {ShopHeader} from "./header/ShopHeader";
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
