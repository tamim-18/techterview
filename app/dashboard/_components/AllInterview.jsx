"use client";

import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React from "react";

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

      setAllInterview(interviewList);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {/* All interview list */}
      Interview
    </div>
  );
};

export default AllInterview;
