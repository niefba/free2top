import * as express from "express";
import { authentification } from "../middleware/authentification";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middleware/authorization";
import { AuthController } from "../controllers/Auth.controller";
import { asynchandler } from "../middleware/asynchandler";
const Router = express.Router();

Router.get(
  "/users",
  asynchandler(authentification),
  asynchandler(authorization(["admin"])),
  asynchandler(UserController.getUsers)
);
Router.get(
  "/profile",
  asynchandler(authentification),
  asynchandler(authorization(["user", "admin"])),
  asynchandler(AuthController.getProfile)
);
Router.post("/signup", asynchandler(UserController.signup));
Router.post("/signin", asynchandler(AuthController.signin));
Router.put(
  "/update/:id",
  asynchandler(authentification),
  asynchandler(authorization(["user", "admin"])),
  asynchandler(UserController.updateUser)
);
Router.delete(
  "/delete/:id",
  asynchandler(authentification),
  asynchandler(authorization(["admin"])),
  asynchandler(UserController.deleteUser)
);
export { Router as userRouter };
