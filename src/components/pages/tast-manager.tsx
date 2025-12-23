import { act, useCallback, useEffect, useState } from "react";
import Input from "../atoms/input";
import useTaskManager from "./hook";
import Button from "../atoms/button";
import PlusIcon from "../../../public/icons/PlusIcon.tsx"
import PencilIcon from "../../../public/icons/PencilIcon.tsx"
import TrashIcon from "../../../public/icons/TrashIcon.tsx"
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types.ts";
const TaskManager = () => {


    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [input, setInput] = useState<string>("");
    const [tasks, setAllTasks] = useState<TaskInstance[]>([]);

    const { addTask, getTasks, updateTask } = useTaskManager();

    const createTask = () => {
        addTask(input, setInput);
    }


    const fetAllTasks = useCallback(async () => {
        getTasks(setAllTasks);
    }, [])

    const updateSingleTask = async (id: string, category: TASK_CATEGORY) => {
        updateTask(id, category, setAllTasks);
    }

    useEffect(() => { fetAllTasks() }, [fetAllTasks])


    return (
        <div className="max-h-screen">
            <div className="text-center mt-10 flex flex-col gap-2 sm:gap-6 sm:w-130 w-full">
                <div className="flex flex-col gap-10 w-full">
                    <h1 className="text-3xl font-bold text-center text-(--primary-text) max-sm:text-2xl">My Tasks</h1>
                    <div className="flex items-center justify-start  gap-3">
                        <div>
                            <Input type="text" placeholder="Enter your task here..." value={input} onChange={(e) => { setInput(e.target.value) }} className="bg-(--secondary-light-bg) text-(--primary-text) rounded-lg  py-2.5 px-6 w-100  max-sm:w-full placeholder:text-(--text-light-gray) box-shadow" />
                        </div>
                        <div>
                            <Button onClick={() => { createTask() }} className="bg-(--primary-btn) text-white max-[350px]:px-2 max-[350px]:py-2 px-6 py-2.5 rounded-lg shadow-xs shadow-gray-500 flex items-center justify-center cursor-pointer" >
                                <PlusIcon className="mr-1" />
                                {window.innerWidth > 350 && " Add"}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="h-95 sm:w-127.5 w-full flex flex-col gap-2 sm:gap-5 sm:mt-3 py-4">
                    <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1 text-(--text-gray) px-1">
                            {["All", "Active", "Completed"].map((filter, idx, allFilters) => {
                                return (
                                    <>
                                        <p key={filter} onClick={() => { setActiveFilter(filter.toLowerCase()) }} className={`cursor-pointer ${activeFilter.toLowerCase() == filter.toLowerCase() ? 'text-(--active-filter) ' : ' text-(--text-gray)'} `}>{filter} </p>
                                        <span>{idx < allFilters.length - 1 && " " + " | " + " "} </span>
                                    </>
                                )
                            })}
                        </div>
                        <div>
                            <p className="text-(--text-gray)">2 tasks left</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5  w-full  h-full max-[440px]:gap-3">


                        {tasks?.map((elem: TaskInstance, idx: number) => {


                            if (activeFilter == "all") {
                                return (

                                    <div key={idx + idx} className="bg-(--secondary-dark-bg) rounded-lg py-3  px-6 w-full flex justify-between items-center box-shadow max-[440px]:px-4 max-[440px]:py-2" >
                                        <Input type="checkbox" checked={elem.category == "COMPLETED"} className="cursor-pointer mr-2" onClick={() => { updateSingleTask(elem?.id, elem.category == "ACTIVE" ? "COMPLETED" : "ACTIVE") }} />
                                        <Input type="text" placeholder={elem.category == "COMPLETED" ? elem.task : ""} value={elem.category == "ACTIVE"? elem.task : ''} disabled={elem.category == "COMPLETED"} className="placeholder:line-through py-1 w-full px-2 outline-none placeholder:text-(--text-gray) placeholder:font-medium text-(--primary-text)" />
                                        <div className="flex gap-3">
                                            <Button className="bg-(--primary-btn) h-7 w-7 flex items-center justify-center rounded-sm">
                                                <PencilIcon width={18} height={18} className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4" />
                                            </Button>
                                            <Button className="bg-(--primary-btn-danger) h-7 w-7 flex items-center justify-center rounded-sm">
                                                <TrashIcon width={18} height={18} className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }





                            else if (elem.category.toLowerCase() == activeFilter.toLowerCase()) {
                                return (

                                    <div key={idx + idx} className="bg-(--secondary-dark-bg) rounded-lg py-3  px-6 w-full flex justify-between items-center box-shadow max-[440px]:px-4 max-[440px]:py-2" >
                                        <Input type="checkbox" checked={elem.category == "COMPLETED"} className="cursor-pointer mr-2" onClick={() => { updateSingleTask(elem?.id, elem.category == "ACTIVE" ? "COMPLETED" : "ACTIVE") }} />
                                        <Input type="text" placeholder={elem.category == "COMPLETED" ? elem.task : ""} value={elem.category == "ACTIVE"? elem.task : ''} disabled={elem.category == "COMPLETED"} className="placeholder:line-through py-1 w-full px-2 outline-none placeholder:text-(--text-gray) placeholder:font-medium text-(--primary-text)" />
                                        <div className="flex gap-3">
                                            <Button className="bg-(--primary-btn) h-7 w-7 flex items-center justify-center rounded-sm">
                                                <PencilIcon width={18} height={18} className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4" />
                                            </Button>
                                            <Button className="bg-(--primary-btn-danger) h-7 w-7 flex items-center justify-center rounded-sm">
                                                <TrashIcon width={18} height={18} className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }


                        })}


                    </div>
                </div>
            </div>
        </div>
    )

}

export default TaskManager