import { useState } from 'react';
import { useUser } from '@/utils/useUser';
import {
  useSupabaseClient,
  useUser as useSupaUser
} from '@supabase/auth-helpers-react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import { Label, TextInput, Spinner } from 'flowbite-react';

const Profile = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user, userDetails, isLoading } = useUser();
  // const {user, userDetails, isLoading} = useUser();
  const [username, setUsername] = useState(userDetails?.username);
  const [fullName, setFullName] = useState(userDetails?.full_name);
  const [avatarUrl, setAvatarUrl] = useState(userDetails?.avatar_url);
  console.log(userDetails);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase
      .from('profiles')
      .update({ username, full_name: fullName, avatar_url: avatarUrl })
      .eq('id', userDetails?.id);

    if (error) {
      alert(error.message);
    } else {
      alert('Profile updated!');
      router.push('/');
    }
  };

  if (!user) {
    router.push('/signin');
  }

  return (
    <div className="">
      <h1>Update Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Enter Username">
              Username
            </Label>
          </div>
          <TextInput
            id="username1"
            type="text"
            name="username"
            required={!userDetails?.username}
            placeholder={
              userDetails?.username ? userDetails?.username : 'Enter username'
            }
            shadow
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="full_name" value="Enter Full Name">
              Full Name
            </Label>
          </div>
          <TextInput
            id="full_name"
            type="text"
            name="full_name"
            required={!userDetails?.full_name}
            placeholder={
              userDetails?.full_name
                ? userDetails?.full_name
                : 'Enter full name'
            }
            shadow
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="avatar_url" value="Enter Avatar URL">
              Avatar URL
            </Label>
          </div>
          <TextInput
            id="avatar_url"
            type="text"
            name="avatar_url"
            required={!userDetails?.avatar_url}
            placeholder={
              userDetails?.avatar_url
                ? userDetails?.avatar_url
                : 'Enter avatar url'
            }
            shadow
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        <br />
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
