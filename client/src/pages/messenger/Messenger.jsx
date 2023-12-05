import "./messenger.css";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import React, { useState } from "react";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function Messenger() {
  const [temp, setTemp] = useState(0);
  const [email, setEmail] = useState("");
  const [conversations, setConversations] = useState([]);
  
  let location = useLocation();
  const userIs=location.state.state;
  // console.log(userIs._id+"ohoIs");
  // console.log(userIs.email+"ohoIs");
  const [email1, setEmail1] = useState(null);
  
  function deleteConversation(conversationId) {
    axios.post("http://localhost:8800/DelConversation", {
    cid: conversationId,
  }).then((res)=>{

    if (res.status==200) {
    console.log("deleted successfully");
    }
    else
    {
      alert("Couldnot Delete");
    }
  });
  }
  
  const handleS = (e) => {
    e.preventDefault();
     setTemp(1);
    // console.log("cameeeee");
  
    try {
      axios.post("http://localhost:8800/AddConversation", {
        scndEmail: email1,
        myObject: userIs,
      })
      .then((res) => {
        if (res.status === 200) {
          const conversationIs = res.data;
          // console.log(conversationIs);
          setConversations([...conversations, conversationIs]);
        } else {
          alert("Can't Add");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          alert("Server error: User not registered in Whisperz yet.\nTry Another User to start Chat!" ); // Display the error message from the server
        } else {
          console.error("An error occurred:", error);
          alert("An error occurred while adding the conversation.");
        }
      });
    } catch (err) {
      console.error("An error occurred:", err);
      alert("An error occurred while adding the conversation.");
    }
  };

  
  const [currentChat, setCurrentChat] = useState(null);
  
  const [messages, setMessages] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [Msg, setMsg] = useState("");
  // const [plainTexts, setplainTexts] = useState("");

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  //const [user, setUser] = useState(userIs);
  const scrollRef = useRef();

   useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage",async (data) => {
     
      var plainTexts="ahmad jalal";
      try {
        const response =await axios.post("http://localhost:5000/decrypt_single_message", {
          text: data.text,
        });      
      console.log("Plain Texts:", response.data.decrypted_values);
        plainTexts = response.data.decrypted_values;
        
      
      } catch (err) {
        console.log(err);
      }
      // console.log("ArrivalMessage:",data);
      // console.log("Plain Texts:", res.data.plain_text);

      setMsg(plainTexts);
      setArrivalMessage({
        sender: data.senderId,
        // text: data.text,
        text: plainTexts,
        timeIs:data.timeIs,
        createdAt: Date.now(),
      });
    });
  }, []);
  const getAllConversations = async () =>
  {
    try {
      const res = await axios.post("http://localhost:8800/getConversations",{id:userIs._id});
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    console.log("Msg---",Msg)
    console.log("arrivalMessage---",arrivalMessage)
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]) 
      getConversations();
      // console.log("conversations are "+conversations+"."); 
      // console.log("ArrivalMessage:",arrivalMessage)
      
  }, [arrivalMessage,currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userIs._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        userIs
      );
    });
  }, [userIs]);

  const getConversations = async () => {
    try {
      // console.log(userIs._id+"oho");

      const res = await axios.post("http://localhost:8800/getConversations",{id:userIs._id});
      
      res.data.forEach(conversation => {
        // console.log("conversations2 _id:", conversation._id);
        // console.log("conversations2 members:", conversation.members);
        // console.log("conversations2 createdAt:", conversation.createdAt);
      });
      setConversations(res.data);
      // console.log(conversations);


    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getConversations = async () => {
      try {
        // console.log(userIs._id+"oho");

        const res = await axios.post("http://localhost:8800/getConversations",{id:userIs._id});
        setConversations(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userIs._id]);

  useEffect(() => {
    var res;
    const getMessages = async () => {
      try {
        res = await axios.post("http://localhost:8800/getMessages",{conversationId:currentChat?._id} );
        // setMessages(res.data);
        console.log("messages:",res.data);
        var plainTexts;
      // try {
        const response = await axios.post("http://localhost:5000/receive_message_decrypt", {
          text: res.data,
        });      
        plainTexts = response.data.message_text_arr;
        console.log("Plain message_text_arr1:", plainTexts);
        setMessages(plainTexts);
        
      // } catch (err) {
      //   console.log(err);
      // }

      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        //if we have receiver in the messages also then we can get all messages whose sender or receiver is userIs.id for less time consumption purposes
        const res = await axios.post("http://localhost:8800/AllMessages");
        // setMessages2(res.data);
        // console.log("msg are "+messages2);

        var plainTexts;
      // try {
        const response = await axios.post("http://localhost:5000/receive_message_decrypt", {
          text: res.data,
        });      
        plainTexts = response.data.message_text_arr;
        console.log("Plain message_text_arr2:", plainTexts);
        setMessages2(plainTexts);
      

      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, []);

  const handleSubmit = async (e) => {
    const currentTime = new Date().toLocaleTimeString(); 

    e.preventDefault();

      //Perform encryption here and send encrypted message to api
      var cipherTexts;
      try {
        const res = await axios.post("http://localhost:5000/receive_message", {
          text: newMessage,
        });      
        cipherTexts = res.data.cipher_texts;
        console.log("Cipher Texts:", cipherTexts);
      
      } catch (err) {
        console.log(err);
      }

    const message = {
      sender: userIs._id,
      text: cipherTexts,
      timeIs:currentTime,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userIs._id
    );  

    try {
      const res = await axios.post("http://localhost:8800/addMessage", message);
      var plainTexts;
      
        const response =await axios.post("http://localhost:5000/decrypt_single_message", {
          text: res.data.text,
        });      
        plainTexts = response.data.decrypted_values;
      console.log("Plain Texts:",plainTexts);
      console.log("res.data:",res.data)
      const decryptedTexts = response.data.decrypted_values;
      const decryptedMessage = {
        ...res.data,
        text: decryptedTexts,
      };
      setMessages((prevMessages) => [...prevMessages, decryptedMessage]);

      // setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    } 

    socket.current.emit("sendMessage", {
      senderId: userIs._id,
      receiverId,
      timeIs:currentTime+"",
      text: cipherTexts,
    });
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
                  <input
                    type="text"
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
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