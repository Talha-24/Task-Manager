import { Route, Routes } from "react-router-dom"
import SupabaseProducts from "../components/supabase-products"
import PaymentSuccessful from "../components/payment-successful"
import PaymentError from "../components/payment-error"


const ProductRoutes=()=>{

    return (
        <Routes>
             <Route element={<SupabaseProducts/>} path="/" />
             <Route element={<PaymentSuccessful/>} path="payment-success" />
             <Route element={<PaymentError/>} path="payment-error" />
        </Routes>
    )

}
export default ProductRoutes