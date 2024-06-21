"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaMicrophoneAlt,
  FaRegCheckCircle,
  FaListAlt,
  FaMicrophone,
  FaCamera,
} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: <FaMicrophoneAlt size={24} />,
      text: "AI-Generated Interview Questions",
    },
    {
      icon: <FaRegCheckCircle size={24} />,
      text: "AI Evaluation and Feedback",
    },
    { icon: <FaListAlt size={24} />, text: "Manage Your Interviews" },
    { icon: <FaMicrophone size={24} />, text: "Speech-to-Text Analysis" },
    { icon: <FaCamera size={24} />, text: "Webcam Integration" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900">
      <main className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-6xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to TechTerview
        </motion.h1>
        <motion.p
          className="text-center text-xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Ace your next interview with AI-driven mock interviews and feedback
        </motion.p>
        <div className="flex justify-center mb-12">
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg">
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mr-4 text-blue-500">{feature.icon}</div>
              <div>
                <p className="font-semibold">{feature.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
