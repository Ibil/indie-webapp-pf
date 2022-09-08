import { AuthContext } from "@app/components/common/AuthProvider";
import { useContext } from "react";


export const useAuth = () => {
    return useContext(AuthContext);
}