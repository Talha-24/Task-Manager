interface AtomicButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: React.FC<AtomicButton> = ({ onClick, className, children }) => {

    return (
        <button onClick={onClick} className={'w-7 flex items-center justify-center rounded-sm '+className}>
            {children}
        </button>
    )
}
export default Button;