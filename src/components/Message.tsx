"use client";
import { useState, useEffect } from "react";
import { messageProps } from "@/types/basicTypes";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/GlobalContext";
function Message({ message }: { message: messageProps }) {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const [clickReadToggleLoading, setClickReadToggleLoading] = useState(false);
  const { setUnreadCount } = useGlobalContext();
  const handleReadClick = async () => {
    setClickReadToggleLoading(true);
    if (clickReadToggleLoading) return;
    let response: Response = new Response();
    try {
      response = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (response.status === 200) {
        const data: { message: messageProps } = await response.json();
        setIsRead(data.message.read);
        setUnreadCount((prevCount: number) =>
          data.message.read ? prevCount - 1 : prevCount + 1
        );
        toast.success(
          data.message.read ? "Message marked as read" : "Message marked as new"
        );
      }
    } catch (err) {
      const data: { error: string } = await response.json();
      console.error(data?.error || err);
      toast.error(data?.error || "Failed to update message status");
    } finally {
      setClickReadToggleLoading(false);
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirm) return;
    let data;
    try {
      const response = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      data = await response.json();
      if (response.status === 200) {
        setIsDeleted(true);
        if (isRead === false) {
          setUnreadCount((prevCount: number) => prevCount - 1);
        }
        toast.success("Message deleted successfully");
        // Optionally, you can add logic to remove the message from the UI
      }
    } catch (err) {
      console.error(data?.error || err);
      toast.error(data?.error || "Failed to delete message");
    }
  };
  if (isDeleted) return null;
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong>
          {message.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleDateString()}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
        onClick={handleReadClick}
      >
        {clickReadToggleLoading
          ? "Loading..."
          : isRead
          ? "Mark as New"
          : "Mark as Read"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default Message;
