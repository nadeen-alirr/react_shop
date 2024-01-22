import express from "express";
const router = express.Router();

import {
  updateUserByIdAdmin,
  deleteUserByIdAdmin,
  getUseByIdAdmin,
  getAllUserAdmin,
  regestrations,
  login,
  getUserProfile,
  updateOwnUserProfile,
  Logout,
} from "../controllers/usercontroller.js";

import { protect } from "../middleware/authMiddleware.js";
import {isadmin} from "../middleware/authMiddleware.js";

//  
router
  .route("/profile")
  .get(protect , getUserProfile)
  .put(protect ,updateOwnUserProfile); 


// 
router.post("/logout",Logout);

// 
router.post("/login",login);

// 
router.route("/").post(regestrations).get(protect ,isadmin,getAllUserAdmin);

// 
router
  .route("/:id")
  .get(protect, isadmin,getUseByIdAdmin)
  .put(protect,isadmin,updateUserByIdAdmin)
  .delete(protect,isadmin, deleteUserByIdAdmin);
  

export default router;
