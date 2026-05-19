import messageService from "../services/messageService.js";

export const getContacts = (req, res) => {
  res.json({ contacts: messageService.getContacts() });
};

export const markAsRead = (req, res) => {
  const { jid } = req.body;
  messageService.markAsRead(jid);
  res.json({ success: true });
};
