import React from 'react';
import type { Post as PostType, Reply as ReplyType } from '../types/other';
import { Post } from './Post';

type Props = {
  posts: PostType[];
};

const PostList = ({ posts }: Props) => (
  <div>
    {posts.map((post) => (
      <Post
        key={post.id}
        post={post}
        responses={
          post.replies &&
          post.replies.filter((reply) => reply.post_id === post.id)
        }
      />
    ))}
  </div>
);

export default PostList;
