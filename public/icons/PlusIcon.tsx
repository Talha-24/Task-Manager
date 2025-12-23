import type { AtomicSVgElement } from "./MenuIcon"

const PlusIcon:React.FC<AtomicSVgElement> = ({onClick,width=16,height=16,className}) => {


    return (
        <svg onClick={onClick} width={width} height={height} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
export default PlusIcon