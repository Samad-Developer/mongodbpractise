"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export async function createPost(formdata: FormData) {
    const title = formdata.get("title") as string
    const userId = "66c135bee5fc1757a1aec248"
    await prisma.post.create({
        data: { title, userId },
      });
    revalidatePath("/")
}