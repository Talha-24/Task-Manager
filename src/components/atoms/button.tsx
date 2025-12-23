interface AtomicButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: React.FC<AtomicButton> = ({ onClick, className, children }) => {

    return (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    )
}
export default Button;