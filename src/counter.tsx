import { useState } from "react"

const Counter = () => {

    const [count, setCount] = useState(0);
    let jsVAriable=0;

    console.log("count",count, " js variable ",jsVAriable);

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="border  flex flex-col items-center justify-center gap-10 w-50 h-50">
                <h1 className="h-10 w-10 border flex items-center justify-center rounded-sm">{count}</h1>
                <div className="flex items-center gap-3">
                    <button className="bg-green-500 px-3 py-1 rounded-sm" onClick={() => { setCount((prev) => prev + 1);
                        jsVAriable++;
                     }}>+1</button>
                    <button className="bg-red-500 px-3 py-1 rounded-sm" onClick={() => { setCount((prev) => prev - 1) ;
                        jsVAriable++;
                    }}>-1</button>
                </div>
            </div>
        </div>
    )
}
export default Counter