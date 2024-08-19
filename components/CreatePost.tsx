"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import prisma from '@/lib/prisma';
import { createPost } from './actions';
interface Post {
  id: number;
  title: string;
  userId: number;
  // Add other fields as needed
}

export default  function CreatePost() {


  const [newPostTitle, setNewPostTitle] = useState('');


 
  return (
    <div className='flex justify-center'>
     

      <form action={createPost} className='flex flex-col max-w-52'>
        <label htmlFor="newPostTitle">Title:</label>
        <input
          type="text"
          id="newPostTitle"
          name='title'
          value={newPostTitle}
          className='text-black p-2 rounded-md'
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <button type="submit" className='mt-4 bg-lime-600 px-6 rounded-lg py-2'>Create Post</button>
      </form>
    
      
    </div>
  );
}