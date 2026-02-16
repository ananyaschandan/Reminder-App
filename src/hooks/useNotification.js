import { useState, useEffect, useCallback } from 'react';

export const useNotification = () => {
    const [permission, setPermission] = useState(Notification.permission);

    useEffect(() => {
        if (permission === 'default') {
            Notification.requestPermission().then((perm) => {
                setPermission(perm);
            });
        }
    }, [permission]);

    const sendNotification = useCallback((title, options) => {
        if (permission === 'granted') {
            new Notification(title, options);
        }
    }, [permission]);

    return { permission, sendNotification };
};
