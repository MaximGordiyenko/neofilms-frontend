import xmark from '../../assets/images/side-menu-x.svg';
import './style.scss';
import { NAVBAR_TABS } from '../../constants/homePageConst';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MobMenu = ({ onClose, isOpen }) => {
  const location = useLocation();
  const [initialActive, setInitialActive] = useState(location.pathname);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // If the menu is closing, add a delay to allow the animation to complete before resetting initialActive
      setClosing(true);
      setTimeout(() => {
        setClosing(false);
        setInitialActive(location.pathname);
      }, 300); // Adjust the duration to match the animation duration
    }
  }, [isOpen, location.pathname]);

  const handleLinkClick = (path, hasDropdown) => {
    if (hasDropdown) {
      // Toggle the display of the web3 dropdown without closing the menu
      setInitialActive(path);
    } else {
      // Close the menu and set the initialActive when a link without a dropdown is clicked
      setInitialActive(path);
      setClosing(true);
      onClose(); // Close the menu
    }
  };

  const menuClassName = isOpen
    ? 'mob-menu-wrapper menu-slide-in'
    : closing
      ? 'mob-menu-wrapper menu-slide-out'
      : 'mob-menu-wrapper';
  return (
    <div className={menuClassName}>
      <img src={xmark} alt={'xmark-mob'} onClick={onClose} className={'xmark'} />
      <div className={'nav-tabs-mobile'}>
        {NAVBAR_TABS.map((item, i) => {
          const isActive = location.pathname === item.path || initialActive === item.path;
          return (
            <div className={`tab-btn ${isActive ? 'active' : ''}`} key={i}>
              {item.title === 'web3' ? (
                <>
                  <div
                    className="nav-title"
                    onClick={() => handleLinkClick(item.path, true)} // Pass true to indicate it has a dropdown
                  >
                    {item.title} {(item.mark && <p>{item.mark}</p>) || <img src={item.icon} />}
                  </div>
                  {isActive && (
                    <div className="web3-list">
                      {item.dropdown.map((dropdownItem, j) => (
                        <Link
                          to={dropdownItem.path}
                          key={j}
                          className={`nav-title ${
                            location.pathname === dropdownItem.path ? 'active-link' : ''
                          }`}
                          onClick={() => {
                            setInitialActive(dropdownItem.path);
                            onClose(); // Close the menu when a link in web3 list is clicked
                          }}>
                          {dropdownItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-title ${isActive ? 'active-link' : ''}`}
                  onClick={() => handleLinkClick(item.path, false)} // Pass false to indicate no dropdown
                  style={isActive ? { color: '#FFFFFF', opacity: 1 } : {}}>
                  {item.title} {(item.mark && <p>{item.mark}</p>) || <img src={item.icon} />}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
