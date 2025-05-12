import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { courseModels } from "../models/courseModel.js";

dotenv.config();

let WT_SECRET = process.env.WT_SECRET;

export const signUpUser = (req, res) => {
  const { email, password, isMentor, name } = req.body;

  userModel.findOne({ email }).then(async (user) => {
    try {
      if (user == null) {
        let hash = await bcrypt.hash(password, 4);
        const Role = isMentor ? "mentor" : "user"
        let newUser = new userModel({
          email: email,
          password: hash,
          Role: Role,
          name: name
        });


        newUser.save();
        let signed = jwt.sign({ email: email }, WT_SECRET);
        res.status(200).json({
          token: signed,
          msg: "Registration Success"
        });
      } else {
        res.json({ msg: "A user with this email already exists" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Server error try again" })
    }

  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findOne({ email }).then(async (user) => {
    if (user != null) {
      let pass = await bcrypt.compare(password, user.password);
      if (pass) {
        let signed = jwt.sign({ email: email }, WT_SECRET);
        res.status(200).json({
          token: signed,
          msg: "Login Successfull",
          role: user.Role
        });
      }
      else {
        res.json({ msg: "Invalid Credintials" });
      }
    } else {
      res.json({ msg: "user doesn't exists try signing up" });
    }
  });
};

export const getUser = async (req, res) => {
  const { token } = req.body;

  console.log(req.body);
  try {
    const user = await userModel.findOne({ email: token.email });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const uploadCourse = (req, res) => {
  console.log(req.file);
  console.log(req.body.url);

  const Course = new courseModels({
    title: req.body.title,
    url: req.body.url,
    file: req.file.path,
    audio: req.body.audio
  });

  Course.save()
    .then((res) => {
      res.send("uploaded successfully");
    })
    .catch((err) => {
      res.send("cannot send to database");
    });
};

export const getCourse = async (req, res) => {
  const deaf = (req.params.deaf === "true") ? true : false
  console.log(deaf);

  try {

    if (deaf === true) {
      const result = await courseModels.find({ audio: false })
      res.send(result);

    }
    else {
      const result = await courseModels.find({ audio: true })
      res.send(result);
    }
  }
  catch (err) {
    res.status(500).json(err)
  }



};


export const allUser = async (req, res) => {

  try {
    const users = await userModel.find({ Role: { $ne: "admin" } });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the user by ID and delete it
    await userModel.findByIdAndDelete(id);
    res.status(204).send(); // Send a successful response with no content
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateUser = async (req, res) => {
  const mentorId = req.params.id;

  try {
    // Find the mentor by ID and update the verifiedmentor field to true
    const updatedMentor = await userModel.findByIdAndUpdate(
      mentorId,
      { verifiedMentor: true }

    );

    if (!updatedMentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Send the updated mentor data as response
    res.json(updatedMentor);
  } catch (error) {
    console.error('Error verifying mentor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


