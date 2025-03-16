import { Request, Response } from "express";
import { db } from "../lib/prisma";

interface AuthenticatedRequest extends Request {
  requiter?: any;
}

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.requiter?.id;
  const userRole = req.requiter?.role;

  if (!id || userRole !== "ADMIN") {
    res.status(400).json({ success: false, message: "Unauthorized access" });
    return;
  }

  const { role } = req.query;

  //initial value of users and total numbers of users
  let users = [];
  let totalUsers = 0;
  try {
    if (role === "user") {
      users = await db.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          userProfileImage: true,
        },
      });
      totalUsers = await db.user.count();
    } else if (role === "requiter") {
      users = await db.requiter.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          contactNumber: true,
          role: true,
          requiterProfileImage: true,
        },
      });
      totalUsers = await db.requiter.count();
    } else {
      //fetch both requiter and users
      const requiter = await db.requiter.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          contactNumber: true,
          role: true,
          requiterProfileImage: true,
        },
      });

      const normalUsers = await db.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          userProfileImage: true,
        },
      });

      users = [...requiter, ...normalUsers];

      //fetch both users and requiter total count
      const totalRequiter = await db.requiter.count();
      const totalNormalUsers = await db.user.count();
      totalUsers = totalRequiter + totalNormalUsers;
    }

    res.status(200).json({ success: true, users, totalUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
