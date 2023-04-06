import { NextPage, GetServerSideProps } from 'next';
import React, {useEffect, useState} from 'react';
import { useClientStore } from '@/useClientStore';
import axios from 'axios';
import type { Post, Reply } from '../types/other';
import PostList from '@/components/PostList';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';

type Props = {
  posts: Post[];
  games: string[];
};

//am async function that gets an array of games from the games table in supabase
console.error('this is the error')

const HomePage = ({ posts, games }: Props) => {
  const store = useClientStore();
  const selectedGame = store?.selectedGame;
  const setSelectedGame = store?.setSelectedGame
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-8 md:pt-16">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Game Forum</h1>
          <Link className="bg-accent text-secondary px-6 py-2 rounded-lg mb-8" href="/createPost">
            Create Post
          </Link>
          <div>
            <label htmlFor="game-select" className="text-white"></label>
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
          </div>
          {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
          {selectedGame && (
            <div className="mt-8 w-full  gap-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 col-span-full">{selectedGame}</h2>
              <PostList
                key={selectedGame}
                posts={posts.filter((post) => post.game === selectedGame)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetching posts
  const postData = await axios.get('http://localhost:3000/api/posts/getPosts');
  const gameData = await axios.get('http://localhost:3000/api/games/getGames');
  const gamesObj = gameData.data.games
  const games: string[] = gamesObj.map((game: {game:string}) => game.game)
  // const initialGames=games
  
  const posts = postData.data.posts;

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
  return { props: { posts: updatedPosts, games } };
};

export default HomePage;