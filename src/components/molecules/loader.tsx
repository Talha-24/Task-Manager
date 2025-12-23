import innerLoader from "../../../public/images/loader-inner.png"
import outerLoader from "../../../public/images/loader-outer.png"

const RoundLoader = () => {

    
    return (
        <div className="loader-parent">
            <div className="loader-container">
                <div className="inner">
                    <img src={innerLoader} alt="" />
                </div>
                <div className="outer">
                    <img src={outerLoader} alt="" />
                </div>
            </div>
        </div>
    )

}
export default RoundLoader