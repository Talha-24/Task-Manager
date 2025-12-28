interface AtomicButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: React.FC<AtomicButton> = ({ onClick, className, children,type,disabled }) => {

    return (
        <button onClick={onClick} className={className??' w-7 flex items-center justify-center rounded-sm'} type={type} disabled={disabled} >
            {children}
        </button>
    )
}
export default Button;