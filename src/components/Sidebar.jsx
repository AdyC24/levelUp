import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(prev => (prev === menu ? "" : menu));
  };

  const linkClass = ({ isActive }) =>
    `block px-2 py-1 rounded ${isActive ? 'bg-blue-700 font-semibold' : 'hover:bg-blue-800'}`;

  return (
    <div className="w-64 h-full bg-blue-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">LevelUp</h2>
      <ul className="space-y-2">
        {/* Dashboard */}
        <li>
          <NavLink to="/dashboard/student" className={linkClass}>
            Dashboard
          </NavLink>
        </li>

        {/* Pengguna */}
       <li>
          <button
            onClick={() => toggleMenu("pengguna")} 
            className="flex items-center justify-between w-full hover:underline py-1"
          >
            <span>Pengguna</span>
            {openMenu === "pengguna" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenu === "pengguna" && (
            <ul className="ml-4 mt-1 space-y-1 text-sm">
              <li>
                <NavLink to="/users/teachers" className={linkClass}>Daftar Guru</NavLink>
              </li>
              <li>
                <NavLink to="/users/students" className={linkClass}>Daftar Siswa</NavLink>
              </li>
            </ul>
          )}
        </li>


        {/* Kelas & Kurikulum */}
        <li>
          <button
            onClick={() => toggleMenu("kurikulum")}
            className="flex items-center justify-between w-full hover:underline py-1"
          >
            <span>Kelas & Kurikulum</span>
            {openMenu === "kurikulum" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenu === "kurikulum" && (
            <ul className="ml-4 mt-1 space-y-1 text-sm">
              <li><NavLink to="/kelas" className={linkClass}>Daftar Kelas</NavLink></li>
              <li><NavLink to="/kurikulum" className={linkClass}>Kelola Kurikulum</NavLink></li>
              <li><NavLink to="/kompetensi" className={linkClass}>Kompetensi</NavLink></li>
            </ul>
          )}
        </li>

        {/* Materi & Soal */}
        <li>
          <button
            onClick={() => toggleMenu("materi")}
            className="flex items-center justify-between w-full hover:underline py-1"
          >
            <span>Materi & Soal</span>
            {openMenu === "materi" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenu === "materi" && (
            <ul className="ml-4 mt-1 space-y-1 text-sm">
              <li><NavLink to="/materi" className={linkClass}>Materi Pembelajaran</NavLink></li>
              <li><NavLink to="/bank-soal" className={linkClass}>Bank Soal</NavLink></li>
              <li><NavLink to="/tugas-kuis" className={linkClass}>Tugas & Kuis</NavLink></li>
            </ul>
          )}
        </li>

        {/* Logout */}
        <li className="mt-6">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-red-300 hover:text-red-500"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
