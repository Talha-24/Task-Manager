import { createContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "../../database/supabase/supabaseClient";
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types";
import { useAuthentication } from "../../hooks/useAuthentication";
import useLocalStorage from "../../hooks/useLocalStorage";


type GET = () => Promise<{ data: TaskInstance[], success: boolean, status: number, message: string }>;

type POST = (task: string,) => void;
type DELETE = (id: string) => Promise<TaskInstance>;
type PATCH = (id: string, category: TASK_CATEGORY) => Promise<{ data: TaskInstance, success: boolean; status: number }>;
type PUT = (id: string, task: string) => Promise<TaskInstance>
interface HTTP_CONTEXT_INSTANCE {
    createToDo: POST;
    fetchAllTasks: GET;
    updateTaskStatus: PATCH;
    deleteTask: DELETE;
    updateMyTask: PUT;
    loader:boolean;
}


const defaultValues: HTTP_CONTEXT_INSTANCE = {
    createToDo: async (task: string,) => { },
    fetchAllTasks: async () => ({ data: [], success: false, status: 500, message: "" }),
    updateTaskStatus: async () => ({ data: null as any, success: false, status: 500 }),
    deleteTask: async () => ({} as TaskInstance),
    updateMyTask: async () => ({} as TaskInstance),
    loader:false,
}

export const HTTP_METHODS = createContext<HTTP_CONTEXT_INSTANCE>(defaultValues);


const HTTP_CONTEXT: React.FC<{ children: ReactNode }> = ({ children }) => {


    const [loader, setLoader] = useState<boolean>(false);
    const { getValue } = useLocalStorage();
    const userId = getValue("userId");






    async function createToDo(task: string) {
        setLoader(true);
        const { data, error } = await supabase.from("my_tasks")
            .insert([{ user_id: userId, task: task, category: "ACTIVE" }]).select().maybeSingle();

        if (!error) {
            toast.success("Task added!", {
                description: "Your task is saved successfully",
            })
            setLoader(false);
            return data;
        } else {
            toast.error("Error", {
                description: "Your tasks is not submitted, due to internal server error"
            });
            setLoader(false);
            return;
        }
    }

    async function fetchAllTasks() {
        setLoader(true);
        const { data, error } = await supabase.from("my_tasks").select("*").eq("user_id", userId);
        if (!error && data) {
            setLoader(false);
            return { data: data as TaskInstance[], success: true, status: 200, message: "Data is successfully retrieved" }
        } else {
            setLoader(false);
            return { data: [] as TaskInstance[], success: false, status: 500, message: error?.message || "Error retrieving tasks" }
        }
    }

    async function updateTaskStatus(id: string, category: TASK_CATEGORY) {
        setLoader(true);
        const { data, error, } = await supabase.from("my_tasks").update([{ category }]).eq("id", id).select().single()
        if (!error) {
            toast.success("Task Updated", {
                description: "Your task status is updated",
            })
            setLoader(false);
            return { data, success: true, status: 200 };
        } else {

            toast.error(error.name, {
                description: error.message
            })
            setLoader(false);
            return { data: null, success: false, status: 500 };
        }
    }

    async function deleteTask(id: string) {
        setLoader(true);
        const { data, error } = await supabase.from("my_tasks").delete().eq("id", id).select().maybeSingle();

        if (data) {
            toast.success("Task Deleted", {
                description: "Tasks is delete successfully",
            })
            setLoader(false);
            return data;
        } else {

            toast.error(error?.name, {
                description: error?.message,
            })
            setLoader(false);
            return;
        }
    }


    async function updateMyTask(id: string, task: string) {
        setLoader(true);
        const { data, error } = await supabase.from("my_tasks").update([{ task }]).eq("id", id).select().maybeSingle();

        if (data) {
            toast.success("Task updated", {
                description: "Your task is updated successfully",
            })
            setLoader(false);
            return data;
        } else {
            toast.error(error?.name, {
                description: error?.message
            })
            setLoader(false);
            return error;
        }

    }



    return (
        <HTTP_METHODS.Provider value={{ createToDo, updateTaskStatus, fetchAllTasks, deleteTask, updateMyTask,loader,}}>{children}</HTTP_METHODS.Provider>
    )
}

export default HTTP_CONTEXT;