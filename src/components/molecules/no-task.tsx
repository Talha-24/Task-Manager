import EmptyTaskManager from "@/public/images/selfie 1.png"

const NoTask = ({ }) => {

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="h-auto w-full">
                <img src={EmptyTaskManager} alt="No Task to be finished" className="h-auto w-full" loading="eager" />
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