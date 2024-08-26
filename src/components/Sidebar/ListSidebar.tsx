import { NavLink, useLocation } from 'react-router-dom';
import { sidebarItems } from './SidebarItem';

const ListSidebar = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <ul>
        {sidebarItems.map((item: any, index) => {
          const isActive = pathname === item.route ||
            (pathname.startsWith(item.route) && pathname[item.route.length] === '/');
          const IconComponent = item.icon;
          return (
            <li key={index}>
              <NavLink
                to={item.route}
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${isActive && 'bg-graydark dark:bg-meta-4'
                  }`}
              >
                <div>
                  <IconComponent route={item.route} /> {/* Use the component here */}
                </div>
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListSidebar;
