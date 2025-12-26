import { useContext } from "react";
import { HTTP_METHODS } from "../state-management/context-api/http-context";


export const useHttp = () => useContext(HTTP_METHODS);