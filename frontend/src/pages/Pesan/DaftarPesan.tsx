import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Sidebar from "../../components/sideChat/Sidebar";
import ChatWindow from "../../components/sideChat/ChatWindow";
import API, { getKontak } from "../../services/api";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string | number;
  from: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

interface Contact {
  jid: string;
  name: string;
  lastText: string;
  lastTime: string;
  unread: boolean;
}
type UnreadMap = Record<string, boolean>;

export default function DaftarPesan() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [unreadMap, setUnreadMap] = useState<UnreadMap>({});
  const pollRef = useRef<NodeJS.Timeout | null>(null);
const token = localStorage.getItem("token") ?? "";

  async function fetchMessages() {
    try {
      const { data } = await API.get("/messages");
      const msgs = data?.messages || [];
      setMessages(msgs);

      // ambil daftar kontak dari pesan
      const contactMap = new Map();
      for (const m of msgs) {
        const name = await getKontak(token);
        const data = name.data;
        const nomorPengirim = m.from.replace("@s.whatsapp.net", "").trim();
        const kontak = data.find((item: { nomor: any; }) => item.nomor === nomorPengirim);
        const kondisi = kontak ? kontak.name : nomorPengirim;
        const jid = m.from;
        const prev = contactMap.get(jid);
        if (!prev || new Date(m.timestamp) > new Date(prev.lastTime)) {
          contactMap.set(jid, {
            jid,
            name: kondisi,
            lastText: m.text,
            lastTime: m.timestamp,
            unread: unreadMap[jid] || false,
          });
        }
      }
      // sort by last message
      setContacts(
        Array.from(contactMap.values()).sort(
          (a, b) => new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime()
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  // polling
  useEffect(() => {
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, 2000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // kalau ganti kontak aktif → tandai sudah dibaca
  useEffect(() => {
    if (active) {
      setUnreadMap((prev) => ({ ...prev, [active]: false }));
    }
  }, [active]);

  // kalau ada pesan baru & bukan kontak aktif → tandai unread
  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.from !== active && !lastMsg.isSelf) {
      setUnreadMap((prev) => ({ ...prev, [lastMsg.from]: true }));
    }
  }, [messages, active]);
  return (
    <div className="">
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Daftar Pesan" />
      <div className="max-h-screen rounded-2xl overflow-hidden border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-screen">
          <Sidebar
            contacts={contacts}
            active={active}
            onSelect={(jid) => setActive(jid)}
          />
          <ChatWindow
            jid={active}
            messages={messages.filter((m) => m.from === active)}
            onSent={fetchMessages}
          />
        </div>
      </div>
    </div>
  );
}
