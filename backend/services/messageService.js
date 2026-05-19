import messageModel from "../models/messageModel.js";

let contacts = {};

export default {
  getMessages: () => messageModel.getMessages(),

  addMessage: (msg) => {
    messageModel.addMessage(msg);

    const from = msg.from;
    if (!contacts[from]) {
      contacts[from] = {
        jid: from,
        name: from.replace("@s.whatsapp.net", ""),
        lastText: "",
        unread: 0
      };
    }

    contacts[from].lastText = msg.text || "";
    if (!msg.isSelf) {
      contacts[from].unread += 1;
    }
  },

  getContacts: () => Object.values(contacts),

  markAsRead: (jid) => {
    if (contacts[jid]) {
      contacts[jid].unread = 0;
    }
  }
};
