"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ExternalLink, Award as AwardIcon } from "lucide-react";
import type { Award } from "@/types/award";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AwardGridProps {
  awards: Award[];
  onAwardClick: (id: string) => void;
  selectedId: string | null;
}

export function AwardGrid({
  awards,
  onAwardClick,
  selectedId,
}: AwardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {awards.map((award, index) => (
        <AwardGridItem
          key={award.id}
          award={award}
          index={index}
          isSelected={selectedId === award.id}
          onClick={() => onAwardClick(award.id)}
        />
      ))}
    </div>
  );
}

interface AwardGridItemProps {
  award: Award;
  index: number;
  isSelected?: boolean;
  onClick: () => void;
}

function AwardGridItem({
  award,
  index,
  isSelected,
  onClick,
}: AwardGridItemProps) {
  const [imageError, setImageError] = useState(false);

  // Determine styles based on difficulty
  const difficultyStyles = {
    major: "border-blue-500/50 bg-blue-950/40",
    minor: "border-amber-500/50 bg-amber-950/40",
    honorable: "border-purple-500/50 bg-purple-950/40",
  }[award.difficulty];

  const difficultyLabel = {
    major: "Major",
    minor: "Notable",
    honorable: "Honorable",
  }[award.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className={`h-full cursor-pointer transition-all duration-300 backdrop-blur-sm border overflow-hidden ${difficultyStyles} ${
          isSelected ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/20" : ""
        }`}
        onClick={onClick}
      >
        <div
          className={`h-1 ${award.difficulty === "major" ? "bg-blue-500" : award.difficulty === "minor" ? "bg-amber-500" : "bg-purple-500"}`}
        />

        <CardHeader className="pb-2">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 h-12 w-12 bg-gray-800 rounded-full overflow-hidden mr-4 relative">
              {!imageError ? (
                <Image
                  src={award.image || "/images/placeholder.svg"}
                  alt={award.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-200 text-xs">
                  <AwardIcon className="w-6 h-6" />
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-white transition-colors duration-300">
                {award.name}
              </CardTitle>
              <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {formatDate(award.date)}
              </CardDescription>
            </div>
          </div>
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-200 w-auto">
            {difficultyLabel}
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 transition-colors duration-300">
            {award.description}
          </p>
        </CardContent>

        <CardFooter className="pt-1">
          {award.link && (
            <a
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              View details <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
