'use client';

import { Play } from 'lucide-react';

export default function CustomerStories() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2 sm:mb-3 md:mb-4 text-balance">
            Watch Customer Stories
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            See how Elara transformed these organizations
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden aspect-video sm:aspect-square md:aspect-video group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Optional: Add overlay image placeholder */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              
              {/* Play button - centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="bg-orange-500 hover:bg-orange-600 rounded-full p-3 sm:p-4 md:p-5 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-lg"
                  aria-label="Play video"
                >
                  <Play
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white fill-white"
                  />
                </button>
              </div>
              
              {/* Optional: Video title on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs sm:text-sm font-medium">
                  Customer Story {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}