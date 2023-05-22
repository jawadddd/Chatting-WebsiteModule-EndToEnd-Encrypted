import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [idIs, setIdIs]=useState(null);
  console.log(currentUser.name);
  useEffect(() => {
//    const friend = conversation.members.find((m) => m._id !== currentUser._id);
    const frnd=conversation.members.filter((item) => {if(item!=currentUser._id){
      console.log(item+" "+currentUser._id);  
      return item;}});
    console.log(frnd);

    const getUser = async () => {
      try {
        axios.post("http://localhost:8800/", {
          id:frnd,
        }).then((res) => {
          if (res.status === 200) {
            setUser(res.data);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
  
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img className="conversationImg" src={"https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"}  />

        
        
      <span className="conversationName">{user?.name}</span>
    </div>
  );
}
