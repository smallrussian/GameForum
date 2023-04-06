// pages/api/getPosts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabaseClient';

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: posts, error } = await supabase.from('posts').select('*');

    if (error) throw error;

    if (req.method==='GET') {
        return res.status(200).json({ posts});
    }
    return res.status(200).json(posts);
  }
  catch (error:any) {
    return res.status(500).json({ error: error.message });
  }
};

export default getPosts;
