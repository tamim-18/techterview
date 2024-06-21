"use client";
import React from "react";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import InterviewSection from "./_components/InterviewSection";
import Record from "./_components/Record";
import { Button } from "@/components/ui/button";

// Function to normalize the data
const normalizeData = (data) => {
  if (Array.isArray(data.questions)) {
    return data.questions;
  } else if (Array.isArray(data.interview_questions)) {
    return data.interview_questions;
  }
  return [];
};

const StartInterView = ({ params }) => {
  const [interViewData, setInterViewData] = React.useState(null);
  const [interViewQuestions, setInterViewQuestions] = React.useState([]);
  const [activeQuestion, setActiveQuestion] = React.useState(0);

  React.useEffect(() => {
    getInterview();
  }, [params.interviewId]);

  const getInterview = async () => {
    const interviewId = params.interviewId;

    try {
      // Fetch the interview from the database
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockInterviewId, interviewId));

      setInterViewData(result[0]);

      const jsonResp = JSON.parse(result[0].jsonMockResp);
      console.log("jsonResp: ", jsonResp);

      // Normalize the questions data
      const normalizedQuestions = normalizeData(jsonResp);
      setInterViewQuestions(normalizedQuestions);
    } catch (error) {
      console.error("Error fetching interview data: ", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <InterviewSection
          interViewQuestions={interViewQuestions}
          activeQuestion={activeQuestion}
        />
        {/* recording video/audio */}
        <Record
          interViewQuestions={interViewQuestions}
          activeQuestion={activeQuestion}
          interViewData={interViewData}
        />
      </div>
      <div className="flex justify-end gap-6 mb-2">
        {activeQuestion > 0 && (
          <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestion != interViewQuestions?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestion == interViewQuestions?.length - 1 && (
          <Button>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default StartInterView;
