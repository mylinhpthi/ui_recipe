import { createContext } from "react";

export const AppContext = createContext({
    isLoading:false,
    isAuth: false,
    currentUser: {
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
        accessToken: "",
        uid: ""
    },
    setIsLoading: () => { },
    setIsAuth: () => { },
    setCurrentUser: () => { }, 
})