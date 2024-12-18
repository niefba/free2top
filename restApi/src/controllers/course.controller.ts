import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

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
      const courses = await courseRepository.find();
      cache.put("data", courses, 10000);
      return res.status(200).json({
        data: courses,
      });
    }
  }
  static async createCourse(req: Request, res: Response) {
    const { target, itinerary, description, category, dateBegin, rating, image, cast } =
      req.body;
    const course = new Course();
    course.target = target;
    course.itinerary = itinerary;
    course.description = description;
    course.category = category;
    course.dateBegin = dateBegin;

    const courseRepository = AppDataSource.getRepository(Course);
    await courseRepository.save(course);
    return res
      .status(200)
      .json({ message: "Course created successfully", course });
  }

  static async getCourse(req: Request, res: Response) {
    const { id } = req.params;
    const courseRepository = AppDataSource.getRepository(Course);
    const course = await courseRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      data: course,
    });
  }

  static async updateCourse(req: Request, res: Response) {
    const { id } = req.params;
    const { target, itinerary, description, category, dateBegin, rating, image, cast } =
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
