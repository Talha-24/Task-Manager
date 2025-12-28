interface AtomicInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
    type: string;
    placeholder?: string;
    formValidation?:any;
}

const Input: React.FC<AtomicInput> = ({ onChange, type, placeholder,value, className, id,disabled,checked,onClick,formValidation,title,required,pattern,...props}) => {

    return (
        <input  type={type} value={value} onChange={onChange} placeholder={placeholder}   id={id} disabled={disabled} checked={checked} onClick={onClick} {...formValidation} title={title} required={required} pattern={pattern} className={className} {...props} />
    )
}

export default Input