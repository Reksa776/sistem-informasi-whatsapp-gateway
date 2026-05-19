let messages = [];

export default {
  getMessages: () => messages.slice(-200),
  addMessage: (msg) => {
    messages.push(msg);
  }
};
