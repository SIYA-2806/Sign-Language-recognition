import express from "express";

import {
  allUser,
  deleteUser,
  getCourse,
  getUser,
  loginUser,
  signUpUser,
  updateUser,
  uploadCourse,
} from "../controllers/userController.js";
import AuthMiddleWare from "../middleware/AuthMiddleware.js";
import { upload } from "../helpers/filehelper.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUpUser);
userRoutes.post("/login", loginUser);


userRoutes.get("/getUser", AuthMiddleWare, getUser);

userRoutes.post("/uploadCourse", upload.single("thumbnail"), uploadCourse);
userRoutes.get("/getCourses/:deaf", getCourse);

userRoutes.get('/all', allUser)
userRoutes.delete("/user/:id", deleteUser)
userRoutes.put("/mentor/:id", updateUser)

export default userRoutes;
