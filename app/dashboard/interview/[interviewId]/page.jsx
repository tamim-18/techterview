"use client";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import React from "react";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { IoIosInformationCircle } from "react-icons/io";

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
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <WebcamIcon className="w-full h-72 bg-secondary my-6 border-lg p-20" />
              <Button
                onClick={() => setWebcamEnabled(true)}
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              >
                Enable webcam and microphone
              </Button>
            </div>
          )}
        </div>
        {/* Interview Details */}
        <div className=" flex flex-col my-6 gap-5">
          <div className=" flex flex-col border p-5 bg-secondary hover:shadow-md transition-all cursor-pointer">
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
          <div className=" my-3 border rounded-lg p-3 border-yellow-300 bg-yellow-100">
            <div className=" flex gap-2">
              <IoIosInformationCircle className="text-red-500 h-7 w-5" />{" "}
              <span className=" font-bold text-lg tracking-tighter">
                Read the instructions carefully
              </span>
            </div>
            <p className=" tracking-tighter font-mono text-emerald-700 mt-5">
              Enable your webcam and microphone to start the interview. Make
              sure you are in a quiet place and have a good internet connection.
              Good luck!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterViewPage;
