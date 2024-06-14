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
import { Input } from "@/components/ui/input";

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
        <DialogContent className=" max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <div className=" ">
                <h2 className="">Tell me about your profile in more details</h2>
              </div>
              <div className=" mt-7 my-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  What are you looking for in a new position?
                </label>
                <Input placeholder="eg. ML engineers" />
              </div>
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
