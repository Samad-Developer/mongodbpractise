import { useState } from "react";
import prisma from "@/lib/prisma";
import { User, Post } from "@prisma/client";

export default async function Home() {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch users and posts from the database
  try {
    const fetchedUsers = await prisma.user.findMany();
    const fetchedPosts = await prisma.post.findMany();
    setUsers(fetchedUsers);
    setPosts(fetchedPosts);
  } catch (err) {
    console.error("Error fetching data:", err);
    setError("Failed to fetch data. Please try again later.");
  }

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      setPosts([...posts, newPost]);
      setTitle('');
      setUserId('');
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again later.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-black">User and Post Data</h1>

      {/* Error Handling */}
      {error && (
        <div className="text-black p-4 mb-8">
          <p>{error}</p>
        </div>
      )}

      {/* Post Creation Form */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-black">Create a Post</h2>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-md font-medium text-black mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="userId" className="block text-md font-medium text-black mb-2">User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create Post</button>
        </form>
      </section>

      {/* Display Users */}
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

      {/* Display Posts */}
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
