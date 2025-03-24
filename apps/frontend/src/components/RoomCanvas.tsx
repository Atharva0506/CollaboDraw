"use client";

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { getSession } from "next-auth/react";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const connectWebSocket = async () => {
            const session = await getSession();
            if (!session || !session.user?.accessToken) {
                console.error("No access token found");
                return;
            }

            const ws = new WebSocket(`http://localhost:8080/?token=${session.user.accessToken}`);

            ws.onopen = () => {
                setSocket(ws);
                const data = JSON.stringify({
                    type: "join_room",
                    roomId
                });
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
            <div className="flex justify-center items-center">
                Connecting to server...
            </div>
        );
    }

    return (
        <div>
            <Canvas  />
        </div>
    );
};
