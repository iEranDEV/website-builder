import { useEffect } from "react";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";

function NotificationElement({ notification, removeNotification }: { notification: INotification, removeNotification: Function }) {

    useEffect(() => {
        setTimeout(() => {
            removeNotification(notification.id);
        }, 3000);
    }, [])

    return (
        <div className={`animate-slide w-80 text-sm shadow-xl rounded-xl p-2 flex gap-4 items-center border-2 break-all ${notification.type === 'SUCCESS' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
            {notification.type === 'SUCCESS' ?
                <BiCheckCircle className="h-6 w-6"></BiCheckCircle>
            :
                <BiErrorCircle className="h-6 w-6"></BiErrorCircle>
            }
            <p className="break-all w-full">{notification.message}</p>
        </div>
    )
}

export default NotificationElement;