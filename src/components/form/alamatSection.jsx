import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AlamatSection({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="jalan">Jalan</Label>
        <Input
          id="jalan"
          name="jalan"
          value={formData.jalan || ""}
          onChange={handleChange}
          placeholder="Contoh: Jl. Kenanga No. 12"
        />
      </div>

      <div>
        <Label htmlFor="kelurahan">Kelurahan</Label>
        <Input
          id="kelurahan"
          name="kelurahan"
          value={formData.kelurahan || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="kecamatan">Kecamatan</Label>
        <Input
          id="kecamatan"
          name="kecamatan"
          value={formData.kecamatan || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="kota">Kota/Kabupaten</Label>
        <Input
          id="kota"
          name="kota"
          value={formData.kota || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="provinsi">Provinsi</Label>
        <Input
          id="provinsi"
          name="provinsi"
          value={formData.provinsi || ""}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="kodePos">Kode Pos</Label>
        <Input
          id="kodePos"
          name="kodePos"
          value={formData.kodePos || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
