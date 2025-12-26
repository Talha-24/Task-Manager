import { useNavigate } from "react-router-dom";
import { ROUTES } from "../mixin/enums/enum.routes";

const useNavigateHooks = () => {

    const goTo = useNavigate();
    const goToSignIn = () => goTo(ROUTES.SIGNIN);
    const goToSignUp = () => goTo(ROUTES.SIGNUP);
    const goToForgotPassword = () => goTo(ROUTES.FORGOT_PASSWORD);
    const goToResetPassword = () => goTo("/reset-password");
    const goToDashboard = () => goTo("/dashboard");



    return {
        goTo,
        goToSignIn,
        goToSignUp,
        goToDashboard,
        goToForgotPassword,
        goToResetPassword,
    }

}
export default useNavigateHooks;