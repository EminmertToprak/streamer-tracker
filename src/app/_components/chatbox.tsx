import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  return (
    <div className="border-white-300 flex w-1/5 flex-col items-center justify-center gap-4 p-4 text-white">
      <h1>ChatBox</h1>
      <p>Message: {message}</p>
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button>Send</button>
    </div>
  );
}
