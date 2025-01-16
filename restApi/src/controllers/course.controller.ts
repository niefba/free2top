import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { User } from "../entity/User";

export class CourseController {
  static async getAllCourses(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const courseRepository = AppDataSource.getRepository(Course);
      const courses = await courseRepository.find({
        select: {
          id: true,
          target: true,
          itinerary: true,
          description: true,
          dateBegin: true
        },
        order: {
          dateBegin: "ASC",
        },
      });
      cache.put("data", courses, 10000);
      return res.status(200).json({
        data: courses,
      });
    }
  }
  static async createCourse(req: Request, res: Response) {
    const { target, itinerary, description, category, dateBegin, altitude, ascending, hours, publicTransport, dateStamm, inactive } =
      req.body;
    const course = new Course();
    course.target = target;
    course.itinerary = itinerary;
    course.description = description;
    course.category = category;
    course.dateBegin = dateBegin;
    course.altitude = altitude;
    course.ascending = ascending;
    course.hours = hours;
    course.publicTransport = publicTransport;
    course.dateStamm = dateStamm;
    course.inactive = inactive;

    if (!req["currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    course.user = await userRepository.findOne({
      where: { id: req["currentUser"].id },
    });

    const courseRepository = AppDataSource.getRepository(Course);
    await courseRepository.save(course);
    return res
      .status(200)
      .json({ message: "Course created successfully", course });
  }

  static async getCourse(req: Request, res: Response) {
    const { id } = req.params;
    if (!req["currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req["currentUser"].id },
    });

    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    // Do not include user password
    delete course.user.password;

    // Check ownership
    let readonly = true;
    if (req["currentUser"].id === course.user.id || user.role === 'admin') {
      readonly = false
    }

    return res.status(200).json({
      data: course,
      readonly
    });
  }

  static async updateCourse(req: Request, res: Response) {
    const { id } = req.params;
    const { target, itinerary, description, category, dateBegin, altitude, ascending, hours, publicTransport, dateStamm, inactive } =
      req.body;
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({
      where: { id },
    });
    course.target = target;
    course.itinerary = itinerary;
    course.description = description;
    course.category = category;
    course.dateBegin = dateBegin;
    course.altitude = altitude;
    course.ascending = ascending;
    course.hours = hours;
    course.publicTransport = publicTransport;
    course.dateStamm = dateStamm;
    course.inactive = inactive;
    
    await courseRepository.save(course);
    return res
      .status(200)
      .json({ message: "Course updated successfully", course });
  }

  static async deleteCourse(req: Request, res: Response) {
    const { id } = req.params;
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({
      where: { id },
    });
    await courseRepository.remove(course);
    return res
      .status(200)
      .json({ message: "Course deleted successfully", course });
  }
}
