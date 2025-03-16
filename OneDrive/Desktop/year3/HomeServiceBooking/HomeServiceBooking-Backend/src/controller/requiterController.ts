import { Request, Response } from "express";
import { db } from "../lib/prisma";
import { Prisma, Requiter } from "@prisma/client";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken";

interface AuthenticatedRequest extends Request {
  requiter?: any;
}

//Register a new requiter
export const registerRequiter = async (req: Request, res: Response) => {
  //define req body types
  const { firstName, lastName, email, password, contactNumber, role } =
    req.body;

  const imageFile = req.file;

  //Ensure the required fields are provided
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !imageFile ||
    !role ||
    !contactNumber
  ) {
    res.status(400).json({ success: false, message: "Missing details" });
    return;
  }

  try {
    //check if requiter already exists
    const requiterExists: Requiter | null = await db.requiter.findUnique({
      where: { email },
    });

    if (requiterExists) {
      res
        .status(400)
        .json({ success: false, message: "Requiter already exists" });
      return;
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //validate Roles
    const allowedRoles = ["REQUITER"];
    if (!allowedRoles.includes(role)) {
      res.status(400).json({ success: false, message: "Invalid role" });
      return;
    }

    //storing image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    //storing name
    const name = firstName + " " + lastName;

    //create the requiter data to store in database
    const requiterData: Prisma.RequiterCreateInput = {
      email,
      password: hashPassword,
      name,
      firstName,
      lastName,
      contactNumber,
      role,
      requiterProfileImage: imageUpload.secure_url,
    };

    //store the requiter data in database
    const createdRequiter = await db.requiter.create({ data: requiterData });

    //generate the token using createdRequiter
    const token = generateToken(createdRequiter.id, createdRequiter.role);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      requiter: {
        id: createdRequiter.id,
        name: createdRequiter.name,
        email: createdRequiter.email,
        image: createdRequiter.requiterProfileImage,
        role: createdRequiter.role,
        contactNumber: createdRequiter.contactNumber,
      },
      token,
    });
  } catch (error) {
    console.error("Error registering requiter: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Login the requiter
export const loginRequiter = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
    return;
  }

  try {
    //finding the existing requiter
    const requiterExists: Requiter | null = await db.requiter.findUnique({
      where: { email },
    });

    if (!requiterExists) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    //compare the password with hashedpassword
    const isMatch = await bcrypt.compare(password, requiterExists.password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    //generate the token if password matches
    const token = generateToken(requiterExists.id, requiterExists.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      requiter: {
        id: requiterExists.id,
        name: requiterExists.name,
        email: requiterExists.email,
        image: requiterExists.requiterProfileImage,
        role: requiterExists.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in requiter: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//api to add business data
export const addBusinessData = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const requiterId = req.requiter?.id;

  if (!requiterId) {
    res.status(401).json({ success: false, message: "Unauthorized access" });
    return;
  }

  const { name, about, address, category } = req.body;
  const imageFile = req.files as Express.Multer.File[];

  if (!name || !category || !about || !category || !imageFile) {
    res.status(400).json({ success: false, message: "Missing details" });
    return;
  }

  try {
    // Ensure the Vendor (User) exists
    const existingRequiter = await db.requiter.findUnique({
      where: { id: requiterId },
    });

    if (!existingRequiter) {
      res.status(404).json({ success: false, message: "Requiter not found" });
      return;
    }

    const businessData: Prisma.BusinessCreateInput = {
      name,
      category,
      about,
      address,
      requiter: {
        connect: { id: requiterId },
      },
    };

    const newBusinessData = await db.business.create({
      data: businessData,
    });

    const uploadImages = await Promise.all(
      imageFile.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      })
    );

    await Promise.all(
      uploadImages.map(async (url) => {
        await db.imageUrl.create({
          data: {
            businessId: newBusinessData.id,
            url,
          },
        });
      })
    );

    res.status(200).json({
      success: true,
      message: "Added New business data",
      business: newBusinessData,
      images: uploadImages,
    });
  } catch (error) {
    console.error("Error adding business data:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

//api to get business data
export const getBusinessData = async (req: Request, res: Response) => {
  try {
    //optional filter businessdata
    const { requiterId } = req.query;

    const businessData = await db.business.findMany({
      where: requiterId ? { requiterId: requiterId as string } : undefined,
      include: {
        images: true,
        requiter: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!businessData || businessData.length === 0) {
      res.status(404).json({ success: false, message: "No Data Found" });
      return;
    }

    res.status(200).json({ success: true, businessData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//getBusinessDataById
export const getBusinessDataById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ success: false, message: "ID is required" });
      return;
    }

    const businessData = await db.business.findUnique({
      where: { id: id as string },
      include: {
        images: true,
        requiter: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!businessData) {
      res.status(404).json({ success: false, message: "No data found" });
      return;
    }

    res.status(200).json({ success: true, businessData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//get requiter data
export const getRequiterData = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const requiterId = req.requiter?.id;

    if (!requiterId) {
      res.status(401).json({ success: false, message: "Unauthorized access" });
      return;
    }
    const requiter = await db.requiter.findUnique({
      where: { id: requiterId },
    });

    if (!requiter) {
      res.status(400).json({ success: false, message: "Requiter not found" });
      return;
    }

    res.status(200).json({ success: true, requiter: requiter });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//deleting requiter data
export const deleteRequiterData = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const requiterId = req.requiter?.id;

    if (!requiterId) {
      res.status(401).json({ success: false, message: "Unauthorized access" });
      return;
    }

    //find the requiter
    const requiter = await db.requiter.findUnique({
      where: { id: requiterId },
    });

    //check if requiter exists
    if (!requiter) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    //delete the requiter
    await db.user.delete({
      where: { id: requiterId },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateRequiterProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const requiterId = req.requiter.id;
  const updates = req.body;
  const imageFile = req.file;

  if (!requiterId) {
    res.status(401).json({ success: false, message: "Unauthorized access" });
    return;
  }

  try {
    //check if requiter exists
    const existingRequiter = await db.requiter.findUnique({
      where: { id: requiterId },
    });

    if (!existingRequiter) {
      res.status(400).json({ success: false, message: "Requiter not found" });
      return;
    }

    // If updating password, check old password and hash new password
    if (updates.oldPassword && updates.newPassword) {
      const isMatch = await bcrypt.compare(
        updates.oldPassword,
        existingRequiter.password
      );
      if (!isMatch) {
        res.status(400).json({ success: false, message: "Invalid password" });
        return;
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.newPassword, salt);

      // Remove oldPassword and newPassword from updates to avoid accidental storage
      delete updates.oldPassword;
      delete updates.newPassword;
    }

    // Optional image upload to Cloudinary
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path);
      updates.profileImage = uploadResult.secure_url;
    }

    //update the requiter and store in the database
    const updatedRequiter = await db.requiter.update({
      where: { id: requiterId },
      data: updates,
    });

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      requiter: updatedRequiter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
