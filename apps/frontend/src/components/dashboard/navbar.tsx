"use client";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@repo/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@repo/ui";
import { ModeToggle } from "../mode-togle";
import { signOut } from "next-auth/react";
import Link from "next/link";
import JoinRoom from "../join-room";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-3 border-b bg-background px-4">
      {/* Left Side: Logo and Name */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">CollaboDraw</span>
      </div>

      {/* Right Side: Controls */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        {/* Join Room Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Join Room</Button>
          </DialogTrigger>
          <DialogContent>
            <JoinRoom />
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none">
            <Avatar>
              <AvatarImage src="/user-avatar.png" alt="User Avatar" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-medium">Atharva Naik</span>
              <span className="text-xs text-muted-foreground">
                atharvan.coder@gmail.com
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link href={"/admin/settings"}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
