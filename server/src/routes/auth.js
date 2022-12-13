import { Router } from "express";
import { logIn, signUp, checkAuth, logOut } from "../controllers/auth.js";

const router = Router();

// Sign up
router.post("/signup", signUp);
// Log in
router.post("/login", logIn);
// Check auth, return userRole
router.get("/", checkAuth);
// Log out
router.delete("/logout", logOut);

export default router;
