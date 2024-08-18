// pages/index.tsx (or your desired homepage file)
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  userId: number;
  // Add other fields as needed
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/createPost'); // Adjust path if necessary
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPostTitle) {
      alert('Please enter a title for your post.');
      return;
    }

    try {
      const response = await axios.post('/api/createPost', { title: newPostTitle, userId : '66c135bee5fc1757a1aec248' });
      setPosts([...posts, response.data]); // Add new post to state
      setNewPostTitle(''); // Clear form input
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post');
    }
  };

  return (
    <div>
     
      <div className='flex flex-col '>
      <h2>Create a New Post</h2>
      <form onSubmit={handleCreatePost}>
        <label htmlFor="newPostTitle">Title:</label>
        <input
          type="text"
          id="newPostTitle"
          value={newPostTitle}
          className='text-black'
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
      </div>
      <h1>Latest Posts</h1>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}