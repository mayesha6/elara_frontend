"use client";

import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Button } from "../ui/button";

export default function RewardsSection() {
  const [points, setPoints] = useState(100);

  const balance = 2500;
  const after = balance - points;

  return (
    <section className="w-full bg-[#eff6ff] py-16 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-xl md:text-3xl lg:text-4xl text-[#24435b] leading-tight text-center md:text-left">
            Structured rewards.
            <br />
            Measurable impact.
          </h1>

          <p className="mt-4 text-gray-600 max-w-md md:text-left md:text-base text-sm leading-relaxed text-justify">
            Give your team the power to recognize each other with a point-
            based system that’s transparent, fair, and meaningful.
          </p>

          <div className="mt-6 space-y-3 md:text-base text-sm leading-relaxed">
            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Set monthly point budgets per employee</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Track points in real-time with balance previews</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Customizable point ranges for different occasions</span>
            </div>
          </div>

          <Button className="md:w-auto w-full mt-8 border border-orange-400 text-orange-500 px-6 py-2 rounded-md bg-white hover:bg-orange-50 transition">
           <span className="text-sm"> Login Now</span> <RiArrowRightUpLine className="inline-block ml-1 text-xl" />
          </Button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto">

          <h3 className="text-orange-500 font-semibold text-lg mb-6">
            Points Allocation
          </h3>

          {/* Slider */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Award Points</p>

            <input
              type="range"
              min="0"
              max="500"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full accent-orange-500"
            />

            <div className="flex justify-between text-xs mt-1 text-gray-400">
              <span>0</span>
              <span className="text-orange-500 font-medium">{points} pts</span>
              <span>500</span>
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gray-50 rounded-xl p-5 mt-6 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">Available Balance</span>
              <span className="font-semibold text-orange-500">
                {balance.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Award Amount</span>
              <span className="text-red-500 font-medium">
                -{points}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">After This</span>
              <span className="text-green-600 font-semibold">
                {after.toLocaleString()}
              </span>
            </div>

          </div>

          <p className="text-xs text-gray-400 mt-4">
            Resets in 24 days
          </p>
        </div>

      </div>
    </section>
  );
}