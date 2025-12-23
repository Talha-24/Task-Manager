interface AtomicInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
    type: string;
    placeholder?: string;
}

const Input: React.FC<AtomicInput> = ({ onChange, type, placeholder,value, className, id,disabled,checked,onClick }) => {

    return (
        <input  type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} id={id} disabled={disabled} checked={checked} onClick={onClick}/>
    )
}

export default Input