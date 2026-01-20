import { useEffect, useState, type FormEvent } from "react"
import { getRequest, postRequest } from "../../http/http-methods"
import api from "../../http/axios-instance";
import FormInputField from "../molecules/form-input-field";
import Button from "../atoms/button";
import BounceLoader from "../molecules/bounce-loader";
import { MdEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

const Users=()=>{


    const [allUsers,setAllUsers]=useState([])
    const [userDetails,setUserDetails]=useState<{username:string,email:string}>({username:"",email:""});

    const fetchUsers=async()=>{
        try {
            const data=await api.get("/users/view-all");
            setAllUsers(data.data.data);
            console.log("DATa ",data);
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[])

    const loader=false;


    const onSubmit=(event:FormEvent)=>{
        event.preventDefault();
createUser();
    }

    const createUser=async()=>{
        
        try {
            const data=await api.post("/users/create",userDetails)
        } catch (error) {
            
        }
    }




return (
    <div className="flex flex-col gap-2 items-center justify-center ">
   
   <div className="auth-box">
            <form onSubmit={onSubmit} className="flex flex-col gap-4 max-[500px]:gap-2" >
                <h1 className="text-(--primary-color) text-2xl font-semibold  font-[Poppins]">Create User</h1>

                {/* HIDDEN ON MOBILE DEVICES */}
                {window.innerWidth > 500 && <p className="text-[13px]  w-full text-(--primary-btn)">Enter your user details</p>}
                <div className="flex flex-col items-start gap-4 text-black w-full">
                    <FormInputField label="Email" type="name" placeholder="Enter Name" id="text"  onChange={(e)=>{
                        setUserDetails((prev)=>({...prev,username:e.target.value}))
                    }}  Icon={BsPerson} fieldClassName="auth-input" />
                    <FormInputField label="Password" type="email" placeholder="Enter Email"  id="password" onChange={(e)=>{
                        setUserDetails((prev)=>({...prev,email:e.target.value}))
                    }} Icon={MdEmail}  fieldClassName="auth-input" />
                    
                    <div className="w-full">
                        <Button disabled={loader} className="primary-auth-btn">
                            {loader ? <BounceLoader /> : "Create User"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>

<h1>All Users</h1>
<div className="border-1 h-1/2 flex flex-wrap gap-4 w-[80%]">

{allUsers.map((element:{username:string,email:string})=>{
    return (
        <div className="border-1 text-(--primary-text)">
        <p>Name {element.username}</p>
        <p>Email {element.email}</p>
        </div>
    )
})}

</div>

    </div>
)

}

export default Users