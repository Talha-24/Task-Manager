import { createToDo, fetchAllTasks, updateTaskStatus } from "../../database/supabase/supabaseClient"
import type { Dispatch, SetStateAction } from "react";
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types";


const useTaskManager = () => {


    const addTask = async (task: string,setTask:Dispatch<SetStateAction<string>>) => {
        try {
            console.log("TASK",task);
            await createToDo(task);
            setTask('');
        } catch (error) {


        }

    }

    const getTasks = async (setAllTasks:Dispatch<SetStateAction<any[]>>) => {
        try {
            const response:any=await fetchAllTasks();
            setAllTasks(response?.data);
        } catch (error) {

        }
    }

    const updateTask=async(id:string,CATEGORY:TASK_CATEGORY,setTasks:Dispatch<SetStateAction<TaskInstance[]>>)=>{
        try {
            const response=await updateTaskStatus(id,CATEGORY);
            setTasks((prev)=> prev.map((task)=> task.id == response.data.id ? response.data: task ))            
        } catch (error) {
            
        }
    }




    return {
        addTask,
        getTasks,
        updateTask,

    }
}
export default useTaskManager