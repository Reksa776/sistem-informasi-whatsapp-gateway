import { useState } from "react";
import API from "../../services/api";

// Tipe data pesan
interface Message {
  id?: string | number;
  text: string;
  isSelf?: boolean;
  timestamp?: number | string;
}

// Props untuk ChatWindow
interface ChatWindowProps {
  jid: string | null;
  messages: Message[];   // harus array, bukan object aneh tadi
  onSent?: (msg: Message) => void;
}

export default function ChatWindow({ jid, messages, onSent }: ChatWindowProps) {
  const [text, setText] = useState<string>("");

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await API.post("/send", {
        to: jid,        // harus "to" bukan "jid"
        message: text   // harus "message" bukan "text"
      });
      setText("");

      // kalau mau langsung tampilkan di UI tanpa tunggu socket:
      onSent?.({ text, isSelf: true, timestamp: Date.now() });
    } catch (err) {
      console.error(err);
    }
  }

  function formatTime(ts?: number | string) {
    if (!ts) return "";
    const date = new Date(
      typeof ts === "number" && ts.toString().length === 10 ? ts * 1000 : ts
    );
    return (
      date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((m: Message, index: number) => (
          <div
            key={m.id || index}
            className={`flex flex-col mb-2 ${m.isSelf ? "items-end" : "items-start"
              }`}
          >
            <div
              className={`break-words px-3 py-2 rounded-lg max-w-xs ${m.isSelf
                ? "bg-green-500 text-white"
                : "bg-white border border-gray-300"
                }`}
            >
              <div>{m.text}</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatTime(m.timestamp)}
            </div>
          </div>
        ))}
      </div>

      {jid && (
        <form onSubmit={sendMessage} className="p-3 break-words border-t bg-white flex">
          <textarea
            className="flex-1 break-words h-10 border rounded-lg px-3 py-2 mr-2"
            placeholder="Tulis pesan..."
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 rounded-lg">
            Kirim
          </button>
        </form>
      )}
    </div>
  );
}
