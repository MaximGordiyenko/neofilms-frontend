import React, { useEffect, useState, forwardRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { NAVBAR_TABS } from '../../constants/homePageConst';
import './style.scss';

export const Navbar = forwardRef((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navbarHeight, setNavbarHeight] = useState(null);
  const [initialActive, setInitialActive] = useState(location.pathname);
  const [isWeb3DropdownVisible, setIsWeb3DropdownVisible] = useState(false);

  useEffect(() => {
    setInitialActive(location.pathname);
  }, [location.pathname, navbarHeight]);


  const handleLinkClick = (path, inside_page = true, external = false, openInNewTab = false) => {
    if (external) {
      window.location.href = path;
      return;
    }
    if (!inside_page) {
      window.location.href = path;
      return;
    }
    setInitialActive(path);
    setIsWeb3DropdownVisible(false);
    window.scrollTo({ top: 0 });
    navigate(path);
  };

  return (
    <div className="navbar-wrapper" ref={ref}>
      <div className={'nav-inner-content'}>
        <div className="navigation-container">
          {NAVBAR_TABS.map((item, i) => {
            const isActive = location.pathname === item.path || initialActive === item.path;
            return (
              <div className={`tab-btn ${isActive ? 'active' : ''}`} key={i}>
                {item.dropdown ? (
                  <>
                    <div
                      className="dropdown"
                      onClick={() => {
                        if (item.title === 'web3') {
                          setIsWeb3DropdownVisible(!isWeb3DropdownVisible);
                        } else {
                          handleLinkClick(item.path, true, false, item.openInNewTab);
                        }
                      }}>
                      <Link
                        to={item.path}
                        className={`nav-title ${isActive ? 'active-link' : ''}`}
                        onClick={() => {
                          if (item.title === 'web3') {
                            setIsWeb3DropdownVisible(!isWeb3DropdownVisible);
                          } else {
                            handleLinkClick(item.path, true, false, item.openInNewTab);
                          }
                        }}>
                        {item.title} {item.icon && <img src={item.icon} />}
                      </Link>
                      {isWeb3DropdownVisible && item.title === 'web3' && (
                        <div className="dropdown-content">
                          {item.dropdown.map((dropdownItem, j) => (
                            <a
                              href={dropdownItem.inside_page ? undefined : dropdownItem.path}
                              onClick={() => dropdownItem.inside_page && handleLinkClick(dropdownItem.path, dropdownItem.inside_page, dropdownItem.external, dropdownItem.openInNewTab)}
                              key={j}
                              className={`nav-title ${
                                location.pathname === dropdownItem.path ? 'active-link' : ''
                              }`}>
                              {dropdownItem.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-title ${isActive ? 'active-link' : ''}`}
                    onClick={() => handleLinkClick(item.path, true, false, item.openInNewTab)}
                    style={isActive ? { color: '#FFFFFF', opacity: 1 } : {}}>
                    {item.title} {item.icon && <img src={item.icon} />}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

});
