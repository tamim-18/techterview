"use client";

import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React from "react";
import InterviewCard from "./InterviewCard";

const AllInterview = () => {
  const { user } = useUser();
  const [allInterview, setAllInterview] = React.useState([]); // State to store all the interview created by the user

  // get all the interview created by the user
  React.useEffect(() => {
    // if user exist then get the interview list
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    // getting all the interview created by the user
    try {
      const interviewList = await db
        .select()
        .from(Interview) // Select from the Interview table
        .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress)) // Filter by the current user
        .orderBy(desc(Interview.id)); // Order by the ID in descending order
      console.log(interviewList);
      setAllInterview(interviewList);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {/* All interview list */}
      <p className="">
        The list of all the interview created by the user will be shown here
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {allInterview?.length > 0
          ? allInterview.map((interview, idx) => (
              <InterviewCard key={idx} interview={interview} />
            ))
          : // skeleton
            [1, 2, 3, 4].map((item, index) => (
              <div className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg "></div>
            ))}
      </div>
    </div>
  );
};

export default AllInterview;
