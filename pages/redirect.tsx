import { useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import { useRouter } from 'next/router';

const AuthHandler = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.user_metadata.username) {
        // If user metadata is filled out, the user has signed in before.
        router.push('/');
      } else {
        // If user metadata is not filled out, the user is a new sign up.
        router.push('/setupProfile');
      }
    }
  }, [user, router]);

  return <div>Loading...</div>;
};

export default AuthHandler;
