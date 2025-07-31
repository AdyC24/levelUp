import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

useEffect(() => {
const fetchStudents = async () => {
    try {
    const response = await fetch("/api/students", {
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
        },
        credentials: "include", // letakkan di sini jika kamu pakai cookie-based auth
    });
    if (!response.ok) throw new Error("Gagal memuat data siswa");

    const data = await response.json();
    setStudents(data);
    } catch (err) {
    setError(err.message);
    } finally {
    setLoading(false);
    }
};

fetchStudents();
}, []);


  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border rounded shadow-md animate-pulse space-y-2">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div className="text-red-600 text-center mt-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700"> Daftar Siswa</h1>

      <div className="flex justify-end mb-4">
        <button
         onClick={() => navigate("/register-student")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
        >
          + Tambah Siswa
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-md">
            <thead className="bg-gray-100 text-gray-700">
            <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Nomor HP</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student, index) => (
                <tr
                key={student._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-all"
                >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                    {student.userId.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.userId.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.nomorHp}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

    </div>
  );
}
