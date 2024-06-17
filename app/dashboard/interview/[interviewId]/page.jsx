"use client";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

const InterViewPage = ({ params }) => {
  const [interview, setInterview] = React.useState(null);
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  React.useEffect(() => {
    console.log("Params: ", params);
    getInterview();
  }, []);
  // this function will get the interview from the database.
  const getInterview = async () => {
    const interviewId = params.interviewId;
    // console.log(params.interviewId === Interview.mockInterviewId);
    // console.log("InterviewId: ", interviewId);

    // Fetch the interview from the database
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.mockInterviewId, params.interviewId));

      setInterview(result[0]);
      console.log("data fetched: ", result[0]);
    } catch (error) {
      console.error("Error fetching interview data: ", error);
    }
  };
  return (
    <div className="my-10 flex flex-col items-center">
      <h2 className="font-bold text-3xl mb-6 text-center">Let's Get Started</h2>
      <div className="w-full max-w-lg">
        {webcamEnabled ? (
          <Webcam
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            mirrored={true}
            style={{
              height: 300,
              width: "100%",
              borderRadius: "0.5rem",
              objectFit: "cover",
            }}
            className="shadow-lg"
          />
        ) : (
          <div className="flex flex-col items-center">
            <WebcamIcon className="w-full h-72 bg-secondary my-7 border-lg p-20" />
            <Button
              onClick={() => setWebcamEnabled(true)}
              className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Enable webcam and microphone
            </Button>
          </div>
        )}
      </div>
      <div className=" flex flex-col my-6 gap-5">
        <h2 className=" text-lg ">
          <strong>Job Role/Job Position:</strong>
          {interview?.jobPosition}
        </h2>
        <h2 className=" text-lg ">
          <strong>Tech Stack/Job Description:</strong>
          {interview?.jobDesc}
        </h2>
        <h2 className=" text-lg ">
          <strong>Years of Experience:</strong>
          {interview?.jobExperience}
        </h2>
      </div>
    </div>
  );
};

export default InterViewPage;
