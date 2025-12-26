import { useAuthentication } from "../../hooks/useAuthentication";



const LogOut = () => {


    const {signOut}=useAuthentication();

    return (
        <h1 onClick={signOut}>Logout</h1>
    )

}

export default LogOut;