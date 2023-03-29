import { supabase } from "@/utils/supabaseClient"
import type { NextApiRequest, NextApiResponse } from "next"
export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    const {postId} = req.query
    console.log(`postId: ${postId}`)
    if (req.method == 'POST') {
        const {content, parentReplyId, username} = req.body
        if(!content || content.trim() === '') {
            return res.status(400).json({error: 'Reply cannot be empty'})
        }
        try {
            const {data, error} = await supabase
                .from('replies')
                .insert([{post_id: postId, content, parent_reply_id: parentReplyId, username}])
                .select()
            res.status(200).json({reply: data})
        } catch (error) {
            return res.status(500).json({error: error})
            
        }
    }

    if (req.method == 'GET') {
        try {
            const {data, error} = await supabase
                .from('replies')
                .select('*')
                .eq('post_id', postId)
            res.status(200).json({replies: data})
        } catch (error) {
            return res.status(500).json({error: error})
            
        }
    }
}