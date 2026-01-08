import { supabase } from "../database/supabase/supabaseClient"

const Order=()=>{


    const createOrder=async()=>{
        await supabase.from("Test_Table").insert([{name: "name", age : 20,}])
    }


    return (
        <div>
            <h1 onClick={createOrder}>Hello World</h1>
        </div>
    )

}
export default Order