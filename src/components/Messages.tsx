"use client";
import { useState, useEffect } from "react";
import Message from "./Message";
import { messageProps } from "@/types/basicTypes";
import Spinner from "./Spinner";

const Messages = () => {
  const [messages, setMessages] = useState<messageProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages");

        if (res.status === 200) {
          const data = await res.json();
          data.messages.sort((a: messageProps, b: messageProps) => {
            if (a.read && !b.read) return 1;
            if (!a.read && b.read) return -1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setMessages(data.messages);
        }
      } catch (err) {
        console.log("Error fetching messages: ", err);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);
  if (loading) return <Spinner loading={loading} />;
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => <Message key={msg._id} message={msg} />)
            ) : (
              <p>You have no messages</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
