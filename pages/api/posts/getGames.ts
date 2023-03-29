import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabaseClient'
// import { useUser } from '@/utils/useUser'

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    const {data, error} = await supabase
        .from('games')
        .select('*')
    if (error) {
        return res.status(500).json({ error: error })
    }

    res.status(200).json({games: data} )
}