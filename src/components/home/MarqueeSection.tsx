import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import M1 from "@/assets/icons/m1.png";
import M2 from "@/assets/icons/m2.png";
import M3 from "@/assets/icons/m3.png";
import M4 from "@/assets/icons/m4.png";
import M5 from "@/assets/icons/m5.png";
import M6 from "@/assets/icons/m6.png";
import M7 from "@/assets/icons/m7.png";
import M8 from "@/assets/icons/m8.png";

const ShowcaseData = [
  {
    id: 1,
    image: M1,
  },
  {
    id: 2,
    image: M2,
  },
  {
    id: 3,
    image: M3,
  },
  {
    id: 4,
    image: M4,
  },
  {
    id: 5,
    image: M5,
  },
  {
    id: 6,
    image: M6,
  },
  {
    id: 7,
    image: M7,
  },
  {
    id: 8,
    image: M8,
  },
  // {
  //   id: 1,
  //   image: M1,
  // },
  // {
  //   id: 2,
  //   image: M2,
  // },
  // {
  //   id: 3,
  //   image: M3,
  // },
  // {
  //   id: 4,
  //   image: M4,
  // },
  // {
  //   id: 5,
  //   image: M5,
  // },
];

const MarqueeSection = () => {
  return (
    <div className="bg-white">
      <div className="py-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="lg:text-lg text-base text-center">
            Trusted by modern, people-first organizations
          </h1>
        </div>
        <Marquee pauseOnHover={true} speed={40} loop={100}>
          <div className="flex items-center justify-center gap-2">
            {ShowcaseData?.map((showcase) => (
              <div key={showcase?.id} className="w-full h-full relative mb-4">
                <Image
                  src={showcase?.image}
                  alt="banner"
                  width={500}
                  height={500}
                  className="w-full h-[50px] object-cover"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSection;
