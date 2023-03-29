import { NextPage, GetServerSideProps } from 'next';
import React from 'react';

import axios from 'axios';
import type { Post, Reply } from '../types/other';
import PostList from '@/components/PostList';

type Props = {
  posts: Post[];
};

const HomePage = ({ posts }: Props) => {
  const games = ['game1', 'game2']; // Add more games here
  console.log(posts)
  return (
    <div className="bg-black">
      {games.map((game) => (
        <div key={game}>
          <h2 className="text-2xl font-bold">{game}</h2>
          <PostList posts={posts}
          />
        </div>
          
        
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetching posts
  const postData = await axios.get('http://localhost:3000/api/posts/getPosts');
  const posts = postData.data.posts;
  console.log()

  // Fetching replies for each post
  const updatedPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const replyData = await axios.get(
        `http://localhost:3000/api/posts/replies/${post.id}`
      );
      
      
      return {
        ...post,
        replies: replyData.data.replies,
      };
    })
  );
    // console.log(updatedPosts)
  return { props: { posts: updatedPosts } };
};

export default HomePage;