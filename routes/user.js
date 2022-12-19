import express from "express";
import passport from "passport";
import { authorizeAdmin,isAuthenticated } from "../middlewares/auth.js";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";

const router = express.Router();

router.get(
    "/googlelogin",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  //be careful here*****
  router.get(
    "/login",
     
    passport.authenticate("google", {
      scope: ["profile"],
      successRedirect: process.env.FRONTEND_URL,
    }),

    //(req ,res ,next) => {
    //res.send("Logged In");}

    
  );  

  router.get("/me", isAuthenticated, myProfile);

  router.get("/logout", isAuthenticated, logout);

  // Admin Routes
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);



export default router;