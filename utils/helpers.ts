import { supabase } from "./supabaseClient";
import { UserDetails } from "./types";

export const updateEmail = async (email: string, userDetails: UserDetails) => {
    const { error } = await supabase.auth.updateUser({ email: email });
    if (error) alert(error.message);
    else alert("Check your email for the confirmation link!");
};

export const updateUsername = async (username:string , userDetails: UserDetails) => {
    const { error } = await supabase.auth.updateUser({ data: { username: username } });
    if (error) alert(error.message);
    else alert("Username updated!");
}



    