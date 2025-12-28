const BounceLoader: React.FC<{ color?: string }> = ({ color }) => {


    return (
        <div className="flex items-center justify-center gap-1.5">
            <span
                className={`${color ?? `bg-white`} w-2 h-2 rounded-full  animate-bounce [animation-duration:0.5s] [animation-delay:-0.3s]`}
            />
            <span
                className={`${color ?? `bg-white`} w-2 h-2 rounded-full   animate-bounce [animation-duration:0.5s] [animation-delay:-0.15s]`}
            />
            <span
                className={`${color ?? `bg-white`} w-2 h-2 rounded-full   animate-bounce [animation-duration:0.5s]`}
            />
        </div>
    )
}
export default BounceLoader;