"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Input, Label } from "@repo/ui";

const JoinRoomForm = () => {
  const router = useRouter();
  const { data: session } = useSession(); 
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");

  const handleJoinRoom = async (identifier: string) => {
    if (!session?.user) {
      setError("You must be logged in to join a room.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/room/get-slug/${identifier}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`, 
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join room");
      }

      const data = await response.json();
      if (data.roomId) {
        router.push(`/canvas/${data.roomId}`);
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error joining room:", err.message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleJoinRoom(identifier);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-semibold text-center  mb-4 ">
        Join a Room
      </h2>
      <div className="mb-4 ">
        <Label htmlFor="roomId" className="block">
          Room Name
        </Label>
        <Input
          type="text"
          id="roomId"
          name="roomId"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      {error && <div className="text-red-500 text-base mb-2 ">{error}</div>}
      <Button type="submit">Join Room</Button>
    </form>
  );
};

export default JoinRoomForm;
