/* eslint-disable camelcase */
import { Database } from '@/types/supabase';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient<Database>({
    req,
    res
  });
  const { postId } = req.query;
  console.log(`postId: ${postId}`);
  if (req.method === 'POST') {
    console.log('i got it!');
    const { content, parent_reply_id, username, post_id, user_id } = req.body;
    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Reply cannot be empty' });
    }
    try {
      await supabase
        .from('replies')
        .insert([{ content, post_id, parent_reply_id, username, user_id }]);
      console.log('success!');
      return res.status(200).json({ Posted: true });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('replies')
        .select('*')
        .eq('post_id', postId);
      return res.status(200).json({ replies: data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
