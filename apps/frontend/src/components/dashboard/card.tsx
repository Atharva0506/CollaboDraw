"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Dialog, DialogTrigger, DialogContent } from "@repo/ui";
import { Plus } from "lucide-react";
import CreateRoom from "../create-room";

interface Room {
  id: number;
  slug: string;
}

export default function DrawCards() {
  const { data: session } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!session || !session.user?.accessToken) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3001/room/user-rooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }

        const data: Room[] = await response.json();
        setRooms(data);
      } catch (err) {
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [session]);

  const handleRoomClick = (roomId: number) => {
    router.push(`/canvas/${roomId}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Create Draw Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="flex items-center justify-center h-30 cursor-pointer hover:shadow-lg transition">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <Plus className="w-8 h-8 text-gray-600" />
              <p className="text-sm text-gray-600 mt-2">Create Draw</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <CreateRoom />
        </DialogContent>
      </Dialog>

      {/* Loading & Error Messages */}
      {loading && <p className="col-span-full text-center">Loading...</p>}
      {error && <p className="col-span-full text-center text-red-500">{error}</p>}

      {/* Existing Draw Rooms */}
      {rooms.map((room) => (
        <Card
          key={room.id}
          className="h-30 flex items-center justify-center cursor-pointer hover:shadow-lg transition"
          onClick={() => handleRoomClick(room.id)}
        >
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-sm font-medium">{room.slug}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
