import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@/utils/useUser";
import { updateEmail } from "@/utils/helpers";

export default function UpdateProfile() {
    
    const router = useRouter();
    return (
        <div>
            <h1>Update Profile</h1>
        </div>
    );
}