import { useEffect, useState } from "react";

const useOnline = () => {
    const [isonline, setisonline] = useState(true)
    useEffect(() => {
        function handleOnline() {
            setisonline(true)
        }
        function handleOffline() {
            setisonline(false)
        }
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }

    }, [])
    return isonline
}
export default useOnline;