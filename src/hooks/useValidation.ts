import type React from "react"


const useValidations = () => {


    const passwordValidation = {
        required: true,
        minLength: { value: 8, message: "Password must be greater than 8 characters" },
        validate: {
            hasUpperCase: (value: string) => /[A-Z]/.test(value) || "Password must includes UpperCase (A-Z) letter..",
            hasLowerCase: (value: string) => /[a-z]/.test(value) || "Password must includes LowerCase (a-z) letter..",
            hasSpecialChar: (value: string) => /[!@#$*_.><]/.test(value) || "Password must includes Special Char (@*/_&$%)..",
            hasNumber: (value: string) => /[0-9]/.test(value) || "Password must includes a Number..",
        }
    }

    const cnicValidation = {
        required: true,
        minLength: { value: 13, message: "CNIC must be 13 digits in length" },
        validate: {
            cnic: (value: string) => /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(value) || "CNIC must follows  XXXXX-XXXXXXX-X pattern",
        }
    }

    const emailValidation = {
        required: true,
        validate: {
            hasEmailPattern: (value: string) => /^([A-Za-z0-9])+@([A-Za-z])+.([A-Za-z]{2,})$/.test(value) || "Invalid email address (e.g., abcd@gmail.com)."
        }
    }

    const phoneNumberValidation = {
        required: true,
        minLength: { value: 11, message: "Phone number must no longer than 13" }
    }

    const confirmPasswordValidation = (password: string) => {
        return {
            required: true,
            validate: (value: string) => value === password || "Passwords do not match"
        }
    }

    const validatePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>,) => {
        let number = Number(event.target.value);
        if (isNaN(number)) {
            event.target.value = "";
        } else if (typeof number == "number") {
           return event.target.value;
        }
    };

    return {
        emailValidation,
        passwordValidation,
        cnicValidation,
        phoneNumberValidation,
        confirmPasswordValidation,
        validatePhoneNumber,
    }
}

export default useValidations