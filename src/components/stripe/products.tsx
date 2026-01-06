import axios from "axios";
import { useEffect, useState } from "react";
import { supabase } from "../../database/supabase/supabaseClient";

const MyProducts = () => {
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const {data,error}=await supabase.from("products").select("*");
      if(data){
          setAvailableProducts(data);
      }
    })();
  }, []);




  const checkout = async () => {
    const res = await axios.post("http://localhost:4242/create-checkout-session", { productIds: cart });
    window.location.href = res.data.url;
  };


  const addToChart=(id:any)=>{
    setCart((prev)=>[...prev,id]);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="flex flex-wrap gap-4">
        {availableProducts.map(product => (
          <div
            key={product.id}
            className="border rounded-lg p-4 w-[300px] shadow"
          >
            <h2 className="font-semibold">{product.product_name}</h2>
            <p className="text-sm text-gray-600">{product.product_description}</p>

            <div className="mt-3">
              <div className="flex gap-2">
                    {/* <button
                      className="px-2 bg-gray-200"
                    //   onClick={() => removeFromCart(product.product_price)}
                    >
                      −
                    </button> */}
                    {/* <span>{ || 0}</span> */}
                    <button
                      className="px-2 bg-gray-200"
                      onClick={() => addToChart(product.id)}
                    >
                      +
                    </button>
                  </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={checkout}
        className="mt-6 px-6 py-3 bg-black text-white rounded"
      >
        Checkout
      </button>
    </div>
  );
};

export default MyProducts;
