"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    GetInterviewDetail();
  }, []);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   */

  const GetInterviewDetail = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 ">
      <h2 className="pl-2  pb-5 text-red-900 font-bold text-6xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  <div className="flex flex-col my-5 gap-5">
    <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 gap-5">
      <h2 className="font-semibold mb-4">
        <strong>Job Role/Job Position:</strong> {interviewData?.jobPosition}
      </h2>
      <h2 className="font-semibold mb-4"> {/* Added margin-bottom here */}
        <strong>Job Description:</strong> {interviewData?.jobDesc}
      </h2>
      <h2 className="font-semibold">
        <strong>Years of Experience:</strong> {interviewData?.jobExperience}
        </h2>
        </div>
        <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 ">
          <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb/> <strong>Information</strong> </h2>
          <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
      </div>
      <div>
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 300, width: 300 }}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
          />
        ) : (
          <>
            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
            <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam and Microphone
            </Button>
          </>
        )}
      </div>
      </div>

      <div className="flex justify-end items-end">

      <Link href={`/dashboard/interview/${params.interviewId}/start`}>
     <Button >Start Interview</Button>
      
      </Link>
      </div>
      
    </div>
  );
}

export default Interview;
