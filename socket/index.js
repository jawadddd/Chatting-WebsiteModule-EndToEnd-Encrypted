const io = require("socket.io")(8900, {
    cors: {
      origin: "*",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    console.log(userId,socketId,"add User");
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    console.log(userId);
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      console.log(userId,socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text,timeIs }) => {
      console.log('inside sendMessage:',senderId,receiverId,text);
      const user = getUser(receiverId);
      if(user)
      {
        console.log(user);
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
          timeIs,
        });
  
      }
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });