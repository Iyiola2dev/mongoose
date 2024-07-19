import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = new User(req.body);

    //Check If User Exists In THe Database
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //amount of times salts are generated into the password, makes it harder to crack

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;

    await user.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    //check for password and username
    if (!userName || !password) {
      return res
        .status(404)
        .json({ message: "Please provide a username and password" });
    }

    //Check If User in the Database
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invaild credentials" });
    }

    //compare passwords
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invaild credentials" });
    }

    //This is the token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      status: "success",
      message: "User Logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while trying to login",
    });
  }
};


//This is to get all users
export const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the response
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }
};



//Chaning old password to a new password
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const {userName} = req.params;
    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(401).json({ message: "Invaild credentials" });
      }
     
//
      const changedPassword = await bcrypt.compare(oldPassword, user.password )
   
      if (!changedPassword) {
        return res.status(401).json({ message: "Incorrect old password" });
      }
  
    if ( oldPassword === newPassword) {
      return res.status(404).json({ message: "Input NewPassword" });
    }
    const saltRounds = 10;
    const newPasswordHashed = await bcrypt.hash(newPassword, saltRounds);

    user.password = newPasswordHashed
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }
};



//This is to change the already existing username
export const updateUserName = async (req, res) =>{
    try{
        const { oldUsername, newUsername} = req.body;
        const {userName} = req.params
        const user = await User.findOne({userName});

        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }

    const changeUsername = ()=>{
        if(oldUsername === user.userName){
            return res.status(200).json({message:"This username was created into the database😉"})
        }
    }
    if(!changeUsername){
        return res.status(400).json({message:"Incorrect userName"})
    }

    if(oldUsername === newUsername){
        return res.status(401).json({message:"Username already used once input another username"})
    }

    user.userName =  newUsername
    await user.save();
    return res.status(200).json({message:"Username changed successfully"})


    }catch(err){
        console.log (err.message);
        return res.status(500).json({message: "Error fetching users"});
    }
}
