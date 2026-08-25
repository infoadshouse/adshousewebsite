"use client";

import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/marketplace/client";

type Message = { id: string; senderId: string; body: string; createdAt: string };

export function ChatThread({ conversationId, userId }: { conversationId: string; userId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  async function load() {
    const data = await api<{ messages: Message[] }>(`/api/marketplace/conversations/${conversationId}/messages`);
    setMessages(data.messages);
  }

  useEffect(() => {
    load().catch((err: Error) => setError(err.message));
    const timer = setInterval(() => {
      load().catch(() => undefined);
    }, 4000);
    return () => clearInterval(timer);
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    try {
      const data = await api<{ message: Message }>(`/api/marketplace/conversations/${conversationId}/messages`, {
        method: "POST",
        json: { body },
      });
      setMessages((prev) => [...prev, data.message]);
      setBody("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    }
  }

  return (
    <div className="flex h-[70vh] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-surface p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              message.senderId === userId ? "ml-auto bg-sky text-white" : "bg-white text-sky-dark"
            }`}
          >
            {message.body}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {error ? <p className="mt-2 text-sm text-pink">{error}</p> : null}
      <form onSubmit={send} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-full border border-line px-4 py-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message"
        />
        <button type="submit" className="btn-primary rounded-full px-5 py-2 text-sm font-semibold">
          Send
        </button>
      </form>
    </div>
  );
}
