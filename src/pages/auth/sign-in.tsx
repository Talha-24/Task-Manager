import { useNavigate } from "react-router-dom"

const SignIn=()=>{

    const goTo=useNavigate();

    return (
        <h1 onClick={()=>{
            goTo("/app/home");
        }}>SignIn</h1>
    )
}
export default SignIn