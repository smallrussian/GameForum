import {create} from 'zustand';

type State = {
    posts:{id:number, title:string, responses:{id:number; content: string}[]}[]
    addPost: (post:{id:number, title:string,responses: {id:number, content: string}[] }) => void
    addResponse: (postId:number, response:{id:number; content: string}) => void
}


export const useStore = create<State>((set) => ({
    posts: [],
    addPost: (post) => set(state => ({posts: [...state.posts, post]})),
    addResponse: (postId, response) => set(state => {
        const postIndex = state.posts.findIndex(post => post.id === postId)
        if(postIndex === -1) return state;
        const updatedPosts = [...state.posts]
        updatedPosts[postIndex].responses.push(response)
        return {posts: updatedPosts}
    })
}))