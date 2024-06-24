"use client";

import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React from "react";
import InterviewCard from "./InterviewCard";
import { motion } from "framer-motion";

const AllInterview = () => {
  const { user } = useUser();
  const [allInterview, setAllInterview] = React.useState([]);

  React.useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    try {
      const interviewList = await db
        .select()
        .from(Interview)
        .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Interview.id));
      setAllInterview(interviewList);
    } catch (e) {
      console.log(e);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-indigo-700 mb-6"
      >
        Your Interviews
      </motion.h1>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {allInterview?.length > 0
          ? allInterview.map((interview, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <InterviewCard interview={interview} />
              </motion.div>
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-[150px] w-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-lg"
              />
            ))}
      </motion.div>
    </motion.div>
  );
};

export default AllInterview;
