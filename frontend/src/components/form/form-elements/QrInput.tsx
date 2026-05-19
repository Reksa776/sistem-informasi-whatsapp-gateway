import { useState, useEffect } from "react";
import axios from "axios";
import ComponentCard from "../../common/ComponentCard";


export default function QrInput() {
  const [qrCode, setQrCode] = useState<string>("");
  const [status, setStatus] = useState("loading");
  interface User {
    number?: string;
    name?: string;
  }
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const response = await axios.get("http://localhost:5000/qr");
        if (response.data.qr !== null) {
          setQrCode(response.data.qr);
          setStatus("scan");
          setUser(response.data.user)
        }else if (response.data.qr === null) {
          setQrCode(response.data.qr);
          setStatus("connected");
          setUser(response.data.user)
        }else {
          setQrCode(response.data.qr);
          setStatus("loading");
          setUser(response.data.user)
        }
      } catch (error) {
        console.error("Gagal mengambil QR Code:", error);
        setStatus("error");
      }
    };
    fetchQR();
    const interval = setInterval(fetchQR, 5000);
    return () => clearInterval(interval);
  }, []);


  return (

    <div>
      {status === "loading" && <ComponentCard title="Memuat..." children={undefined} />}
      {status === "scan" && (
        <>
          <ComponentCard title="Scan QR untuk login WhatsApp">
            <div className="space-y-6">
              <img src={qrCode} alt="QR Code" className="mt-4 w-60 h-60" />
              <br />
              <p>Untuk logout:</p>
              <p>1. Buka titik tiga di kanan atas aplikasi Whatsapp</p>
              <p>2. Masuk ke Linked devices</p>
              <p>3. Pilih Link a Device</p>
            </div>
          </ComponentCard>
        </>
      )}
      {status === "connected" && (
        <>
          <ComponentCard title="✅ WhatsApp Terhubung!">
            <div className="space-y-6">
              <p>📞 Nomor: +{user.number}</p>
              <p>📱 Name: {user.name}</p>
              <br />
              <p>Untuk logout:</p>
              <p>1. Buka titik tiga di kanan atas aplikasi Whatsapp</p>
              <p>2. Masuk ke Linked devices</p>
              <p>3. Pilih Google Chrome (Ubuntu)</p>
              <p>4. Kemudian Logout</p>
            </div>
          </ComponentCard>
        </>
      )}
      {status === "error" && (
        <ComponentCard title="Terjadi kesalahan!" children={undefined}>

        </ComponentCard>
      )}
    </div>
  );
}
