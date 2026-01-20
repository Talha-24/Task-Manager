interface AtomicTextArea extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
    placeholder?: string;
}

const Textarea: React.FC<AtomicTextArea> = ({ onClick,  placeholder, className, id,...props }) => {

    return (
        <textarea onClick={onClick} placeholder={placeholder} className={className} id={id} {...props} ></textarea>
    )
}

export default Textarea