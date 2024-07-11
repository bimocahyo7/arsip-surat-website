import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { SiMailtrap } from "react-icons/si";

function Sidebar() {
  const Menu = [
    { title: "Arsip", path: "/arsip", icon: <IoMail size={23} /> },
    { title: "Kategori Arsip", path: "/kategori", icon: <IoMdListBox size={24} /> },
    { title: "About", path: "/about", icon: <MdAccountCircle size={24} /> },
  ];

  return (
    <aside className="w-64 h-full bg-zinc-400">
      <div className="flex items-center gap-2 px-5 py-5 bg-slate-800">
        <SiMailtrap size={33} color="white" />
        <h1 className="font-bold text-xl text-white">Web Arsip Surat</h1>
      </div>

      {/* Border */}
      <div className="border-b-2 border-slate-100 mt-5 mx-3" />

      {/* Menu */}
      <ul className="mt-3">
        {Menu.map((menu, index) => (
          <Link to={menu.path} key={index}>
            <div className=" flex items-center pl-4 hover:bg-amber-200">
              <span className="text-slate-800">{menu.icon}</span>
              <li className="font-semibold py-2 pl-2 text-gray-800">{menu.title}</li>
            </div>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
