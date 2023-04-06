import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {Label, TextInput} from 'flowbite-react'
import { useUser } from "@/utils/useUser";
import Spacer from "@/components/Spacer";
import Navbar from "@/components/Navbar";
import { useStore } from "../state/store"

const CreatePost=() =>{
    const {userDetails} = useUser()
    // const [content, setContent] = useState({});
    const router = useRouter();
    // const createPost = useStore((state:any) => state.createPost )
  
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const forumPost = {
            title: e.target.title.value,
            game: e.target.game.value,
            content: e.target.content.value,
            username: userDetails?.username,

        } 
        console.log(forumPost)
        await axios.post('/api/posts/createPost', { forumPost });
        router.push('/');
  
    };  
    return (
        <div className="bg-slate-700 min-h-screen text-gray-300">
            <Navbar/>
            <Spacer>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">Create Post</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="mb-2 block">
                            <Label htmlFor="title"
                                value='Enter Title'>Title</Label>
                        </div>
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            required={true}
                            placeholder="Enter title"
                            shadow={true}
                            />
                        <div className="mb-2 block">
                            <Label htmlFor="game"
                                value='Enter Game'>
                                Game
                            </Label>
                        </div>
                        <TextInput
                            id="game"
                            type="text"
                            name="game"
                            required={true}
                            placeholder="Enter game"
                            shadow={true}
                            />
                        <div className="mb-2 block">
                            <Label htmlFor="content"
                                value='Enter Post content'
                                >Content</Label>

                        </div>
                        <TextInput
                            id="content"
                            type="text"
                            name="content"
                            required={true}
                            placeholder="Enter content"
                            shadow={true}
                            sizing="lg"
                            />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
                    </form>
                </div>
            </Spacer>
        </div>


        
    )

    

}
export default CreatePost

{/* <div>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="name" value="namelLabel">Content</Label>
                <div>
                    <TextInput id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your email"
                    required={true}/>
                </div>
                <div className="mb-2 block">
                <Label
                htmlFor="content"
                value="Large input"
                />
                </div>
            </form>
        </div> */}