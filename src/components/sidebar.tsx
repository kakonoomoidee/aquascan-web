import { useState, useEffect, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  IconDashboard,
  IconUsers,
  IconClients,
  IconTasks,
  IconValidation,
} from "@src/components/icons/index";

const candiBentarOrnament = `
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="#a5f3fc">
    <path d="M9.79 22.42 1.5 18.25V3.75l8.29 4.17v14.5ZM22.5 18.25 14.21 22.42V8l8.29-4.25v14.5Z"/>
  </svg>
`;

const encodedSvg = `url("data:image/svg+xml,${encodeURIComponent(
  candiBentarOrnament
)}")`;

// Update interface untuk support badge
interface Menu {
  label: string;
  path: string;
  icon: ReactNode;
  subMenus?: SubMenu[];
  badge?: number;
}

interface SubMenu {
  label: string;
  path: string;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // State untuk simulasi data notifikasi dari API
  const [taskCount, setTaskCount] = useState(0);
  const [validationCount, setValidationCount] = useState(0);

  useEffect(() => {
    // Simulasi fetch data notifikasi
    const timer = setTimeout(() => {
      setTaskCount(7);
      setValidationCount(12);
    }, 1000); // Delay 1 detik

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const menus: Menu[] = [
    { label: "Dashboard", path: "/dashboard", icon: <IconDashboard /> },
    {
      label: "Manajemen User",
      path: "/users",
      icon: <IconUsers />,
      subMenus: [
        { label: "Daftar User", path: "/users/list" },
        { label: "Tambah User", path: "/users/add" },
      ],
    },
    {
      label: "Manajemen Pelanggan",
      path: "/clients",
      icon: <IconClients />,
    },
    {
      label: "Manajemen Tugas",
      path: "/tasks",
      icon: <IconTasks />,
      badge: taskCount, // data dari state
    },
    {
      label: "Validasi Input",
      path: "/validation",
      icon: <IconValidation />,
      badge: validationCount, // data dari state
    },
  ];

  const handleMenuClick = (menuLabel: string) => {
    setOpenMenu(openMenu === menuLabel ? null : menuLabel);
  };

  return (
    <div
      className="h-screen w-64 bg-sky-100 text-slate-700 flex flex-col"
      style={{
        backgroundImage: encodedSvg,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom 1rem right 1rem",
        backgroundSize: "110px",
      }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 text-2xl font-bold border-b border-sky-200 flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-sky-500"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69zm0 15.31a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
          <span>AquaScan Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menus.map((menu, idx) => {
            const isParentActive =
              menu.path && location.pathname.startsWith(menu.path);

            return (
              <div key={idx}>
                <button
                  onClick={() =>
                    menu.subMenus
                      ? handleMenuClick(menu.label)
                      : navigate(menu.path)
                  }
                  className={`w-full flex justify-between items-center text-left px-4 py-2 rounded-lg transition text-sm ${
                    isParentActive
                      ? "bg-sky-200/80 font-semibold text-sky-800"
                      : "hover:bg-sky-200/70"
                  }`}
                >
                  <span className="flex items-center">
                    <span className="w-5 h-5 mr-3">{menu.icon}</span>
                    <span>{menu.label}</span>
                  </span>
                  <div className="flex items-center">
                    {/* Logic untuk render Badge */}
                    {menu.badge && menu.badge > 0 && (
                      <span className="bg-sky-500 text-white text-xs font-bold mr-2 px-2 py-0.5 rounded-full">
                        {menu.badge}
                      </span>
                    )}
                    {menu.subMenus && (
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openMenu === menu.label ? "rotate-90" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </button>

                {menu.subMenus && openMenu === menu.label && (
                  <div className="mt-1 pl-8 space-y-1">
                    {menu.subMenus.map((subMenu, subIdx) => {
                      const isSubActive = location.pathname === subMenu.path;
                      return (
                        <button
                          key={subIdx}
                          onClick={() => navigate(subMenu.path)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                            isSubActive
                              ? "bg-sky-300/70 font-semibold text-sky-900"
                              : "hover:bg-sky-200/70"
                          }`}
                        >
                          {subMenu.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sky-200 mt-auto">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="w-full bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
