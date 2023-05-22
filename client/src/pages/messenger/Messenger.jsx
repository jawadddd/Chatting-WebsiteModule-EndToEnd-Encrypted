import "./messenger.css";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import React, { useState } from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function Messenger() {
  const [email, setEmail] = useState("");
  const [conversations, setConversations] = useState([]);
  let location = useLocation();
  const userIs=location.state.state;
  console.log(userIs._id+"ohoIs");
  console.log(userIs.email+"ohoIs");
  const [email1, setEmail1] = useState(null);
  
  const handleS = (e) => {
    e.preventDefault();
  axios.post("http://localhost:8800/AddConversation", {
    scndEmail: email1,
    myObject : userIs,
  }).then((res)=>{

    if (res.status==200) {

const conversationIs=res.data;
    console.log(conversationIs);
    setConversations([...conversations, conversationIs]);
    }
    else
    {
      alert("Can't Add");
    }
  });
  };

  
  const [currentChat, setCurrentChat] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  //const [user, setUser] = useState(userIs);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]) 
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userIs._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        userIs
      );
    });
  }, [userIs]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        console.log(userIs._id+"oho");

        const res = await axios.post("http://localhost:8800/getConversations",{id:userIs._id});
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userIs._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.post("http://localhost:8800/getMessages",{conversationId:currentChat?._id} );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userIs._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userIs._id
    );

    socket.current.emit("sendMessage", {
      senderId: userIs._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8800/addMessage", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
     
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chatMenuInput">
            <input placeholder="Search for friends" 
            type="text"
            className="myBox"
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
/>
            <button className="buttonIs" onClick={handleS}>Enter</button>
            </div>
            
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userIs} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === userIs._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
 
  </>
  );
}
