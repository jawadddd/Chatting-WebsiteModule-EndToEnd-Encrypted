const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");

const fs = require('fs');
const formidable = require('formidable');

// const helmet = require("helmet");
// const morgan = require("morgan");

// const conversationRoute = require("./routes/conversations");
//const messageRoute = require("./routes/messages");
// const Conversation = require("./models/Conversation");

//const path = require("path");


const directoryPath = './uploads';
app.use(express.static('public'));
app.use('/images', express.static('uploads'));






mongoose.connect('mongodb+srv://l201305:vk8LIGpl0UVhroAH@cluster0.nbaphfy.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
).then(()=>console.log("connected")).catch(()=>console.log("error"));



//user schema 

const UsersSchema=new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String,
      default: "",
    }
   ,
  },
  { timestamps: true }
,{ versionKey: false });
const users=new mongoose.model('users',UsersSchema);

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
const Conversation=new mongoose.model('Conversation',ConversationSchema);

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: [String],  
    },
    timeIs: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);


//add

app.post("/addMessage", async (req, res) => {
  const newMessage = new Message(req.body);
  // console.log("newMessage::",newMessage)
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

app.post("/getMessages", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.body.conversationId,
    });
    console.log("messages::",messages)
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/AllMessages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/getConversations", async (req, res) => {
  try {
    const id=req.body.id;   
    // console.log(id+"get Conversation ");
    
    const conversation = await Conversation.find({ members: { $in: [id] } });
    const collectionName = Conversation.collection.name;
    // console.log(collectionName);
   
    //{
    //   members: { $in: [id] },
    // });
    // console.log("ji"+conversation,".AB AYA is ME.");
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/AddConversation", async (req, res) => {
  // console.log("Atl east hereee");
  
  try {
    const myObj=req.body.myObject;
    // console.log(myObj);
    const frndEmail=req.body.scndEmail;
    const frndObject= await users.findOne({ email:frndEmail });
    const objectIdString = frndObject._id.toString();
    // console.log("here also");
    if(frndObject)
    {
      // console.log(myObj._id);
      // console.log(frndObject._id);
      // console.log(objectIdString);
      // console.log("came add!!!!!!!!!!!!!!!!!!!!!!!!!!");
      const newConversationIs = new Conversation({
  members: [myObj._id,objectIdString]
});

// console.log("new is :");
// console.log(newConversationIs.members[0]);
// console.log(newConversationIs.members[1]);
const savedConversation = await newConversationIs.save();
// console.log("saved is :");
// console.log(savedConversation.members[0]);
// console.log(savedConversation.members[1]);

res.status(200).json(savedConversation);

    }
    else{
      console.log("came hereeee")
      res.status(500);
    }
  } catch (err) {
    console.log("huuuuuu");
    res.status(500).json(err);
  }
});




app.post('/upload', async(req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req,async function (err, fields, files) {
    const password = fields.password;
    const email = fields.email;
    const name = fields.name;
    const encryptedPassword = await bcrypt.hash(password, 10);
// console.log(files);
    try {
      const oldUser = await users.findOne({ email });
  
      if (oldUser) {
        return res.json({ error: "User Exists" });
      }
  const user=new users();
  user.name=name;
  user.email=email;
  user.password=encryptedPassword;
  // console.log(email);
  var oldpath = files.img.filepath;
    // console.log(oldpath);
    var newpath = __dirname+'/uploads/' + files.img.originalFilename;
    fs.copyFile(oldpath, newpath, (err) => {
      if (err) throw err;
      fs.unlink(oldpath, (err) => {
        if (err){ console("yes")};
       
      });
    });
  user.save();
  // console.log("came");
  res.write('ok');
        res.end();
    } catch (error) {
      res.send({error});
    }
    
  });
});


app.post("/login", async (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req,async function (err, fields, files) {
    const password = fields.password;
    const emailIs = fields.email;
    // console.log("inside login server"+password);
try{
  const user = await users.findOne({ email:emailIs });
  // console.log("after inside login server"+user.password,user.email);

  if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.status(200).json(user);
        res.end();

      } 
}
else
{
  res.status(500).send({error});
}
    }
    catch(error)
    {
      res.status(500).send({error});
    }
  });
});

app.post("/", async (req, res) => {
  const id=req.body.id;   
    // console.log(id+"maiIs ");

    try{
  const user = await users.findOne({ _id:id });
    // console.log(user);
  if (user) {

      res.status(200).json(user);
  
}
    }
    catch(error)
    {
      res.status(500).json(error);
    }
    res.end();
});

//middleware
// app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));


// app.use("/api/conversations", conversationRoute);
//app.use("/api/messages", messageRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});





