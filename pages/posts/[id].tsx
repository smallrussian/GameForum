import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { Spinner, Label, TextInput } from 'flowbite-react'

type replyProps = {
    postId: string | string[] | undefined
}
const Post = () => {
    const router = useRouter()
    const {id} = router.query
    const [post, setPost] = useState(null)

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/posts/${id}`).then((res) => {
                setPost(res.data.post[0])
            })
        }
    }, [id])
    return (
        <div>
            {post ? (
                <div>
                    
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p>Posted by {post.username}</p>
                    <ReplyForm postId={id} />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    )
}

const ReplyForm = ({postId}:replyProps) => {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3000/api/posts/${postId}/reply`, { content }) // this is the route that we created in the api
            setContent('')
            alert('Reply added')
        } catch (error) {
            console.error('Error submitting reply', error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Reply to this post</h2>
            <TextInput value={content} onChange={(e) => setContent(e.target.value)} required={true}/>
            <button type="submit">Submit</button>
        </form>
    )
}


export default Post