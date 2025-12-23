import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import type { TASK_CATEGORY, TaskInstance } from "../../services/interface/common.types";

const supabase = createClient("https://jfvmafmnayscnqzsdpxm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impmdm1hZm1uYXlzY25xenNkcHhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjMwOTU4OCwiZXhwIjoyMDgxODg1NTg4fQ.UqI1zpOIY83LzcG_HIY4h9FggmWJGWsRqOa8Q6lqomQ");





// TO DOS

export async function createToDo(task: string) {

    const { data, error } = await supabase.from("my_tasks")
        .insert([{ task: task, category: "ACTIVE" }]).select().maybeSingle();

    if (!error) {

        toast.success("Task added!", {
            description: "Your task is saved successfully",
        })
        return data;
    } else {
        toast.error("Error", {
            description: "Your tasks is not submitted, due to internal server error"
        });
        return;
    }
}

export async function fetchAllTasks() {
    const { data, error } = await supabase.from("my_tasks").select("*")
    if (data) {
        return { data, success: true, status: 200 }
    } else {
        return { data: null, success: false, status: 500 }
    }
}

export async function updateTaskStatus(id: string, category: TASK_CATEGORY) {
    const { data, error, } = await supabase.from("my_tasks").update([{ category }]).eq("id", id).select().single()
    if (!error) {
        toast.success("Task Updated", {
            description: "Your task status is updated",
        })

        return { data, success: true, status: 200 };
    } else {
        toast.error(error.name, {
            description: error.message
        })

        return { data: null, success: false, status: 500 };
    }
}

export async function deleteTask(id: string) {
    const { data, error } = await supabase.from("my_tasks").delete().eq("id", id).select().maybeSingle();

    if (data) {
        toast.success("Task Deleted", {
            description: "Tasks is delete successfully",
        })
        return data;
    } else {

        toast.error(error?.name, {
            description: error?.message,
        })
        return;
    }
}


export async function updateMyTask(id: string, body: TaskInstance) {
    const { data, error } = await supabase.from("my_tasks").update([body]).eq("id", id).select().maybeSingle();

    if (data) {
        toast.success("Task updated", {
            description: "Your task is updated successfully",
        })
        return data;
    } else {
        toast.error(error?.name, {
            description: error?.message
        })
        return error;
    }

}