import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Clock } from "lucide-react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white border-2 border-indigo-100 shadow-lg rounded-xl p-6 flex flex-col justify-between h-full"
    >
      <div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-bold text-2xl text-indigo-700 mb-2"
        >
          {interview?.jobPosition}
        </motion.h2>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center text-gray-600 mb-1"
        >
          <Briefcase size={16} className="mr-2" />
          <span>{interview?.jobExperience} Years of Experience</span>
        </motion.div>
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center text-gray-500 text-sm"
        >
          <Calendar size={14} className="mr-2" />
          <span>
            Created: {new Date(interview.createdAt).toLocaleDateString()}
          </span>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between mt-4 gap-4"
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={onStart}
        >
          Start Interview
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default InterviewItemCard;
