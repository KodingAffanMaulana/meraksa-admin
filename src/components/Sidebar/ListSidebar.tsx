import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { sidebarItems } from './SidebarItem';

const ListSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <ul>
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.route}
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes(item.route) && 'bg-graydark dark:bg-meta-4'
                }`}
            >
              <div>
                <item.icon /> {/* Gunakan komponen ikon di sini */}
              </div>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSidebar;
