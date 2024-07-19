import React, { useEffect } from 'react';
import './style.css';

export const ShopifyProduct = () => {
  useEffect(() => {
    const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptURL;
      document.head.appendChild(script);
      script.onload = ShopifyBuyInit;
    };

    const ShopifyBuyInit = () => {
      const client = ShopifyBuy.buildClient({
        domain: '6dfefc-68.myshopify.com',
        storefrontAccessToken: '84f7ef9813778955f8b46d985eb6cd1b',
      });

      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: '7904052084889',
          node: document.getElementById('product-component-1721400489729'),
          moneyFormat: '%E2%82%B4%7B%7Bamount%7D%7D',
          options: {
            "product": {
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "20px",
                    "margin-bottom": "50px"
                  }
                }
              },
              "text": {
                "button": "Add to cart"
              }
            },
            "productSet": {
              "styles": {
                "products": {
                  "@media (min-width: 601px)": {
                    "margin-left": "-20px"
                  }
                }
              }
            },
            "modalProduct": {
              "contents": {
                "img": false,
                "imgWithCarousel": true,
                "button": false,
                "buttonWithQuantity": true
              },
              "styles": {
                "product": {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px"
                  }
                }
              },
              "text": {
                "button": "Add to cart"
              }
            },
            "option": {},
            "cart": {
              "text": {
                "total": "Subtotal",
                "button": "Checkout"
              }
            },
            "toggle": {}
          },
        });
      });
    };

    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    return () => {
      const script = document.querySelector(`script[src="${scriptURL}"]`);
      if (script) {
        script.remove();
      }
    };
  }, []);

  return <div id="product-component-1721400489729" className="product-box"></div>;
};
