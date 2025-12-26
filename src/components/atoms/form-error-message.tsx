const FormErrorMessage: React.FC<{message:string | undefined}> = ({message}) => {

    return (
        <p className="text-red-500 text-[0.775rem] font-medium">{message}</p>
    )
}

export default FormErrorMessage