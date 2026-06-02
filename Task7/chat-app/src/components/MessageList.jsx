function MessageList({ messages }) {
  return (
    <>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.name}:</strong> {msg.text}
        </div>
      ))}
    </>
  );
}

export default MessageList;