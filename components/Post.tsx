// components/Post.tsx
import { useRouter } from 'next/router';
import { Reply as ReplyType } from '@/types/other';
import React, { useState } from 'react';
import axios from 'axios';
import { Label, TextInput } from 'flowbite-react';
import type { Post as PostType } from '@/types/other';
import { useUser } from '@/utils/useUser';
import Reply from './Reply';

type PostProps = {
  post: PostType;
  responses: ReplyType[] | null;
  // eslint-disable-next-line react/require-default-props
  parentReplyId?: string | number | null;
};

// a react component called Post taht takes in a title, content, and responses as props and returns a div with a h2, p, and div with a list of responses
export const Post = ({
  post,
  responses = [],
  parentReplyId = null
}: PostProps) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { user, userDetails } = useUser();
  const { title, content, id, username } = post;
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(`/api/posts/replies/${id}`, {
      content: replyContent,
      username,
      parent_reply_id: null,
      post_id: id,
      user_id: userDetails?.id
    });
    setReplyContent('');
    router.push('/');
  };
  const renderReplies = (
    replies: ReplyType[],
    // eslint-disable-next-line default-param-last
    parentId: string | number | null = null,
    depth: number
  ) => {
    if (depth > replies.length) {
      return null;
    }
    // console.log(replies)
    return replies

      .filter((reply) =>
        parentId === null
          ? reply.parent_reply_id === null && reply.post_id === id
          : reply.parent_reply_id === parentId
      )
      .map((reply) => {
        const childReplies = renderReplies(replies, reply.id, depth + 1);
        return (
          <Reply
            key={reply.id}
            reply={reply}
            postId={id}
            parent_reply_id={parentId}
            depth={depth}
          >
            {childReplies && childReplies.length > 0 && childReplies}
          </Reply>
        );
      });
  }; /* .filter(
      (reply) => reply.parentReplyId === parentId || reply.post_id === id
    ) */
  /* .filter((reply) => parentId === null
    ? reply.parentReplyId === null
    : reply.parentReplyId === parentId) */

  return (
    <div className=" p-6 roundex-xl mb-8">
      <h2 className="text-accent font-bold text-2xl mb-2">{title}</h2>
      <p className="text-secondary mb-4">{content}</p>
      <div className="mb-4">{renderReplies(post.replies, null, 1)}</div>
      <button
        className="text-secondary"
        type="button"
        onClick={() => setShowReplyForm(!showReplyForm)}
      >
        {showReplyForm ? 'Hide' : 'Reply'}
      </button>

      {showReplyForm && (
        <form className="mt-4" onSubmit={handleSubmit}>
          <TextInput
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Reply to this comment"
          />
          <button
            className="bg-accent text-secondary rounded-md px-4 py-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
