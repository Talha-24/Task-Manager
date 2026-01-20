import EmptyTaskManager from "../../../public/images/selfie 1.png"

const NoTask = ({ }) => {

    return (
        <div className="flex items-center justify-center h-full w-full max-[500px]:flex-col">
            <div className="h-auto w-full">
                <img src={EmptyTaskManager} alt="No Task to be finished" className="h-auto w-full max-[500px]:w-1/2 max-[500px]:h-auto" loading="eager" />
            </div>
            <div className="text-sm h-full flex items-center text-(--primary-text)">
                <div>
                    <p className="whitespace-nowrap">Empty as my motivation on Monday 😅</p>
                    <p className="text-left">Let's start adding stuff!</p>
                </div>
            </div>
        </div>
    )
}
export default NoTask