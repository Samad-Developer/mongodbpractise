// Handle POST request to create a user
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Adjust the path as necessary

// Handle POST request to create a user
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const user = await prisma.user.create({
      data: { email },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}


// Handle GET request to fetch users
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error retrieving posts:', error);
    return NextResponse.json({ error: 'Failed to get posts' }, { status: 500 });
  }
}