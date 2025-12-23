import { useCallback, useEffect, useState } from "react"

const UseEffect = () => {


    const [timer, setTimer] = useState(0);

    const handleData = useCallback(() => {
        setTimer((prev) => prev + 1);
    }, [])

    useEffect(() => {
        handleData();
    }, [])

    console.log("rendering");

    return (
        <div>
            {timer}
        </div>
    )
}
export default UseEffect