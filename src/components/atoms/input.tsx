interface AtomicInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
    type: string;
    placeholder?: string;
    formValidation?:any;
}

const Input: React.FC<AtomicInput> = ({ onChange, type, placeholder,value, className, id,disabled,checked,onClick,formValidation}) => {

    return (
        <input  type={type} value={value} onChange={onChange} placeholder={placeholder}   id={id} disabled={disabled} checked={checked} onClick={onClick} {...formValidation} className={className??" px-2.5 py-1.5 placeholder:text-[14px] outline-none w-full text-[14px] rounded-l-md"}  />
    )
}

export default Input