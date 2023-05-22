import "./message.css";
// import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000" alt=""/>
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">00:00</div>
    </div>
  );
}
//{format(message.createdAt)}