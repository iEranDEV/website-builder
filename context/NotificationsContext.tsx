import { createContext } from "react";

export const NotificationsContext = createContext({
    addNotification: (notification: INotification) => {}
})