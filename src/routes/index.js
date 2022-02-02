import express from "express";
import {addPerson, loginPerson, addPost} from "db";

const router = express.Router();

router.post("/add-person", addPerson);
router.post("/login-person", loginPerson);
router.post("/add-post", addPost);

export default router;