export interface TaskInstance{
    task:string;
    id:string;
    category:string;
}
export type TASK_CATEGORY= "COMPLETED" | "ACTIVE";