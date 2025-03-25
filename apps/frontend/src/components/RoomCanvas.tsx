"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Canvas } from "./Canvas";
import { WS_URL } from "../config";

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const connectWebSocket = async () => {
            const session = await getSession();
            const token = session?.user?.accessToken;

            if (!token) {
                console.error("No access token found");
                return;
            }

            const ws = new WebSocket(`${WS_URL}?token=${token}`);

            ws.onopen = () => {
                setSocket(ws);
                const data = JSON.stringify({ type: "join_room", roomId });
                console.log("WebSocket Open:", data);
                ws.send(data);
            };

            ws.onclose = () => {
                console.log("WebSocket closed");
                setSocket(null);
            };

            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
            };

            return () => {
                ws.close();
            };
        };

        connectWebSocket();
    }, [roomId]);

    if (!socket) {
        return (
            <div className="flex justify-center items-center h-full">
                Connecting to server...
            </div>
        );
    }

    return <Canvas roomId={roomId} socket={socket} />;
}
