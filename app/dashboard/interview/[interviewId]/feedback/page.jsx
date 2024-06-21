"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React from "react";

const Feedback = ({ params }) => {
  const getFeedback = async () => {
    // fetch the interview data
    const interviewId = params.interviewId;
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId));
      console.log("result: ", result);
    } catch (error) {
      console.log("Error in fetching from databases");
    }
  };

  React.useEffect(() => {
    getFeedback();
  }, []);
  return (
    <div className=" p-10 mt-4">
      <h2
        className=" text-3xl font-extrabold 
    text-green-600 font-serif "
      >
        {" "}
        Congratulations
      </h2>
      <h2 className=" text-xl font-semibold"> Here is your feedback: </h2>
      <h2 className=" text-md font-serif text-purple-500">
        {" "}
        Your overall interview rating is:{" "}
        <strong className=" font-extrabold text-3xl"> 7/10</strong>
      </h2>
      <h2 className=" text-muted-foreground text-sm">
        {" "}
        Find bellow interview question and answer.
      </h2>
    </div>
  );
};

export default Feedback;
