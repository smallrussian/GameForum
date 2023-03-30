import axios from 'axios';
import { TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import type { Reply as ReplyType } from '../types/other';

type Props = {
  reply: ReplyType;
  parent_reply_id?: string | number | null;
  postId: string | number | null;
  depth: number;
  children?: React.ReactNode;
}
const Reply = ({reply, postId, parent_reply_id,children, depth}: Props) => {
  const [nestedReplyContent, setNestedReplyContent] = useState('');
  const [showNestedReplyForm, setShowNestedReplyForm] = useState(false);
  const {id, content, username, replies=[]} = reply;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     await axios.post(`/api/posts/replies/${id}`, {
      content: nestedReplyContent,
      username,
      parent_reply_id: id ,
      post_id: postId,
    });
    setNestedReplyContent('');
  }
  // console.log(children)
  return (
    <div className='ml-4 mb-4' style={{marginLeft: `${depth*20}px`}} >
      <p className='bg-secondary text-primary p-3 rounded-xl'>{content}</p>
      {children}
      <button className='bg-accent text-secondary rounded-md px-4 py-2 mt-2' onClick={() => setShowNestedReplyForm(!showNestedReplyForm)}>
        {showNestedReplyForm ? 'Hide' : 'Reply'}
      </button>
      <div>
      </div>
      <form className='mt-2' onSubmit={handleSubmit}>
        <TextInput
          className='mb-2 w-full bg-secondary text-primary rounded-md p-2'
          value={nestedReplyContent}
          onChange={(e) => setNestedReplyContent(e.target.value)}
          placeholder="Reply to this comment"
        />
        <button className='bg-accent text-secondary rounded-md px-4 py-2' type="submit">Reply</button>
      </form>
    </div>
  )
  
          
}

export default Reply;
