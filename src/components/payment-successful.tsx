import { useNavigate } from "react-router-dom"

const PaymentSuccessful=()=>{
    const navigate=useNavigate();

    return (
              <div className="flex items-center justify-center h-screen flex flex-col">

            <h1 className="text-2xl">Your Payment is Succeeded </h1>
            <button onClick={()=>{
                navigate("/");
            }} className="border-2 px-2 py-2">Return to Products</button>
        </div>
    )

}
export default PaymentSuccessful