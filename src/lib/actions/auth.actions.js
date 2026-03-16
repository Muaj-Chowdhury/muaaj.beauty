"use server";

import { getCollection } from "../mongodb";
import bcrypt from "bcryptjs";

export async function registerUser(formData) {
  try {
    const { name, email, password } = formData;
    const usersCollection = await getCollection("users");

    // 1. Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email already registered." };
    }

    // 2. Hash Password for Security
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create User Document
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
      createdAt: new Date().toISOString(),
      wishlist: [],
    };

    const res =await usersCollection.insertOne(newUser);

    if (res.acknowledged){

    return { res , success: true, message: "Account created successfully!" };
    }

  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, message: "Something went wrong. Try again." };
  }
}