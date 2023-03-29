// pages/api/createPost.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {forumPost} = req.body
  const {title, content, username} = forumPost

  if (req.method==='POST') {

    console.log(req.body)
  
  const {error} = await supabase
      .from('posts')
      .insert([ {title, content, username} ])
      .select()
      if(error) {
        res.status(500).json({error: error.message})
      }  else {
        res.status(200).json({message: 'Post created'})
      }
      
}


}
