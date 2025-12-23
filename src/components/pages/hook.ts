import { createToDo, deleteTask, fetchAllTasks, updateMyTask, updateTaskStatus } from "../../database/supabase/supabaseClient"
import type { Dispatch, SetStateAction } from "react";
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types";


const useTaskManager = () => {


    const addTask = async (task: string, setTask: Dispatch<SetStateAction<string>>, setAllTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        const data = await createToDo(task);
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

    const updateWholeTask = async (id: string, body: TaskInstance, setTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        try {
            const data = await updateMyTask(id, body);
            setTasks((prev) => prev.map((pre) => pre.id == data.id ? data : prev))
        } catch (error) {

        }
    }




    const deleteSingleTask = async (id: string, setTasks: Dispatch<SetStateAction<TaskInstance[]>>) => {
        try {
            const deletedTask: TaskInstance = await deleteTask(id);

            setTasks((prev) =>
                prev.filter((pre) => pre.id !== deletedTask.id))

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