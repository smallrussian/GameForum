/* eslint-disable camelcase */
// pages/api/createPost.ts
import { Database } from '@/types/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabaseServer = createServerSupabaseClient<Database>({
    req,
    res
  });
  const { forumPost } = req.body;
  // eslint-disable-next-line camelcase
  const { title, content, game, username, user_id } = forumPost;
  // i need a variable to store the timestamp that works with timestampz postgres type

  await supabaseServer
    .from('games')
    .upsert({ game }, { onConflict: 'game' })
    .select();

  if (req.method === 'POST') {
    console.log(req.body);

    const { error } = await supabaseServer
      .from('posts')

      .insert([{ title, content, username, game, user_id }])
      .select();
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ message: 'Post created' });
    }
  }
}
