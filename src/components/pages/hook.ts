import type { Dispatch, SetStateAction } from "react";
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types";
import useToDoHttp from "../../http/api/todo.http";


const useTaskManager = () => {

    const {createToDo,fetchAllTasks,updateTaskStatus,updateMyTask,deleteTask}=useToDoHttp();


    const addTask = async (task: string, setTask: Dispatch<SetStateAction<string>>, setAllTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        const data:any = await createToDo(task);
        console.log("DATA ",data);
        setTask("");
        setAllTasks((prev) => [...prev, data])

    }

    const getTasks = async (setAllTasks: Dispatch<SetStateAction<any[]>>) => {
        try {
            const response: any = await fetchAllTasks();
            setAllTasks(response?.data);
        } catch (error) {

        }
    }

    const updateTask = async (id: string, CATEGORY: TASK_CATEGORY, setTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        try {
            const response = await updateTaskStatus(id, CATEGORY);
            setTasks((prev) => prev.map((task) => task.id == response.data.id ? response.data : task))
        } catch (error) {

        }
    }

    const updateWholeTask = async (id: string, task:string, setTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        try {
            const data:any =  updateMyTask(id, task);
            setTasks((prev) => prev.map((pre) => pre.id == data.id ? data : prev))
        } catch (error) {

        }
    }




    const deleteSingleTask = async (id: string, setTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        try {
            const deletedTask: TaskInstance = await deleteTask(id);

            setTasks((prev) =>
                prev.filter((pre) => pre.id !== deletedTask?.id))

        } catch (error) {

        }
    }
    return {
        addTask,
        getTasks,
        updateTask,
        updateWholeTask,
        deleteSingleTask,
    }
}
export default useTaskManager