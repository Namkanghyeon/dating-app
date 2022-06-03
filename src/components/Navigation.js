import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const menu_list = [
    { menu: 'Home', path: '/', icon: faSeedling },
    { menu: 'Matched', path: '/matched', icon: faHeart },
    { menu: 'My Page', path: '/myprofile', icon: faUser },
  ];

  const pathCheck = (match) => {
    return match === window.location.pathname
      ? 'selected-menu'
      : 'navigation-menu';
  };

  return (
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
  );
};

export default Navigation;
