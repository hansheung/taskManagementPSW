import { Button } from "@nextui-org/react";

export const App = () => {
  return (
    <div className="p-10">
      <div className="grid grid-cols-2">
        <div className="text-2xl">Tasks</div>
        <div className="ms-auto">
          <Button>Add task</Button>
        </div>
      </div>
    </div>
  );
};
