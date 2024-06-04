import { useEffect, useState } from "react"

export const useSocket = () => {
    const WS_URL = "http://localhost:8080";
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(()=>{
        const ws = new WebSocket(WS_URL)

        ws.onopen = () => {
            console.log("Connected");
            setSocket(ws)
        }
        ws.onerror = () => {
            console.error("Error");
            
        }

        ws.onclose = () => {
            console.log(
                "Disconnected"
            );
            
        }

        return  () => {
            ws.close();
        }
    }, [])


    return socket
}