import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { useUser } from '@/utils/useUser';
import Spacer from '@/components/Spacer';
import Navbar from '@/components/Navbar';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useStore } from '../state/store';

const CreatePost = () => {
  const { userDetails } = useUser();
  // const [content, setContent] = useState({});
  const router = useRouter();
  // const createPost = useStore((state:any) => state.createPost )

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const forumPost = {
      title: e.target.title.value,
      game: e.target.game.value,
      content: e.target.content.value,
      email: userDetails?.username,
      user_id: userDetails?.id
    };
    console.log(forumPost);
    await axios.post('/api/posts/createPost', { forumPost });
    router.push('/');
  };
  return (
    <div className="bg-slate-700 min-h-screen text-gray-300">
      <Navbar createPost />
      <Spacer>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Create Post</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="mb-2 block">
              <Label htmlFor="title" value="Enter Title">
                Title
              </Label>
            </div>
            <TextInput
              id="title"
              type="text"
              name="title"
              required
              placeholder="Enter title"
              shadow
            />
            <div className="mb-2 block">
              <Label htmlFor="game" value="Enter Game">
                Game
              </Label>
            </div>
            <TextInput
              id="game"
              type="text"
              name="game"
              required
              placeholder="Enter game"
              shadow
            />
            <div className="mb-2 block">
              <Label htmlFor="content" value="Enter Post content">
                Content
              </Label>
            </div>
            <TextInput
              id="content"
              type="text"
              name="content"
              required
              placeholder="Enter content"
              shadow
              sizing="lg"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Spacer>
    </div>
  );
};
export default CreatePost;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  return {
    props: {
      initalSession: session,
      user: session.user
    }
  };
};
