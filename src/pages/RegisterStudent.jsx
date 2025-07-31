import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    nomorHp: "",
    jenjang: "",
    program: [],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prev) => ({ ...prev, program: [...prev.program, value] }));
    } else {
      setForm((prev) => ({
        ...prev,
        program: prev.program.filter((p) => p !== value),
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nama || !form.email || !form.nomorHp || !form.jenjang || !form.password) {
      setError("Semua bidang harus diisi.");
      return;
    }

    try {
      // Ganti URL ini dengan endpoint API kamu
      const res = await fetch("/api/siswa/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Pendaftaran gagal");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Pendaftaran Siswa Baru
          </h2>

          {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bagian Siswa */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Data Siswa</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="namaSiswa">Nama Lengkap</Label>
                  <Input name="namaSiswa" value={form.namaSiswa} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="emailSiswa">Email Siswa</Label>
                  <Input name="emailSiswa" type="email" value={form.emailSiswa} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="nomorHpSiswa">Nomor HP Siswa</Label>
                  <Input name="nomorHpSiswa" type="tel" value={form.nomorHpSiswa} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="jenjang">Jenjang Pendidikan</Label>
                  <select
                    name="jenjang"
                    value={form.jenjang}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">-- Pilih Kelas --</option>
                    {Array.from({ length: 9 }, (_, i) => (
                      <option key={i + 1} value={`kelas${i + 1}`}>
                        Kelas {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Program Belajar</h3>
              <div className="space-y-2">
                {["Matematika", "IPA", "IPS"].map((prog) => (
                  <label key={prog} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={prog}
                      checked={form.program.includes(prog)}
                      onChange={handleCheckboxChange}
                    />
                    <span className="capitalize">{prog}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Bagian Orang Tua */}
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Data Orang Tua / Wali</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="namaOrangTua">Nama Orang Tua</Label>
                  <Input name="namaOrangTua" value={form.namaOrangTua} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="emailOrangTua">Email Orang Tua</Label>
                  <Input name="emailOrangTua" type="email" value={form.emailOrangTua} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="nomorHpOrangTua">Nomor HP Orang Tua (opsional)</Label>
                  <Input name="nomorHpOrangTua" type="tel" value={form.nomorHpOrangTua} onChange={handleChange} />
                </div>
              </div>
            </div>

            <Button type="submit" className="mt-4 w-full">
              Daftar Sekarang
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
