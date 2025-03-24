"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CreateRoomSchema } from "@repo/common/types";
import { Button, DialogTitle, Input, Label } from "@repo/ui";


const CreateRoomForm = () => {
  const router = useRouter();
  const { data: session } = useSession(); 
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = CreateRoomSchema.safeParse({ name });

    if (!parsed.success) {
      setError("Invalid room name");
      return;
    }

    if (!session?.user) {
      setError("Unauthorized: Please log in.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/room/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`, 
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Error creating room");
      }

      const data = await response.json();
      router.push(`/canvas/${data.roomId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreateRoom}
      className="w-full max-w-sm  p-6 rounded-lg shadow-lg"
    >
      <DialogTitle className="text-xl font-semibold text-center  mb-4 ">
        Create a Room
      </DialogTitle>
      {error && <div className="text-red-500 text-sm mb-2 ">{error}</div>}
      <div className="mb-4 ">
        <Label htmlFor="name" className="block ">
          Room Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border  border-gray-300 rounded mt-2"
          required
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Room"}
      </Button>
    </form>
  );
};

export default CreateRoomForm;
