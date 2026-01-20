import { useEffect, useState } from "react";
import { supabase } from "../database/supabase/supabaseClient";
import axios from "axios";
import { useAuthentication } from "../hooks/useAuthentication";
import BounceLoader from "./molecules/bounce-loader";

interface myPlan {
  name: string;
  id: string;
  stripe_price_id: string;
  price: string;
  features: string[];
  period: number;
  permissions: string[];
}
const Subscriptions = () => {
  const [allPlans, setAllPlans] = useState<myPlan[]>([]);
  const { profile,loader,setLoader } = useAuthentication();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("plans").select("*");
      if (data) {
        setAllPlans(data);
      }
    })();
  }, []);

  const createCheckoutSession = async (
    planId: string,
    userId: string | undefined
  ) => {
    setLoader(true);
    try {
      const response = await axios.post(
        `http://localhost:4242/create-checkout-session?userId=${userId}&planId=${planId}`,{}
      );
      window.location.href = response?.data?.url;
    } catch (error) {}finally{
        setLoader(false);
    }
  };


  const fetchUserSubscription=async()=>{
    try {
      const {data,error}=await supabase.from("user_subscription").select("plan_id,status,stripe_session_id,created_at").eq("user_id",profile?.id).maybeSingle()
      console.log("DATA ",data);
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchUserSubscription();
  },[])


  return (
    <div className="font-[Poppins] flex flex-col gap-10">
      <h1 className="text-3xl text-center font-extrabold">Subscription</h1>
      <div className="flex gap-5">
        {allPlans.map((product) => {
          return (
            <div className="flex flex-col gap-2 border-black border p-4 rounded-lg">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-2xl">{product.name}</h1>
                <h3>{product.period} Months</h3>
                <div className="">
                  <h1 className="text-lg font-bold">Features</h1>
                  {product.features.map((feature) => {
                    return <li className="">{feature}</li>;
                  })}
                </div>
                <button
                  disabled={loader}
                  onClick={() => {
                    createCheckoutSession(product.stripe_price_id, profile?.id);
                  }}
                  className="border px-2 py-1 bg-black  text-white hover:bg-gray-600 cursor-pointer rounded-lg"
                >
                {loader ? <BounceLoader/> : 
                <>
                  Purchase for {product.price}
                </>
                }
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Subscriptions;
