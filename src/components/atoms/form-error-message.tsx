const FormErrorMessage: React.FC<{message:string | undefined}> = ({message}) => {

    return (
        <p className="text-red-500 text-[0.875rem] font-medium h-fit">{message}</p>
    )
}

export default FormErrorMessage