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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/createPost');
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

  return (
    <div>
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