"use client";
import React from "react";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import InterviewSection from "./_components/InterviewSection";

const StartInterView = ({ params }) => {
  const [interViewData, setInterViewData] = React.useState(null);
  const [interViewQuestions, setInterViewQuestions] = React.useState([]);

  React.useEffect(() => {
    getInterview();
  }, [params.interviewId]);

  const getInterview = async () => {
    const interviewId = params.interviewId;

    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockInterviewId, interviewId));

      setInterViewData(result[0]);

      const jsonResp = JSON.parse(result[0].jsonMockResp);
      console.log("jsonResp: ", jsonResp);

      // Ensure jsonResp.interview_questions is an array
      if (Array.isArray(jsonResp.interview_questions)) {
        setInterViewQuestions(jsonResp.interview_questions);
      } else {
        console.error(
          "interview_questions is not an array",
          jsonResp.interview_questions
        );
      }
    } catch (error) {
      console.error("Error fetching interview data: ", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <InterviewSection interViewQuestions={interViewQuestions} />
        {/* recording video/audio */}
      </div>
    </div>
  );
};

export default StartInterView;
