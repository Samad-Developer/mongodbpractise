import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust the path as necessary

// Handle POST request to create a post
export async function POST(request: Request) {
  try {
    const { title, userId } = await request.json();
    const post = await prisma.post.create({
      data: { title, userId },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
0

export async function GET() {
  try {
    const post = await prisma.post.findMany();
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get post' }, { status: 500 });
  }
}