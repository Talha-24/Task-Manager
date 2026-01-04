import type React from "react"

const Dialog: React.FC<{ title: string, description: string, footer?: string | React.ReactNode }> = ({ title, description, footer }) => {

    return (
        <div className="modal-container ">
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-heading"><strong className="strong">
                        {title}
                    </strong></div>
                </div>
                <div className="modal-body">
                    {description}
                </div>
                <div className="footer">
                    {footer}
                </div>
            </div>
        </div>
    )
}

export default Dialog