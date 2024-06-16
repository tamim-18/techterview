"use client";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import React from "react";
import { eq } from "drizzle-orm";

const InterViewPage = ({ params }) => {
  const [interview, setInterview] = React.useState();
  React.useEffect(() => {
    console.log("Params: ", params);
    getInterview();
  }, []);
  // this function will get the interview from the database.
  const getInterview = async () => {
    const interviewId = params.interviewId;
    // console.log(params.interviewId === Interview.mockInterviewId);
    // console.log("InterviewId: ", interviewId);
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockInterviewId, params.interviewId));
      console.log(result);
      setInterview(result[0]);
    } catch (error) {
      console.error("Error fetching interview data: ", error);
    }
  };
  return <div>InterViewPage</div>;
};

export default InterViewPage;
