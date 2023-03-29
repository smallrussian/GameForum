// components/Post.tsx
import reply from '@/pages/api/posts/[id]/replies';
import { Reply as ReplyType } from '@/types/other';
import React, { useState } from 'react';
import Reply from './Reply';
import axios from 'axios';
import { Label, TextInput } from 'flowbite-react';
import type { Post as PostType } from '@/types/other';
import { useUser } from '@/utils/useUser';
type PostProps = {
  post : PostType;
  responses: ReplyType[]| null;
  parentReplyId?: string | number | null;

};



//a react component called Post taht takes in a title, content, and responses as props and returns a div with a h2, p, and div with a list of responses
export const Post = ({ post, responses=[], parentReplyId=null,}:PostProps) => {
  const [replyContent, setReplyContent] = useState('');
  const {user, userDetails} = useUser()
  const { title, content, id, username } = post;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(`/api/posts/replies/${id}`, {
      content: replyContent,
      username,
      parentReplyId: null,
    });
    setReplyContent('');
    


            
          

  };
  const renderReplies = (replies:ReplyType[], parentId:string|number|null=null, depth:number) => {
    if (depth>replies.length)  {
      return null
    }
    // console.log(replies)
    return replies
  
    .filter(
      (reply) => 
        parentId === null
        ? reply.parent_reply_id === null && reply.post_id === id
        : reply.parent_reply_id === parentId
    ).map((reply) => {
      const childReplies = renderReplies(replies, reply.id, depth+1)
      return (
        <Reply
          key={reply.id}
          reply={reply}
          postId={id}
          parent_reply_id={parentId}
          depth={depth}
        >
          {childReplies && childReplies.length > 0}
        </Reply>
      )

    }
    )
        
       
  } /* .filter(
      (reply) => reply.parentReplyId === parentId || reply.post_id === id
    ) */
    /* .filter((reply) => parentId === null
    ? reply.parentReplyId === null
    : reply.parentReplyId === parentId) */
  
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <div>
        {renderReplies(post.replies, null, 1)}
      </div>
      <form onSubmit={handleSubmit}>
        <TextInput
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Reply to this comment"
        />
        <button type="submit">Reply</button>
      </form>
    </div>
  );
};

          