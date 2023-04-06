import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/utils/supabaseClient'
// import { useUser } from '@/utils/useUser'


const getGames = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { data: games, error} = await supabase.from('games').select('game')
        if (error) throw error
        if (req.method==='GET') {
            console.log('games: ', games)
            return res.status(200).json({ games})
        }
        return res.status(200).json(games)
    }
    catch (error:any) {
        return res.status(500).json({ error: error.message })
    }
}
export default getGames