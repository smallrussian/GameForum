import React, { useState } from 'react';
import { useUser } from '@/utils/useUser';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { getURL } from '@/utils/helpers';

const SignIn = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <div>
      <Auth
        supabaseClient={supabaseClient}
        providers={['github', 'discord']}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: '#6e43db', brandAccent: '#5959e0' } }
          }
        }}
        socialLayout="vertical"
        theme="dark"
        redirectTo={`${getURL()}/redirect`}
      />
    </div>
    // a coment
  );
};
export default SignIn;
