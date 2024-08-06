import React, { useEffect } from 'react';

export const ShopifyProduct = () => {

  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          existingScript.onload ? resolve() : existingScript.addEventListener('load', resolve);
        } else {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    };

    const ShopifyBuyInit = () => {
      const client = window.ShopifyBuy.buildClient({
        domain: '6dfefc-68.myshopify.com',
        storefrontAccessToken: '84f7ef9813778955f8b46d985eb6cd1b',
      });

      window.ShopifyBuy.UI.onReady(client).then((ui) => {
        if (!document.querySelector('.shopify-buy-frame')) {
          ui.createComponent('collection', {
            id: '331566383257',
            node: document.getElementById('collection-component-1721827904642'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
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
                  title: {
                    color: '#FBFBFB',
                  },
                  button: {
                    'font-weight': 'bold',
                    ':hover': {
                      'background-color': '#DE0C71',
                    },
                    'background-color': '#F70D7E',
                    ':focus': {
                      'background-color': '#DE0C71',
                    },
                  },
                  price: {
                    color: '#FFFFFF',
                  },
                  compareAt: {
                    color: '#FFFFFF',
                  },
                  unitPrice: {
                    color: '#FFFFFF',
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
                    'font-weight': 'bold',
                    ':hover': {
                      'background-color': '#DE0C71',
                    },
                    'background-color': '#F70D7E',
                    ':focus': {
                      'background-color': '#DE0C71',
                    },
                  },
                  title: {
                    'font-family': 'Helvetica Neue, sans-serif',
                    'font-weight': 'bold',
                    'font-size': '26px',
                    color: '#4C4C4C',
                  },
                  price: {
                    'font-family': 'Helvetica Neue, sans-serif',
                    'font-weight': 'normal',
                    'font-size': '18px',
                    color: '#4C4C4C',
                  },
                  compareAt: {
                    'font-family': 'Helvetica Neue, sans-serif',
                    'font-weight': 'normal',
                    'font-size': '15.3px',
                    color: '#4C4C4C',
                  },
                  unitPrice: {
                    'font-family': 'Helvetica Neue, sans-serif',
                    'font-weight': 'normal',
                    'font-size': '15.3px',
                    color: '#4C4C4C',
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
                    'font-weight': 'bold',
                    ':hover': {
                      'background-color': '#DE0C71',
                    },
                    'background-color': '#F70D7E',
                    ':focus': {
                      'background-color': '#DE0C71',
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
                    'font-weight': 'bold',
                    'background-color': '#F70D7E',
                    ':hover': {
                      'background-color': '#DE0C71',
                    },
                    ':focus': {
                      'background-color': '#DE0C71',
                    },
                  },
                },
              },
            },
          });
        }
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

  return <div id="collection-component-1721827904642"></div>;
};
