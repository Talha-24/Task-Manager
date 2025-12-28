import { useEffect } from "react";
import { supabase } from "../../database/supabase/supabaseClient"
import { useAuthentication } from "../../hooks/useAuthentication";

const Profile = () => {
    const {session}=useAuthentication();




    return (
        <h1>Hello Talha how are you</h1>
    )
}
export default Profile