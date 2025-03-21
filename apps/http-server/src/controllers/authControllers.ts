import { Request, Response, NextFunction, RequestHandler } from "express";
import { prismaClient } from "@repo/db/client";
import { SignInSchema, SignUpSchema } from "@repo/common/types";
import bcryptjs from "bcryptjs";
import { createJwtToken } from "../utils/createToken";

export const signUp: RequestHandler = async (req, res, next): Promise<void> => {
  const { email, username, password } = req.body;
  const parsedData = SignUpSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    res.status(400).json({ message: "Incorrect inputs" });
    return;
  }

  try {
    const isUserExist = await prismaClient.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      res.status(409).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
      },
    });

    const token = createJwtToken(newUser.id, email);

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next): Promise<void> => {
  const { email, password } = req.body;
  const parsedData = SignInSchema.safeParse(req.body);

  if (!parsedData.success) {
    res
      .status(400)
      .json({ error: "Incorrect inputs", details: parsedData.error });
    return;
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User does not exist. Sign up first!" });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid password" });
    }

    const token = createJwtToken(user.id, email);

    res.status(200).json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error: unknown) {
    console.error("Error during signin:", error);

    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    } else {
      res
        .status(500)
        .json({
          error: "Internal Server Error",
          details: "An unknown error occurred.",
        });
    }
  }
};
