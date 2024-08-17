import Image from "next/image";
import prisma from "@/lib/prisma";
import { User, Post } from "@prisma/client";

export default async function Home() {
  let users: User[] = [];
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    // Fetch users and posts from the database
    users = await prisma.user.findMany();
    posts = await prisma.post.findMany();
  } catch (err) {
    console.error("Error fetching data:", err);
    error = "Failed to fetch data. Please try again later.";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-black">User and Post Data</h1>

      {/* Error Handling */}
      {error && (
        <div className="text-black p-4 mb-8">
          <p>{error}</p>
        </div>
      )}

      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-black">Users</h2>
        <div className="p-6">
          {users.length > 0 ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="p-4">
                  <p className="text-xl font-semibold text-black">ID: {user.id}</p>
                  <p className="text-md text-black">Email: {user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">No users found</p>
          )}
        </div>
      </section>

      <section className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4 text-black">Posts</h2>
        <div className="p-6">
          {posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="p-4">
                  <p className="text-xl font-semibold text-black">Title: {post.title}</p>
                  <p className="text-md text-black">User ID: {post.userId}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-black">No posts found</p>
          )}
        </div>
      </section>
    </main>
  );
}
