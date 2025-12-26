import { useContext } from "react";
import { Authentication } from "../state-management/context-api/authentication-context";
export const useAuthentication=()=> useContext(Authentication);