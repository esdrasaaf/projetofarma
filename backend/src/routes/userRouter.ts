import { Router } from "express";
import { signInPost, signUpPost } from "../controllers/users.controllers";
import { userSchemaValidation } from "../middlewares/userSchemaValidation";

const router = Router();

//Routes
router.post("/signup",userSchemaValidation, signUpPost);
router.post("/signin",signInPost);

export default router;