"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React from "react";
import { motion } from "framer-motion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = React.useState([]);
  // New state to store the calculated average rating
  const [averageRating, setAverageRating] = React.useState(0);

  const getFeedback = async () => {
    const interviewId = params.interviewId;
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId));
      setFeedbackList(result);

      // Calculate the average rating
      if (result.length > 0) {
        const totalRating = result.reduce(
          (sum, item) => sum + parseFloat(item.rating),
          0
        );
        const avgRating = totalRating / result.length;
        // Round to 1 decimal place
        setAverageRating(Math.round(avgRating * 10) / 10);
      }
    } catch (error) {
      console.error("Error in fetching from databases:", error);
    }
  };

  React.useEffect(() => {
    getFeedback();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-purple-50 p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-4xl font-extrabold text-green-600 font-serif mb-6"
        >
          Congratulations!
        </motion.h1>
        <h2 className="text-2xl font-semibold mb-4">Here is your feedback:</h2>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-serif text-purple-600 mb-2">
            Your overall interview rating is:{" "}
            {/* Display the dynamically calculated average rating */}
            <span className="font-extrabold text-4xl">{averageRating}/10</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Find below interview questions and answers.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {feedbackList.map((feedback, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Collapsible className="bg-white rounded-lg shadow-md overflow-hidden">
                <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-left">
                    {feedback.question}
                  </h3>
                  <ChevronsUpDownIcon size={24} className="text-gray-400" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center bg-purple-100 rounded-lg p-3">
                      <span className="font-semibold">Your rating:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {/* Display the individual rating, potentially with 1 decimal place */}
                        {parseFloat(feedback.rating).toFixed(1)}/10
                      </span>
                    </div>
                    <div className="bg-green-100 rounded-lg p-3">
                      <h4 className="font-semibold mb-2">Correct answer:</h4>
                      <p className="text-sm">{feedback.correctAnswer}</p>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <h4 className="font-semibold mb-2">Your answer:</h4>
                      <p className="text-sm">{feedback.userAnswer}</p>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <h4 className="font-semibold mb-2">Feedback:</h4>
                      <p className="text-sm">{feedback.feedback}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link href="/dashboard">
            <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
              Go to Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Feedback;
