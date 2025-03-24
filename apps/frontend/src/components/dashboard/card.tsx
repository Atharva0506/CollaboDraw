import { Card, CardContent, Dialog, DialogTrigger, DialogContent } from "@repo/ui";
import { Plus } from "lucide-react";
import CreateRoom from "../create-room";

const draws = [
  {
    id: 1,
    title: "My First Draw",
  },
  {
    id: 2,
    title: "My Second Draw",
  },
  {
    id: 3,
    title: "My Third Draw",
  },
];

export default function DrawCards() {
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

      {/* Existing Draws */}
      {draws.map((draw) => (
        <Card key={draw.id} className="h-40 flex items-center justify-center">
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-sm font-medium">{draw.title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
