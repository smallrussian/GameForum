import { useEffect, useState } from "react";
import {useStore} from "./store";

export const useClientStore = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const store = useStore();

   return isMounted ? store : null;
};