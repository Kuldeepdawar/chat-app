import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    // get the user who are not equal to login
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    // talk with my girlfriend so I need id first
    const { id: userToChatId } = req.params;

    // my id requirment to chat with my friend
    const myId = req.user._id;

    // send and recive message and find in database and both side message send my sender reciever
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    // send response
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// this is send message to reciever id logic

export const sendMessage = async (req, res) => {
  try {
    // user can send text and image
    const { text, image } = req.body;
    // use receiver id where you want to send
    const { id: receiverId } = req.params;
    // this is me
    const senderId = req.user._id;

    // take undefined imageUrl
    let imageUrl;
    // if image
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      // after uploader in cloudinary same in imageURL with secure
      imageUrl = uploadResponse.secure_url;
    }

    // create a new message here
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // save now
    await newMessage.save();
    // todo: real time functionality goes here => socket.io
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error.message);
    res.status(500).json({ messae: "Ïnternal server" });
  }
};
