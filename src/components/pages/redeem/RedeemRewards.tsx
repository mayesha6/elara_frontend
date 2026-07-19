"use client";

import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";

export default function RedeemRewards() {
  const [points, setPoints] = useState(100);

  const balance = 2500;
  const after = balance - points;

  return (
    <section className="w-full bg-[#eff6ff] py-16 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-xl md:text-3xl lg:text-4xl text-[#24435b] leading-tight text-center md:text-left font-medium">
         Why Rewards Matter
          </h1>

          <p className="mt-4 text-gray-600 max-w-md md:text-left md:text-base text-sm leading-relaxed text-justify">
         Give your team the power to recognize each other with a point-based system that&apos;s transparent, fair, and meaningful.
          </p>

          <div className="mt-6 space-y-3 md:text-base text-sm leading-relaxed">
            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Boost employee motivation</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Encourage positive workplace culture</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Increase engagement and retention</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaCircleCheck className="text-green-500 w-5 h-5" />
              <span>Celebrate achievements in meaningful ways</span>
            </div>
          </div>
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
              <span className="text-red-500 font-medium">-{points}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">After This</span>
              <span className="text-green-600 font-semibold">
                {after.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">Resets in 24 days</p>
        </div>
      </div>
    </section>
  );
}
