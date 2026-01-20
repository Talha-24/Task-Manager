import { useCallback, useEffect, useState } from "react";
import Input from "../atoms/input.tsx";
import useTaskManager from "./hook.ts";
import Button from "../atoms/button.tsx";
import PlusIcon from "../../../public/icons/PlusIcon.tsx"
import PencilIcon from "../../../public/icons/PencilIcon.tsx"
import TrashIcon from "../../../public/icons/TrashIcon.tsx"
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types.ts";
import useToDoHttp from "../../http/api/todo.http.ts";
import NoTask from "../molecules/no-task.tsx";
import Textarea from "../atoms/textarea.tsx";
const TaskManager = () => {


    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [input, setInput] = useState<string>("");
    const [tasks, setAllTasks] = useState<TaskInstance[]>([]);
    const [isTaskUpdating, setIsTaskUpdating] = useState<boolean>(false);
    const [singleTaskId, setSingleTaskId] = useState<string>('');

    const { addTask, getTasks, updateTask, deleteSingleTask, updateWholeTask } = useTaskManager();
    const { loader } = useToDoHttp();



    const fetAllTasks = useCallback(async () => {
        getTasks(setAllTasks);
    }, [])

    const updateSingleTask = async (id: string, category: TASK_CATEGORY) => {
        updateTask(id, category, setAllTasks);
    }

    const deleteTask = async (id: string) => {
        deleteSingleTask(id, setAllTasks);
    }


    useEffect(() => { fetAllTasks() }, [fetAllTasks])

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isTaskUpdating) {
            updateWholeTask(singleTaskId, input, setAllTasks);
            setIsTaskUpdating(false);
            setSingleTaskId("");
        } else {
            addTask(input, setInput, setAllTasks);
        }
    }


    const getTaskCount = (tasks: TaskInstance[], filter: string) => {
        if (filter === "all") {
            return tasks?.length;
        } 
         else if (filter === "active") {
          return  tasks.filter((task) => task.category === "ACTIVE").length;
        } 
         else if (filter === "completed") {
          return  tasks.filter((task) => task.category === "COMPLETED").length;
        }
    }


    return (
        <div className="max-h-screen">
            <div className="text-center mt-10 flex flex-col gap-2 sm:gap-6 sm:w-130 w-full" >
                <div className="flex flex-col gap-10 w-full ">
                    <h1 className="text-3xl font-bold text-center text-(--primary-text) max-sm:text-2xl">My Tasks</h1>

                    <form onSubmit={onSubmit} className="flex flex-col gap-2">
                        <div className="flex items-center justify-start  gap-3 max-[387px]:flex-col max-[387px]:gap-[2px]">
                            <div className="">
                                <Textarea placeholder="Enter your task here..." value={input} onChange={(e) => { setInput(e.target.value) }} className="primary-textarea"  title="* Field is required" required />
                            </div>
                            <div className="w-full">

                                <Button disabled={loader} className="bg-(--primary-btn) text-white max-[350px]:px-2 max-[350px]:py-2.25 px-3 rounded-sm shadow-xs shadow-gray-500 flex items-center justify-center cursor-pointer w-fit py-2.25 max-sm:py-1.25 max-[387px]:w-full" type="submit" >
                                    {isTaskUpdating ?
                                        <span className="flex items-center gap-1" >
                                            <PencilIcon width={18} height={18} className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4 mr-1" />
                                            {window.innerWidth > 350 && " EDIT"}
                                        </span>
                                        :
                                        <span className="flex items-center gap-1" >
                                            <PlusIcon width={18} height={18} className="cursor-pointer max-[440px]:w-5.5 max-[440px]:h-5.5" />
                                            {window.innerWidth > 350 && " Add"}
                                        </span>
                                    }
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={`h-95 sm:w-127.5 w-full flex flex-col gap-2 sm:gap-5 sm:mt-3 py-4 ${isTaskUpdating && ' cursor-not-allowed opacity-35'}`}  >
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
                            <p className="text-(--text-gray)">{getTaskCount(tasks, activeFilter)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5  w-full  h-full max-[440px]:gap-3 overflow-x-auto">

                        {/* Fallback on No Tasks */}
                        {tasks.length == 0 ? <div>
                            <NoTask/>
                        </div> :


                            tasks?.map((elem: TaskInstance, idx: number) => {


                                if (activeFilter == "all") {
                                    return (

                                        <div key={idx + idx} className="bg-(--secondary-dark-bg) rounded-lg py-3  px-6 w-full flex justify-between items-center box-shadow max-[440px]:px-4 max-[440px]:py-2" >
                                            <Input type="checkbox" checked={elem.category == "COMPLETED"} disabled={elem.category === "COMPLETED"} className="placeholder: cursor-pointer mr-2 w-fit" onClick={() => { updateSingleTask(elem?.id, elem.category == "ACTIVE" ? "COMPLETED" : "ACTIVE") }} />
                                            <Input type="text" placeholder={elem.category == "COMPLETED" ? elem.task : ""} value={elem.category == "ACTIVE" ? elem.task : ''} disabled={true} className={`secondary-input ${elem.category === "COMPLETED" && "placeholder:line-through"}`} />
                                            {elem.category !== "COMPLETED" ?
                                                <div className="flex gap-3">
                                                    <Button disabled={loader} className="bg-(--primary-btn) h-7 w-7 flex items-center justify-center rounded-sm" onClick={() => {
                                                        setInput(elem.task),
                                                            setSingleTaskId(elem.id);
                                                        setIsTaskUpdating(true);
                                                    }}>
                                                        <PencilIcon className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4 " color="red" />
                                                    </Button>
                                                    <Button className="bg-(--primary-btn-danger) px-1 rounded-sm" onClick={() => { deleteTask(elem.id) }}>
                                                        <TrashIcon className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4" />
                                                    </Button>
                                                </div>
                                                : <Button disabled className="bg-green-700 text-white px-2 py-px  text-sm cursor-not-allowed">Completed</Button>

                                            }
                                        </div>
                                    )
                                }





                                else if (elem.category.toLowerCase() == activeFilter.toLowerCase()) {
                                    return (

                                        <div key={idx + idx} className="bg-(--secondary-dark-bg) rounded-lg py-3  px-6 w-full flex justify-between items-center box-shadow max-[440px]:px-4 max-[440px]:py-2" >
                                            <Input type="checkbox" checked={elem.category == "COMPLETED"} disabled={elem.category === "COMPLETED"} className="cursor-pointer mr-2" onClick={() => { updateSingleTask(elem?.id, elem.category == "ACTIVE" ? "COMPLETED" : "ACTIVE") }} />
                                            <Input type="text" placeholder={elem.category == "COMPLETED" ? elem.task : ""} value={elem.category == "ACTIVE" ? elem.task : ''} disabled={elem.category == "COMPLETED"} className="placeholder:line-through py-1 w-full px-2 outline-none placeholder:text-(--text-gray) placeholder:font-medium text-(--primary-text)" />

                                            {activeFilter === "completed" ?


                                                <Button disabled className="bg-green-700 text-white px-2 py-px  text-sm cursor-not-allowed">Completed</Button>


                                                :

                                                <div className="flex gap-3">
                                                    <Button disabled={loader} className="bg-(--primary-btn) h-7 w-7 flex items-center justify-center rounded-sm" onClick={() => {
                                                        setInput(elem.task),
                                                            setSingleTaskId(elem.id);
                                                        setIsTaskUpdating(true);
                                                    }}>
                                                        <PencilIcon className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4 " color="red" />
                                                    </Button>
                                                    <Button className="bg-(--primary-btn-danger) px-1 rounded-sm" onClick={() => { deleteTask(elem.id) }}>
                                                        <TrashIcon className="cursor-pointer max-[440px]:w-4 max-[440px]:h-4" />
                                                    </Button>
                                                </div>
                                            }
                                        </div>
                                    )
                                }


                            })

                        }



                    </div>
                </div>
            </div>
        </div>
    )

}

export default TaskManager