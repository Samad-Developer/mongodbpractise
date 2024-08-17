import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function Home() {
  // Fetch users and posts from the database
  const users = await prisma.user.findMany();
  const posts = await prisma.post.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 ">
      <h1 className="text-4xl font-bold mb-8">User and Post Data</h1>

      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {users.length > 0 ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li key={user.id} className="p-4 rounded-lg shadow-sm">
                  <p className="text-xl text-black-700 font-semibold">ID: {user.id}</p>
                  <p className="text-md text-black-700">Email: {user.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found</p>
          )}
        </div>
      </section>

      <section className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {posts.length > 0 ? (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="p-4 rounded-lg shadow-sm">
                  <p className="text-xl font-semibold">Title: {post.title}</p>
                  <p className="text-md ">User ID: {post.userId}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </section>
    </main>
  );
}
