import React, { useEffect } from 'react';
import Client from 'shopify-buy';
import './style.css';

export const ShopifyProduct = () => {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };

    const ShopifyBuyInit = () => {
      const client = Client.buildClient({
        domain: '6dfefc-68.myshopify.com',
        storefrontAccessToken: '84f7ef9813778955f8b46d985eb6cd1b',
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        ui.createComponent('collection', {
          id: '328560476313',
          node: document.getElementById('collection-component-1721657618151'),
          moneyFormat: '%E2%82%B4%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': 'calc(33.33333% - 30px)',
                    'margin-left': '30px',
                    'margin-bottom': '50px',
                    width: 'calc(33.33333% - 30px)',
                  },
                  img: {
                    height: 'calc(100% - 15px)',
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    top: '0',
                  },
                  imgWrapper: {
                    'padding-top': 'calc(75% + 15px)',
                    position: 'relative',
                    height: '0',
                  },
                },

                button: {
                  color: '#000000',
                  ':hover': {
                    color: '#000000',
                    'background-color': '#954dc8',
                  },
                  'background-color': '#a656de',
                  ':focus': {
                    'background-color': '#954dc8',
                  },
                },
              },
              text: {
                button: 'Add to cart',
              },
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': {
                    'margin-left': '-30px',
                  },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  color: '#000000',
                  ':hover': {
                    color: '#000000',
                    'background-color': '#954dc8',
                  },
                  'background-color': '#a656de',
                  ':focus': {
                    'background-color': '#954dc8',
                  },
                },
              },
              text: {
                button: 'Add to cart',
              },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  color: '#000000',
                  ':hover': {
                    color: '#000000',
                    'background-color': '#954dc8',
                  },
                  'background-color': '#a656de',
                  ':focus': {
                    'background-color': '#954dc8',
                  },
                },
              },
              text: {
                total: 'Subtotal',
                button: 'Checkout',
              },
            },
            toggle: {
              styles: {
                toggle: {
                  'background-color': '#a656de',
                  ':hover': {
                    'background-color': '#954dc8',
                  },
                  ':focus': {
                    'background-color': '#954dc8',
                  },
                },
                count: {
                  color: '#000000',
                  ':hover': {
                    color: '#000000',
                  },
                },
                iconPath: {
                  fill: '#000000',
                },
              },
            },
          },
        });
      });
    };

    const initShopify = async () => {
      if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
          ShopifyBuyInit();
        } else {
          await loadScript(scriptURL);
          ShopifyBuyInit();
        }
      } else {
        await loadScript(scriptURL);
        ShopifyBuyInit();
      }
    };

    initShopify();
  }, []);

  return <div id="collection-component-1721657618151"></div>;
};
