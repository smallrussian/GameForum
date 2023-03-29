// pages/forum/[postId].tsx
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { supabase } from '../../utils/supabaseClient';
import { Post } from '../../components/Post';
import type {Post as PostType} from '../../types/other'

type ForumPostPageProps = {
  post: PostType;
};

export default function ForumPostPage({ post }: ForumPostPageProps) {
  const router = useRouter();
  const postId = router.query.postId;

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Forum Post #{postId}</h1>
      <Post postId={post.id} content={post.content} responses={post.responses} game={''} />
      {/* Add components and logic for submitting responses here */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  const postId = context.params.postId;

  // Fetch the post and its responses from the database (using Supabase)
  const { data: postData, error: postError } = await supabase.from('posts').select('*').eq('id', postId);
  const { data: responseData, error: responseError } = await supabase.from('responses').select('*').eq('post_id', postId);

  if (postError || responseError || !postData || postData.length === 0) {
    return { notFound: true };
  }

  //combine the post and response data into a single object
    const post = {
    id: postData[0].id,
    content: postData[0].content,
    responses: responseData.map((response) => ({
        id: response.id,
        content: response.content,
    })),
    };

  return {
    props: {
      post,
    },
  };
};
