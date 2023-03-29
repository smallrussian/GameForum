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
    <div className='reply ml-4' style={{marginLeft: `${depth*20}px`}} >
      <p>{content}</p>
      {children}
      <div>
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          value={nestedReplyContent}
          onChange={(e) => setNestedReplyContent(e.target.value)}
          placeholder="Reply to this comment"
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  )
  
          
}

export default Reply;
