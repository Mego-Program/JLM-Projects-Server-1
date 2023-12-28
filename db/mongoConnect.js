import mongoose from "mongoose";

const coonected = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://project:project1234@cluster0.og16tr7.mongodb.net/"
    );
    console.log("connect");
  } catch (err) {
    console.log(err);
  }
};

export default coonected;
