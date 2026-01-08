import { useEffect, useState } from "react";
import { supabase } from "../database/supabase/supabaseClient";
import axios from "axios";
import { getPurchasedProductIds } from "../hooks/utils";

const products=
   [
  {
    "product_name": "Porsche 911 Carrera",
    "product_image": "https://example.com/images/porsche-911.jpg",
    "product_price": 11200000,
    "product_description": "Iconic rear-engine sports car delivering razor-sharp handling, timeless design, and everyday usability."
  },
  {
    "product_name": "Mercedes-AMG GT 63 S",
    "product_image": "https://example.com/images/amg-gt-63.jpg",
    "product_price": 15950000,
    "product_description": "Luxury performance sedan with a handcrafted V8, brutal acceleration, and premium interior comfort."
  },
  {
    "product_name": "Lamborghini Huracán EVO",
    "product_image": "https://example.com/images/lamborghini-huracan.jpg",
    "product_price": 26100000,
    "product_description": "Naturally aspirated V10 supercar built for aggressive driving, exotic styling, and raw performance."
  },
  {
    "product_name": "Toyota Supra GR",
    "product_image": "https://example.com/images/toyota-supra.jpg",
    "product_price": 5499000,
    "product_description": "Rear-wheel-drive sports coupe tuned for enthusiasts, combining sharp handling with turbocharged power."
  }
]




const insertProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .insert(products);

  if (error) {
    console.error("Insert failed:", error);
    return;
  }

  console.log("Inserted:", data);
};


export interface Product {
  id: string;
  product_name: string;
  product_image: string;
  product_price: number;
  currency: "USD" | "PKR" | "EUR";
  product_description: string;
  created_at: string; // ISO date
}

const SupabaseProducts = () => {
  const [availableProducts, setAvailableProduct] = useState<Product[]>([]);

  const [sessionId,setSessionId,]=useState<string>("");
  const [isLoading,setIsLoading]=useState(false);
  
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (data) {
      setAvailableProduct(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [purchasedItemsIds,setPurchasedItemsIds]=useState<any[]>([]);

  const createCheckoutSession=async()=>{
    setIsLoading(true);
    try {        
        const data=await axios.post("http://localhost:4242/create-checkout-session",{productIds:purchasedItemsIds});
        localStorage.setItem("sessionId",data.data.id);
        window.location.href=data?.data?.url;
    } catch (error) {
        
    }finally{
      setIsLoading(false);
    }
  }


  
  const createCheckoutSessionSingle=async(purchased_id:string)=>{
    setIsLoading(true);
    try {        
        const data=await axios.post("http://localhost:4242/create-checkout-session",{productIds:[purchased_id]});
        localStorage.setItem("sessionId",data.data.id);
        window.location.href=data?.data?.url;
    } catch (error) {
        
    }finally{
      setIsLoading(false);
    }
  }





const toggleProduct = (id: string) => {
  setPurchasedItemsIds((prev) =>
    prev.includes(id)
      ? prev.filter((itemId) => itemId !== id) // deselect
      : [...prev, id] // select
  );
};


const [purchasedIds, setPurchasedIds] = useState<string[]>([]);

useEffect(() => {

  const fetchPurchased = async () => {
    const ids = await getPurchasedProductIds(localStorage.getItem("sessionId") as string);
    setPurchasedIds(ids);
  };

  fetchPurchased();
}, []);


  return (
    <div className="flex flex-row flex-wrap w-full gap-5">
      {availableProducts.map((product) => {
          const isSelected = purchasedItemsIds.includes(product.id);

        return (
          <div className="w-[220px] rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
            {/* Image */}
            <input type="radio" />
            <div className="h-[120px] w-full bg-gray-100">
              <img
                src={product.product_image}
                alt={product.product_name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col gap-2">
              {/* Name + Price */}
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold leading-tight line-clamp-2">
                  {product.product_name}
                </p>
                <span className="text-sm font-bold text-green-600">
                ${(product.product_price / 100).toLocaleString()}
                </span>
              </div>
              {/* Description */}
              <p className="text-xs text-gray-600 line-clamp-2">
                {product.product_description}
              </p>


{purchasedIds.includes(product.id) ? (
  <span className="mt-2 block text-center rounded-lg bg-green-100 text-green-700 text-xs font-semibold py-2">
    ✔ Purchased
  </span>
) : (
  <div className="flex gap-2">
              <button onClick={()=>{createCheckoutSessionSingle(product.id)}} className="mt-2 w-1/2 rounded-lg bg-black text-white text-xs py-2 hover:bg-gray-800">
          Buy Now
         </button>
           <button
            onClick={() => toggleProduct(product.id)}
            className={`mt-2 w-1/2 rounded-lg text-xs py-2 font-semibold ${
              isSelected
                ? "bg-gray-300 text-black"
                : "bg-red-800 text-white"
            }`}
          >
            {isSelected ? "Deselect" : "Select"}
          </button>
         </div>
)}




              

            </div>
          </div>
        );
      })}

      {purchasedItemsIds.length > 0 &&
      <div className="w-full fixed bottom-0 w-full bg-gray-400">
        <div className="w-[100px] mr-auto">
        <button disabled={isLoading} onClick={createCheckoutSession} className="mt-2 w-full rounded-lg bg-black text-white text-xs py-2 hover:bg-gray-800 bg-yellow-400 w-100">Checkout </button>
     </div>
      </div>}
    </div>
  );
};
export default SupabaseProducts;
