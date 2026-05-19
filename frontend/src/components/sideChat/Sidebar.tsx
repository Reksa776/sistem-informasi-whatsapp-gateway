// Definisikan tipe Contact
interface Contact {
  jid: string;
  name: string;
  lastText?: string;
  lastTimestamp?: number | string;
  lastMessage?: {
    timestamp?: number | string;
  };
  unread?: boolean;
}

// Props untuk Sidebar
interface SidebarProps {
  contacts: Contact[];
  active: string | null;
  onSelect: (jid: string) => void;
}

export default function Sidebar({ contacts, active, onSelect }: SidebarProps) {
  function formatTime(ts?: number | string) {
    if (!ts) return "";
    let date: Date;

    // kalau timestamp dalam detik, kalikan 1000
    if (typeof ts === "number" && ts.toString().length === 10) {
      date = new Date(ts * 1000);
    } else {
      date = new Date(ts);
    }

    // kalau hari ini → jam menit
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // kalau beda hari → tampil tanggal
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });
  }

  return (
    <div className="w-1/4 border-r border-gray-300 dark:border-black dark:bg-gray-800 bg-white">
      <div className="p-3 font-semibold dark:text-white dark:border-black border-b">Daftar Pesan</div>
      {contacts.map((c: Contact) => {
        const lastTimestamp = c.lastTimestamp || c?.lastMessage?.timestamp;

        return (
          <div
            key={c.jid}
            onClick={() => onSelect(c.jid)}
            className={`flex items-center p-3 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-100 ${
              active === c.jid ? "bg-gray-300 dark:bg-gray-900" : ""
            }`}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Info Kontak */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <div
                  className={`font-medium dark:text-white truncate ${
                    c.unread ? "font-bold" : ""
                  }`}
                >
                  {c.name}
                </div>
                {lastTimestamp && (
                  <div className="text-xs text-gray-200 ml-2">
                    {formatTime(lastTimestamp)}
                  </div>
                )}
              </div>

              <div
                className={`text-sm truncate ${
                  c.unread ? "font-bold text-black" : "text-gray-500"
                }`}
              >
                {c.lastText}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
