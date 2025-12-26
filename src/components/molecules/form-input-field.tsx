import type { MouseEventHandler } from "react";
import Input from "../atoms/input"
import ShowFormErrorMessage from "./show-form-error-message";
import type { FieldError } from "react-hook-form";



interface FormInputField extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id?:string;
    validationMessage: FieldError | undefined,
    formValidation: any,
    Icon: React.FC<{fontSize:string; className:string;}>;
    IconOnClick?:MouseEventHandler,
    props?:any,
}

const FormInputField: React.FC<FormInputField> = ({ label, id, type, placeholder, validationMessage, formValidation, Icon,IconOnClick,props }) => {


    return (
        <div className="flex flex-col gap-0.5 text-left w-full">
            <label htmlFor={id} className="font-medium text-sm">{label}</label>
            <div className="flex items-center border border-[#dadada] rounded-[7px] pr-1">
                <Input  type={type} placeholder={placeholder} id={id}  formValidation={formValidation} {...props}/>
                <div className="w-8 h-8 flex items-center justify-center after::" onClick={IconOnClick} >
                    <Icon fontSize={'20px'} className="cursor-pointer" />
                </div>
            </div>
            <ShowFormErrorMessage error={validationMessage} />
        </div>
    )
}

export default FormInputField