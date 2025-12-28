import type { ReactNode } from "react"

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {





    return (
        <div className="h-screen w-full flex items-center justify-center bg-(--secondary-dark-bg)">
                {children}
        </div>
    )


}
export default AuthLayout