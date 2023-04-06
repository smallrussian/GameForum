// pages/api/createPost.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../utils/supabaseClient';
import { upsertIfNotExists } from '../../../utils/helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {forumPost} = req.body
  const {title, content, game, username} = forumPost
  await supabase 
    .from('games')
    .upsert({game}, {onConflict: 'game'})
    .select()
    

  if (req.method==='POST') {

    console.log(req.body)
    
  const {error} = await supabase
      .from('posts')
      .insert([ {title, content, username, game} ])
      .select()
      if(error) {
        res.status(500).json({error: error.message})
      }  else {
        res.status(200).json({message: 'Post created'})
      }
      
}


}
