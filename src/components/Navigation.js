import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  const menu_list = [
    { menu: 'Home', path: '/home', icon: faSeedling },
    { menu: 'Matched', path: '/matched', icon: faHeart },
    { menu: 'My Page', path: '/mypage', icon: faUser },
  ];

  const need_navbar_paths = new Set([
    '/home',
    '/matched',
    '/mypage',
    '/edit',
    '/delete',
  ]);

  const location = useLocation();

  const pathCheck = (match) => {
    return match === location.pathname ? 'selected-menu' : 'navigation-menu';
  };

  return (
    <>
      {need_navbar_paths.has(location.pathname) && (
        <nav className="container">
          <ul className="navigation-container">
            {menu_list.map((menu) => (
              <li className={pathCheck(menu.path)}>
                <Link to={menu.path} className="navigation-link">
                  <FontAwesomeIcon icon={menu.icon} size="3x" />
                  <span style={{ marginTop: 5 }}>{menu.menu}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
