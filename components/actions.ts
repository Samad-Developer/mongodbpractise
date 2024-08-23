"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import fs from 'fs';
import path from 'path';

import { writeFile } from "fs/promises";

export async function createPost(formdata: FormData) {
    const title = formdata.get("title") as string
    const userId = "66c135bee5fc1757a1aec248"
    await prisma.post.create({
        data: { title, userId },
      });
    revalidatePath("/")
}



export async function postImage(formdata: FormData) {
  const imageFile = formdata.get('image') as File ;

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const filename = Date.now() + imageFile.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/images/" + filename),
      buffer
    );

    const product = await prisma.product.create({
      data: {
        name: 'Checking Name',
        price: 0, // Set a default price or get it from formdata
        imageUrl: `/images/${filename}`, // Set the URL for the image
        createdAt: new Date(), // Set creation date
      },
    });

    revalidatePath('/')

    // return NextResponse.json({ Message: "Success", status: 201 });
    console.log('Success...........')
  } catch (error) {
    console.log("Error occured ", error);
    // return NextResponse.json({ Message: "Failed", status: 500 });
  }

}