import { supabase } from '@/utils/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Process a get request
    const { id } = req.query;
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id);
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ post: data });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
