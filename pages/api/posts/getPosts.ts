// pages/api/getPosts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServer = createServerSupabaseClient<Database>({
    req,
    res
  });
  try {
    const { data: posts, error } = await supabaseServer
      .from('posts')
      .select('*');

    if (error) throw error;

    if (req.method === 'GET') {
      return res.status(200).json({ posts });
    }
    return res.status(200).json(posts);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default getPosts;
