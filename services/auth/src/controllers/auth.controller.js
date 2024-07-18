import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (data) => {
  const { email, password } = data;

  try {
    const user = await prisma.auth.findFirst({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return {
        status: "error",
        message: "Invalid credentials",
      };
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      status: "success",
      data: { token },
    };
  } catch (error) {
    console.log(error)
    return {
      status: "error",
      message: "Login failed",
    };
  }
};

export const register = async (data) => {
  const { password, email } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.auth.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      status: "success",
      data: { token },
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "User registration failed",
    };
  }
};
