import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AlamatSection from "../components/form/alamatSection";

export default function RegisterParent() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    hp: "",
    pekerjaan: "",
    jalan: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    kodePos: "",
    });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
 
      // Ganti URL ini sesuai backend API kamu
      const res = await fetch("/api/parents/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Gagal mendaftar. Cek kembali input.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Berhasil!</h2>
        <p>Email aktivasi telah dikirim ke alamat orang tua.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardContent className="space-y-4 py-6">
          <h2 className="text-xl font-semibold">Daftarkan Orang Tua</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input name="nama" value={form.nama} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="hp">No. HP</Label>
              <Input name="hp" value={form.hp} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="pekerjaan">Pekerjaan</Label>
              <Input name="pekerjaan" value={form.pekerjaan} onChange={handleChange} />
            </div>
            <AlamatSection formData={form} setFormData={setForm} />
            <Button type="submit" disabled={loading}>
              {loading ? "Mendaftarkan..." : "Daftarkan Orang Tua"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
