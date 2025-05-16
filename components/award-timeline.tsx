"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AwardCard } from "./award-card";
import type { Award } from "@/types/award";

interface AwardTimelineProps {
  awards: Award[];
}

export function AwardTimeline({ awards }: AwardTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-300/50 dark:bg-gray-700/50 transition-colors duration-300" />
        {/* Timeline items */}
        <div className="space-y-12">
          <AnimatePresence>
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 flex items-center justify-center w-12 h-12">
                  <div
                    className={`w-4 h-4 rounded-full transition-colors duration-300 ${award.difficulty === "major" ? "bg-blue-500 dark:bg-blue-400" : "bg-gray-400 dark:bg-gray-500"}`}
                  />
                </div>

                <div className="ml-16">
                  <AwardCard
                    award={award}
                    isExpanded={expandedId === award.id}
                    onToggle={() => toggleExpand(award.id)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
