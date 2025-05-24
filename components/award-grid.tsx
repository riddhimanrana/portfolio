"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, ExternalLink, Award as AwardIcon, Medal, Star, Trophy, Sparkles } from "lucide-react";
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
import { AwardModal } from "./award-modal";

interface AwardGridProps {
  awards: Award[];
}

export function AwardGrid({ awards }: AwardGridProps) {
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAwardClick = (award: Award) => {
    setSelectedAward(award);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAward(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {awards.map((award, index) => (
          <AwardGridItem
            key={award.id}
            award={award}
            index={index}
            onClick={() => handleAwardClick(award)}
          />
        ))}
      </div>

      <AwardModal
        award={selectedAward}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

interface AwardGridItemProps {
  award: Award;
  index: number;
  onClick: () => void;
}

function AwardGridItem({
  award,
  index,
  onClick,
}: AwardGridItemProps) {
  const [imageError, setImageError] = useState(false);

  // Enhanced difficulty configurations
  const difficultyConfig = {
    major: {
      bgGradient: "bg-gradient-to-br from-blue-50/80 to-blue-100/60 dark:from-blue-900/30 dark:to-blue-800/20",
      borderColor: "border-blue-200/50 dark:border-blue-700/50",
      accentColor: "bg-blue-500", // changed from "blue-500"
      textColor: "text-blue-700 dark:text-blue-400",
      icon: <Medal className="w-4 h-4" />,
      label: "Major",
      shadowColor: "shadow-blue-200/50 dark:shadow-blue-900/30"
    },
    notable: {
      bgGradient: "bg-gradient-to-br from-purple-50/80 to-purple-100/60 dark:from-purple-900/30 dark:to-purple-800/20",
      borderColor: "border-purple-200/50 dark:border-purple-700/50",
      accentColor: "bg-purple-500", // changed from "purple-500"
      textColor: "text-purple-700 dark:text-purple-400",
      icon: <Star className="w-4 h-4" />,
      label: "Notable",
      shadowColor: "shadow-purple-200/50 dark:shadow-purple-900/30"
    },
    honorable: {
      bgGradient: "bg-gradient-to-br from-amber-50/80 to-amber-100/60 dark:from-amber-900/30 dark:to-amber-800/20",
      borderColor: "border-amber-200/50 dark:border-amber-700/50",
      accentColor: "bg-amber-500", // changed from "amber-500"
      textColor: "text-amber-700 dark:text-amber-400",
      icon: <AwardIcon className="w-4 h-4" />,
      label: "Honorable",
      shadowColor: "shadow-amber-200/50 dark:shadow-amber-900/30"
    }
  }[award.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className={`h-full cursor-pointer transition-all duration-300 backdrop-blur-sm border-2 overflow-hidden hover:shadow-xl group relative ${difficultyConfig.bgGradient} ${difficultyConfig.borderColor} hover:${difficultyConfig.shadowColor} hover:shadow-lg`}
        onClick={onClick}
      >
        {/* Decorative top accent */}
        <div className={`h-1.5 ${difficultyConfig.accentColor}`} />
        
        {/* Difficulty indicator */}
        <div className={`absolute top-3 right-3 p-1.5 rounded-full ${difficultyConfig.accentColor} text-white shadow-sm`}>
          {difficultyConfig.icon}
        </div>

        {/* Sparkle effect for major awards */}
        {award.difficulty === "major" && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse mt-10 mr-2.5" />
          </div>
        )}

        <CardHeader className="pb-3 pt-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-14 w-14 overflow-hidden mr-3 relative shadow-md rounded-full">
              {/* <div className={`absolute inset-0 ${difficultyConfig.accentColor} opacity-20 blur-sm rounded-full`} /> */}
              <div className="relative h-full w-full rounded-full border overflow-hidden">
                {!imageError ? (
                  <Image
                    src={award.image || "/placeholder.svg"}
                    alt={award.name}
                    fill
                    className="object-cover rounded-full transition-transform duration-300"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center rounded-full justify-center ">
                    {difficultyConfig.icon}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <CardTitle className="text-lg font-bold line-clamp-2 text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {award.name}
              </CardTitle>
              <CardDescription className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{formatDate(award.date)}</span>
              </CardDescription>
            </div>
          </div>
          
          {/* Removed the difficulty badge from here */}
        </CardHeader>

        <CardContent className="pt-0 pb-3">
          <p className="text-gray-700 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
            {award.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0 pb-4">
          {award.link ? (
            <a
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm font-medium ${difficultyConfig.textColor} hover:underline transition-all duration-200 group/link`}
              onClick={(e) => e.stopPropagation()}
            >
              View details 
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <>
            {/* <span className="text-xs text-gray-400 dark:text-gray-500 italic">Click to view details</span> */}
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
