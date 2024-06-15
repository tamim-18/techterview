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
import { Ghost, Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAI";
import { json } from "drizzle-orm/mysql-core";
import { set } from "date-fns";

const AddInterview = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(jobTitle, jobDescription, experience);

    const inputPrompt = `
      Suppose you are a job interview taker. I will give you Job Title, job description, and years of experience working in the job. Based on the given information, you will give me 5 interview questions with answers. Your response must be in JSON format. Notice that the question and answer should be in the JSON block. Here is an example for you of my input prompt:
      {
        "job Title": "${jobTitle}",
        "Job Description": "${jobDescription}",
        "Years of experience": "${experience}"
      }
    `;
    // Your logic to handle the prompt goes here
    // This is just for demonstration, replace with your actual logic
    const result = await chatSession.sendMessage(inputPrompt);
    console.log(result.response.text());
    const response = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(response));
    setJobTitle("");
    setJobDescription("");
    setExperience("");
    setIsOpen(false); // Close the dialog
    setLoading(false); // Reset the loading state
  };
  return (
    <div className="">
      <div
        className=" border p-10 rounded-lg  font-bold hover:scale-105 cursor-pointer bg-secondary hover: shadow-md"
        // onclick event to open the dialog
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
              <form
                action=""
                onSubmit={onSubmit}
                // onSubmit event to submit the form.
              >
                <div className=" ">
                  <h2 className="">
                    Tell me about your profile in more details
                  </h2>
                </div>
                <div className=" mt-7 my-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2"
                  >
                    What are you looking for in a new position?
                  </label>
                  <Input
                    placeholder="eg. ML engineers"
                    required
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className=" mt-7 my-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2"
                  >
                    Job Description/Stack (in details)
                  </label>
                  <Textarea
                    placeholder="eg. ML,DL,LLM,NLP etc.."
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className=" mt-7 my-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-2"
                  >
                    Enter Your Experience Year
                  </label>
                  <Input
                    placeholder="eg 4 years "
                    type="number"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
                <div className=" flex justify-end gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2Icon className="animate-spin" size={20} />
                        "Generating..."
                      </>
                    ) : (
                      "Generate Interview Questions"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    variant={Ghost}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddInterview;
