import { UserDetails } from '@/types';
import { supabase } from './supabaseClient';

export const updateEmail = async (email: string, userDetails: UserDetails) => {
  const { error } = await supabase.auth.updateUser({ email });
  if (error) alert(error.message);
  else alert('Check your email for the confirmation link!');
};

export const updateUsername = async (
  username: string,
  userDetails: UserDetails
) => {
  const { error } = await supabase.auth.updateUser({ data: { username } });
  if (error) alert(error.message);
  else alert('Username updated!');
};
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};
