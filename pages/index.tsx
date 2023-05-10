import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useClientStore } from '@/useClientStore';
import axios from 'axios';
import PostList from '@/components/PostList';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@/utils/useUser';

import type { Post, Reply } from '../types/other';

type Props = {
  posts: Post[];
  games: string[];
  user: any;
};

// am async function that gets an array of games from the games table in supabase

const HomePage = ({ posts, games, user }: Props) => {
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? 'https://game-forum-ten.vercel.app'
      : 'http://localhost:3000';
  const store = useClientStore();
  console.log(user);
  const userDetails = useUser();
  console.log(userDetails);
  const selectedGame = store?.selectedGame;
  const setSelectedGame = store?.setSelectedGame;
  return (
    <>
      <Navbar home />
      <div className="bg-slate-700 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center pt-8 md:pt-16">
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
              Game Forum
            </h1>
            <Link
              className="bg-accent text-secondary px-6 py-2 rounded-lg mb-8"
              href={`${baseURL}/createPost`}
            >
              Create Post
            </Link>
            <div>
              <label htmlFor="game-select" className="text-white">
                <select
                  className="ml-2 bg-white text-black rounded-md p-2"
                  name="game-select"
                  value={selectedGame}
                  onChange={(e) => setSelectedGame?.(e.target.value)}
                >
                  <option value="">Select a game</option>
                  {games.map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
            {selectedGame && (
              <div className="mt-8 w-full  gap-4">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 col-span-full">
                  {selectedGame}
                </h2>
                <PostList
                  key={selectedGame}
                  posts={posts.filter((post) => post.game === selectedGame)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // Fetching posts
  const baseURL =
    process.env.NODE_ENV === 'production'
      ? 'https://game-forum-ten.vercel.app'
      : 'http://localhost:3000';
  const supabase = createServerSupabaseClient(ctx);
  const { req } = ctx;

  const { data: gameData, error } = await supabase
    .from('games')
    .select('game')
    .order('game', { ascending: true });
  const games: string[] = gameData?.map((game) => game.game) || [];
  console.log(games);
  // const
  console.log(baseURL);
  const postData = await axios.get(`${baseURL}/api/posts/getPosts`);

  // const initialGames=games

  let { posts } = postData.data;
  if (!posts) {
    posts = [];
  }

  // Fetching replies for each post
  const updatedPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const replyData = await axios.get(
        `${baseURL}/api/posts/replies/${post.id}`
      );

      return {
        ...post,
        replies: replyData.data.replies
      };
    })
  );
  const {
    data: { session }
  } = await supabase.auth.getSession();
  // console.log(updatedPosts)
  return {
    props: {
      posts: updatedPosts,
      games,
      initialSession: session || null,
      user: session?.user || null
    }
  };
};

export default HomePage;
