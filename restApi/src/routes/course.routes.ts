import * as express from "express";
import { authentification } from "../middleware/authentification";
import { CourseController } from "../controllers/course.controller";
import { authorization } from "../middleware/authorization";
import { asynchandler } from "../middleware/asynchandler";

const Router = express.Router();

Router.get("/courses", 
  asynchandler(authentification), 
  asynchandler(CourseController.getAllCourses)
);
Router.get("/courses/:id", 
  asynchandler(authentification), 
  asynchandler(CourseController.getCourse)
);
Router.post("/courses",
  asynchandler(authentification),
  asynchandler(CourseController.createCourse));

Router.put(
  "/courses/:id",
  asynchandler(authentification),
  asynchandler(authorization(["admin"])),
  asynchandler(CourseController.updateCourse)
);
Router.delete(
  "/courses/:id",
  asynchandler(authentification),
  asynchandler(authorization(["admin"])),
  asynchandler(CourseController.deleteCourse)
);
export { Router as courseRouter };
