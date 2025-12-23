
export interface AtomicSVgElement extends React.SVGAttributes<HTMLOrSVGElement> {

}

const MenuIcon: React.FC<AtomicSVgElement> = ({ onClick, width = 22, height = 22, className,stroke="black" }) => {
    return (
        <svg onClick={onClick} width={width} height={height} className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33337 6.66666H26.6667" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33337 16H26.6667" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.33337 25.3333H26.6667" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default MenuIcon