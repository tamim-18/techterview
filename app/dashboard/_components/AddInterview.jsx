"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

const AddInterview = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="">
      <div
        className=" border p-10 rounded-lg  font-bold hover:scale-105 cursor-pointer bg-secondary hover: shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <h2 className=" text-center text-lg transition-all">
          + Add New Interview
        </h2>
      </div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
              <div className=" flex justify-end gap-2">
                <Button>Start InterView</Button>
                <Button onClick={() => setIsOpen(false)} variant={Ghost}>
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddInterview;
