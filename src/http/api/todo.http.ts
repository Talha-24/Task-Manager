import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { supabase } from "../../database/supabase/supabaseClient";
import { toast } from "sonner";
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types";

const useToDoHttp = () => {



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
        const { data, error } = await supabase.from("my_tasks").select("*").eq("user_id", userId).eq("is_deleted", false);
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
        const { data, error } = await (await supabase.from("my_tasks")).update([{ is_deleted: true }]).eq("id", id).select("*").maybeSingle();

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



    return {
        createToDo,
        fetchAllTasks,
        updateTaskStatus,
        deleteTask,
        updateMyTask,
        loader,
    }



}

export default useToDoHttp