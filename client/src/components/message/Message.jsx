import "./message.css";
// import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" 
        src={own?'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnRmjCAob_QZICkpxAWWekssquaigEyFj1qKN8fANOU7yU-jhbBoyZ1nTK6YV1oVbiSPk&usqp=CAU'
        :
        'https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000'} alt=""/>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{message.timeIs}</div>
    </div>
  );
}
//{format(message.createdAt)}