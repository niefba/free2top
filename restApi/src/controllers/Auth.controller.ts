import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { encrypt } from "../helpers/encrypt";
import { UserResponse } from "../dto/user.dto";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { name, password } = req.body;

      if (!name || !password) {
        return res
          .status(500)
          .json({ message: " name and password required" });
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { name } });

      const isPasswordValid = encrypt.comparepassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res.status(404).json({ message: "User not found" });
      }
      const token = encrypt.generateToken({ id: user.id });

      // Use the UserResponse DTO to structure the data being sent in the response
      const userDataSent = new UserResponse()
      userDataSent.id = user.id;
      userDataSent.name = user.name;
      userDataSent.email= user.email;
      userDataSent.role = user.role;

      return res.status(200).json({ message: "Login successful", user: userDataSent, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response) {
    if (!req[" currentUser"]) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[" currentUser"].id },
    });
    return res.status(200).json({ ...user, password: undefined });
  }
}
