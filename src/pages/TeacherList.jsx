import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    fetch("/api/teachers") // pastikan endpoint ini tersedia di backend
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data guru", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Memuat daftar guru...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Daftar Guru</h2>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daftar Guru</h2>
        <button
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => navigate("/register-teacher")}
        >
          ➕ Teacher
        </button>
      </div>
      {teachers.length === 0 ? (
        <p>Tidak ada guru yang terdaftar.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-2 border">Nama</th>
              <th className="px-3 py-2 border">Mata Pelajaran</th>
              <th className="px-3 py-2 border">Tanggal Daftar</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{t.name}</td>
                <td className="border px-3 py-2">{t.subject || '-'}</td>
                <td className="border px-3 py-2">
                  {new Date(t.createdAt).toLocaleDateString()}{" "}
                  {new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td className="border px-3 py-2">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                    Aktif
                  </span>
                </td>
                <td className="border px-3 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline text-xs">Detail</button>
                  <button className="text-gray-600 hover:underline text-xs">Edit</button>
                  <button className="text-red-600 hover:underline text-xs">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
