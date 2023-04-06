// types.ts
export type Post = {
    id: string | number;
    title: string;
    content: string;
    username: string;
    game: string;
    replies: Reply[];
  };
export type Reply = {
    id: string;
    content: string;
    username: string;
    post_id: string;
    parent_reply_id:string | null;
    replies: Reply[] | null;
};