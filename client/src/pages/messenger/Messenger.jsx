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
 
  const [selectedItem, setSelectedItem] = useState(null);
  const [encryptionType, setEncryptionType] = useState(null); 

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setEncryptionType(item);
  };

   useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage",async (data) => {
      
      console.log("Encryption Type:",data.encryptiontype)
      var plainTexts;
      if(data.encryptiontype === "DES")
      {
        try {
          const response =await axios.post("http://localhost:5000/decrypt_single_message", {
            text: data.text,
          });      
        console.log("Plain Texts:", response.data.decrypted_values);
          plainTexts = response.data.decrypted_values;
          
        
        } catch (err) {
          console.log(err);
        } 
         setMsg(plainTexts);
        setArrivalMessage({
          sender: data.senderId,
          text: plainTexts,
          timeIs:data.timeIs,
          createdAt: Date.now(),
        });
      }

      if(data.encryptiontype === "BlowFish")
      {
        try {
          const response =await axios.post("http://localhost:5000/decrypt_single_messageBlowFish", {
            text: data.text,
          });      
        console.log("Plain Texts:", response.data.decrypted_values);
        plainTexts = response.data.decrypted_values;
        } catch (err) {
          console.log(err);
        }  
        setMsg(plainTexts);
        setArrivalMessage({
          sender: data.senderId,
          text: plainTexts,
          timeIs:data.timeIs,
          createdAt: Date.now(),
        });
      }
      if(data.encryptiontype === "AES")
      {
        try {
            const response = await axios.post("http://localhost:8800/decrypt",{cipheredArray:data.text} );
            console.log("Plain Texts:", response.data.decrypted_values);
            plainTexts = response.data.decrypted_values;
            plainTexts=plainTexts.replace(/[^ -~]+/g, '');
          } catch (err) {
            console.log(err);
          }
          setMsg(plainTexts);
          setArrivalMessage({
            sender: data.senderId,
            text: plainTexts,
            timeIs:data.timeIs,
            createdAt: Date.now(),
          });
      }
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
        const res = await axios.post("http://localhost:8800/getMessages", { conversationId: currentChat?._id });
        console.log("messages:", res.data);
         
        var plainTexts;
        for (let i = 0; i < res.data.length; i++) 
        {
          if(res.data[i].encryptiontype === "DES")
          {
            const response=await axios.post("http://localhost:5000/decrypt_single_message",{
              text:res.data[i].text
            } );
            res.data[i].text=response.data.decrypted_values;
            // console.log("response.data.decrypted_values:",response.data.decrypted_values)
          }

          if(res.data[i].encryptiontype === "BlowFish")
          {
            console.log("res.data[i].text:",res.data[i].text)

              const response=await axios.post("http://localhost:5000/decrypt_single_message_SenderSideBlowFish",{
              text:res.data[i].text
            } );
            console.log("response.data.decrypted_values:",response.data.decrypted_values)
            res.data[i].text=response.data.decrypted_values;
          }

          if(res.data[i].encryptiontype === "AES")
          {
            const response=await axios.post("http://localhost:8800/decrypt",{cipheredArray:res.data[i].text} );
            res.data[i].text=response.data.decrypted_values;
            res.data[i].text=res.data[i].text.replace(/[^ -~]+/g, '');
          }
        }
        plainTexts = res.data;
        console.log("Plain message_text_arr1:", plainTexts);
        setMessages(plainTexts);

      } catch (err) {
        console.log(err);
      }
      
    };
    getMessages();
  }, [currentChat]);

  // useEffect(() => {
  //   const getMessages = async () => {
  //     // try {
  //     //   const res = await axios.post("http://localhost:8800/AllMessages");
        
  //     //   var plainTexts;  
  //     //   const response = await axios.post("http://localhost:5000/receive_message_decrypt", {
  //     //     text: res.data,
  //     //   });      
  //     //   plainTexts = response.data.message_text_arr;
  //     //   console.log("Plain message_text_arr2:", plainTexts);
  //     //   setMessages2(plainTexts);
      
  //     // } catch (err) {
  //     //   console.log(err);
  //     // }

  //     try {
  //       const res = await axios.post("http://localhost:8800/AllMessages");
        
  //       // Filter messages with encryptionType === 'DES'
  //       const desMessages = res.data.filter(message => message.encryptiontype === 'DES');
      
  //       // Send only DES messages to localhost:5000
  //       if (desMessages.length > 0) {
  //         const response = await axios.post("http://localhost:5000/receive_message_decrypt", {
  //           text: desMessages,
  //         });      
  //         const plainTexts = response.data.message_text_arr;
  //         console.log("Plain message_text_arr2:", plainTexts);
  //         setMessages2(plainTexts);
  //       } else {
  //         console.log("No messages with encryptionType === 'DES' found.");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
      
  //   };
  //   getMessages();
  // }, []);

  const handleSubmit = async (e) => {
    const currentTime = new Date().toLocaleTimeString(); 
    e.preventDefault();
      var cipherTexts;

      if(encryptionType === "DES")
      {
            try {
          const res = await axios.post("http://localhost:5000/receive_message", {
            text: newMessage,
          });      
          cipherTexts = res.data.cipher_texts;
          console.log("Cipher Texts using DES:", cipherTexts);
        
        } catch (err) {
          console.log(err);
        }
      }
      if(encryptionType === "BlowFish")
      {
        try {
          const res = await axios.post("http://localhost:5000/receive_messageBlowFish", {
            text: newMessage,
          });      
          cipherTexts = res.data.cipher_texts;
          console.log("Cipher Texts using BlowFish:", cipherTexts);
        
        } catch (err) {
          console.log(err);
        }
      }
      if(encryptionType === "AES")
      {
        let newMsg2=newMessage;
        try {
          const response = await axios.post("http://localhost:8800/encrypt",{newMessage:newMsg2} );
          console.log("Response After encrypt:",response.data);
          cipherTexts = response.data;
          console.log("Received JSON Array:", cipherTexts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      
      }
    
    const message = {
      sender: userIs._id,
      text: cipherTexts,
      timeIs:currentTime,
      conversationId: currentChat._id,
      encryptiontype: encryptionType,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userIs._id
    );  
      var ETYPE;
    try {
      const res = await axios.post("http://localhost:8800/addMessage", message);
      ETYPE=res.data.encryptiontype;
      console.log("ETYPE:",ETYPE)
      if(ETYPE === "DES")
      {
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
        setNewMessage("");
      }
       if(ETYPE === "BlowFish")
       {
            const response =await axios.post("http://localhost:5000/decrypt_single_message_SenderSideBlowFish", {
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
          setNewMessage("");
       }
       if(ETYPE === "AES")
       {
        const response = await axios.post("http://localhost:8800/decrypt",{cipheredArray:res.data.text} );
        plainTexts = response.data.decrypted_values;
        console.log("Decrypted Message:", plainTexts);
        console.log("res.data:",res.data)
        let decryptedTexts = response.data.decrypted_values;
        decryptedTexts=decryptedTexts.replace(/[^ -~]+/g, '');
        plainTexts=plainTexts.replace(/[^ -~]+/g, '');
        const decryptedMessage = {
          ...res.data,
          text: decryptedTexts,
        };
        setMessages((prevMessages) => [...prevMessages, decryptedMessage]);
        setNewMessage("");
       }
    } catch (err) {
      console.log(err);
    } 

    socket.current.emit("sendMessage", {
      senderId: userIs._id,
      receiverId,
      timeIs:currentTime+"",
      text: cipherTexts,
      encryptiontype: ETYPE,
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
                  <div className="dropdown" >
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{width:"12vw"}}
                  >
                    {selectedItem || 'Select Algorithm'}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => handleItemClick('DES')}>
                      <a className="dropdown-item">DES</a>
                    </li>
                    <li onClick={() => handleItemClick('AES')}>
                      <a className="dropdown-item">AES</a>
                    </li>
                    <li onClick={() => handleItemClick('BlowFish')}>
                      <a className="dropdown-item">BlowFish</a>
                    </li>
                  </ul>
                  </div>
                  <button className="chatSubmitButton"
                   onClick={handleSubmit}
                   disabled={!encryptionType}
                   style={{
                    backgroundColor: !encryptionType ? '#afafaf' : '#22926d',
                    cursor: !encryptionType ? 'auto' : 'pointer',
                  }}
                   >
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