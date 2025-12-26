import type { FieldError } from "react-hook-form"
import { Fragment } from "react/jsx-runtime"
import FormErrorMessage from "../atoms/form-error-message"

interface MyFieldError {
    error: FieldError | undefined,
}

const ShowFormErrorMessage: React.FC<MyFieldError> = ({error}) => {



    return (
        <Fragment>
            {error?.type === "required" && (
                <FormErrorMessage message="This field is required" />
            )}
            {error?.type === "minLength" && (
                <FormErrorMessage message={error?.message} />
            )}
            {error?.type === "maxLength" && (
                <FormErrorMessage message={error?.message} />
            )}
            {(error?.type === "pattern" ||
                error?.type === "validate" ||
                error?.type === "hasSpecialChar" ||
                error?.type === "hasNumber" ||
                error?.type === "cnic" ||
                error?.type === "hasEmailPattern" ||
                error?.type === "hasLowerCase" ||
                error?.type === "hasUpperCase") && (
                    <FormErrorMessage message={error?.message} />
                )}
        </Fragment>
    )

}
export default ShowFormErrorMessage