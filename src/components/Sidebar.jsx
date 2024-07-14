import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { LiaMailBulkSolid } from "react-icons/lia";

function Sidebar() {
  const Menu = [
    { title: "Arsip", path: "/arsip", icon: <IoMail size={23} /> },
    { title: "Kategori Arsip", path: "/kategori", icon: <IoMdListBox size={24} /> },
    { title: "About", path: "/about", icon: <MdAccountCircle size={24} /> },
  ];

  return (
    <aside className="w-60 h-full bg-cyan-800">
      <div className="flex items-center gap-2 px-5 py-5 bg-slate-800">
        <LiaMailBulkSolid size={60} color="white" />
        <h1 className="font-bold text-lg text-white">Arsip Surat Kedungduren</h1>
      </div>

      {/* Border */}
      <div className="border-b-2 border-slate-100 mt-5 mx-3" />

      {/* Menu */}
      <ul className="mt-3">
        {Menu.map((menu, index) => (
          <Link to={menu.path} key={index}>
            <div className=" flex items-center pl-7 hover:bg-cyan-600">
              <span className="text-white">{menu.icon}</span>
              <li className="font-semibold py-2 pl-3 text-white">{menu.title}</li>
            </div>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
