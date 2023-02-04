import { NotificationsContext } from "@/context/NotificationsContext";
import { useState } from "react";
import NotificationElement from "./NotificationElement";

function NotificationsWrapper({ children }: { children: JSX.Element }) {
    const [notifications, setNotifications] = useState(Array<INotification>());

    const addNotification = (notification: INotification) => {
        setNotifications([...notifications, notification]);
    }

    const removeNotification = (id: string) => {
        setNotifications([...notifications.filter((item) => item.id !== id)]);
    }

    return (
        <>
        <NotificationsContext.Provider value={{addNotification: addNotification}}>
            <>
            {children}
            <div className="fixed bottom-0 right-0 flex flex-col p-2 gap-2">
                {notifications.map((item) => <NotificationElement key={item.id} notification={item} removeNotification={removeNotification}></NotificationElement>)}
            </div>
            </>
        </NotificationsContext.Provider></>
    )
}

export default NotificationsWrapper;