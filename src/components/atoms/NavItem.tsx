
const NavItem: React.FC<HTMLDivElement | HTMLOrSVGElement | HTMLSpanElement | any> = ({ svg, title, onClick, className }) => {


    return (
        <div onClick={onClick} className={`flex  items-center gap-9 py-2   rounded-lg cursor-pointer px-4 text-black ${className}`}>
            {svg}
            
            {title &&
                <span className="font-semibold text-lg text-(--primary-text)">{title}</span>
            }
        </div>
    )
}
export default NavItem