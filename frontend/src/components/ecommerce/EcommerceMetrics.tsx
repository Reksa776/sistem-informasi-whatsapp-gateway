import { useEffect, useState } from "react";
import {
  DocsIcon,
  GridIcon,
  GroupIcon,
  ListIcon,
  MailIcon,
  PieChartIcon,
  UserCircleIcon
} from "../../icons";
import API, { getBalasOtomatis, getGroup, getJadwalPesan, getKategori, getKontak, getUser } from "../../services/api";
import { jwtDecode } from "jwt-decode";


export default function EcommerceMetrics() {
  const [kategori, setKategori] = useState<any[]>([]);
  const [group, setGroup] = useState<any[]>([]);
  const [kontak, setkontak] = useState<any[]>([]);
  const [balasOtomatis, setbalasOtomatis] = useState<any[]>([]);
  const [jadwalPesan, setjadwalPesan] = useState<any[]>([]);
  const [daftarPesan, setdaftarPesan] = useState<any[]>([]);
  const [user, setuser] = useState<any[]>([]);
  // Remove unused messages state
  // const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token') ?? ""; // Ensure token is always a string
  // Fix jwtDecode type: use 'any' to access 'role'
  const role = jwtDecode(token) as any;

  useEffect(() => {
    loadData();
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const { data } = await API.get("/messages");
      const msgs = data?.messages || [];


      // ambil daftar kontak dari pesan
      const contactMap = new Map();
      for (const m of msgs) {
        const name = await getKontak(token);
        const data = name.data;
        const nomorPengirim = m.from.replace("@s.whatsapp.net", "").trim();
        // Explicitly type item as any
        const kontak = data.find((item: any) => item.nomor === nomorPengirim);
        const kondisi = kontak ? kontak.name : nomorPengirim;
        const jid = m.from;
        const prev = contactMap.get(jid);
        if (!prev || new Date(m.timestamp as any).getTime() > new Date(prev.lastTime as any).getTime()) {
          contactMap.set(jid, {
            jid,
            name: kondisi,
            lastText: m.text,
            lastTime: m.timestamp,
          });
        }
      }
      // sort by last message
      setdaftarPesan(
        Array.from(contactMap.values()).sort(
          (a: any, b: any) => new Date(b.lastTime as any).getTime() - new Date(a.lastTime as any).getTime()
        )
      );

    } catch (err) {
      console.error(err);
    }
  }

  const loadData = async () => {
    const datakategori = await getKategori(token);
    const datagroup = await getGroup(token);
    const datakontak = await getKontak(token);
    const databalasOtomatis = await getBalasOtomatis(token);
    const datajadwalPesan = await getJadwalPesan(token);
    const datauser = await getUser(token);
    setKategori(datakategori.data);
    setGroup(datagroup.data);
    setkontak(datakontak.data);
    setbalasOtomatis(databalasOtomatis.data);
    setjadwalPesan(datajadwalPesan.data);
    setuser(datauser.data);
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {role.role === "admin" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                User
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {user.length}
              </h4>
            </div>
          </div>
        </div>
      )}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GridIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Kategori
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {kategori.length}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MailIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Group
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {group.length}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Kontak
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {kontak.length}
            </h4>
          </div>

        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ListIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Balas Otomatis
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {balasOtomatis.length}
            </h4>
          </div>

        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <PieChartIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Jadwal Pesan
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {jadwalPesan.length}
            </h4>
          </div>

        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <DocsIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Daftar Pesan
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {daftarPesan.length}
            </h4>
          </div>

        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div >
  );
}
