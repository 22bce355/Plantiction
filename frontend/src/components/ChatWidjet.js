import React, { useState } from "react";
import axios from "axios";

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const BACKEND_URL = "https://croprecommendation-xvz0.onrender.com/webhook";

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to chat history
        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post(BACKEND_URL, {
                queryText: input
            });

            const botReply = response.data.fulfillmentText || "Sorry, I couldn't understand.";
            setMessages([...newMessages, { sender: "bot", text: botReply }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages([...newMessages, { sender: "bot", text: "Error: Unable to get response." }]);
        }
    };

    return (
        <div>
            {/* Floating Chat Button */}
            <button onClick={() => setOpen(!open)} style={styles.chatButton}>
                💬 AI Assistant
            </button>

            {/* Chat Window */}
            {open && (
                <div style={styles.chatContainer}>
                    <div style={styles.chatHeader}>
                        <strong>AI Chatbot</strong>
                        <button onClick={() => setOpen(false)} style={styles.closeButton}>✖</button>
                    </div>

                    <div style={styles.chatbox}>
                        {messages.map((msg, index) => (
                            <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div style={styles.inputContainer}>
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            placeholder="Type a message..." 
                            style={styles.input}
                        />
                        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const styles = {
    chatButton: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "12px 15px",
        borderRadius: "50px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)"
    },
    chatContainer: {
        position: "fixed",
        bottom: "80px",
        right: "20px",
        width: "320px",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        overflow: "hidden"
    },
    chatHeader: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    closeButton: {
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        fontSize: "16px",
        cursor: "pointer"
    },
    chatbox: {
        height: "300px",
        overflowY: "auto",
        padding: "10px"
    },
    userMessage: {
        textAlign: "right",
        backgroundColor: "#dcf8c6",
        padding: "8px",
        borderRadius: "8px",
        marginBottom: "5px"
    },
    botMessage: {
        textAlign: "left",
        backgroundColor: "#ececec",
        padding: "8px",
        borderRadius: "8px",
        marginBottom: "5px"
    },
    inputContainer: {
        display: "flex",
        padding: "10px",
        borderTop: "1px solid #ddd"
    },
    input: {
        flex: 1,
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px"
    },
    sendButton: {
        padding: "8px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        marginLeft: "5px",
        cursor: "pointer"
    }
};

export default ChatWidget;
