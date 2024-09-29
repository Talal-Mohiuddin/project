"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { ChatList } from "./ChatList";
import { ChatScrollAnchor } from "./ChatScrollAnchor";
import axios from "axios"; // Ensure Axios is imported

export default function ChatSection() {
  const [newMessage, setNewMessage] = useState(""); // Using newMessage for input state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/chat/", {
        message,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const userMessage = { sender: "user", text: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage(""); // Clear input after sending
    setIsLoading(true);

    try {
      const response = await sendMessage(newMessage);
      const assistantMessage = { sender: "assistant", text: response.message };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally: Add a way to show error to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-900">
      <h1>
        
      </h1>
      <div className="flex-grow overflow-auto pb-36 scrollbar-hide">
        <div className="pt-4 md:pt-10">
          <ChatList messages={messages} isLoading={isLoading} />
          <ChatScrollAnchor trackVisibility={true} />
        </div>
      </div>
      <div className="relative bottom-5 pt-6">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              onKeyDown={onKeyDown}
              placeholder="Send a message..."
              className="w-full p-4 pr-16 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 resize-none bg-gray-700 text-white transition-all duration-200"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              rows={1}
              value={newMessage} // Use newMessage here
              onChange={(e) => setNewMessage(e.target.value)} // Update newMessage
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-[0.80rem] bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors duration-200"
              disabled={isLoading}
            >
              <ArrowUpIcon className="w-5 h-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
