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

function AwardGridItem({ award, index, onClick }: AwardGridItemProps) {
  const [imageError, setImageError] = useState(false);

  const difficultyConfig = {
    major: {
      accentBar: "bg-foreground",
      icon: <Medal className="w-4 h-4" />,
      label: "Major",
    },
    notable: {
      accentBar: "bg-muted-foreground",
      icon: <Star className="w-4 h-4" />,
      label: "Notable",
    },
    honorable: {
      accentBar: "bg-muted-foreground/60",
      icon: <AwardIcon className="w-4 h-4" />,
      label: "Honorable",
    },
  }[award.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className="h-full cursor-pointer transition-all duration-300 bg-card border border-border overflow-hidden hover:shadow-md group relative rounded-sm"
        onClick={onClick}
      >
        {/* Decorative top accent */}
        <div className={`h-1 ${difficultyConfig.accentBar}`} />

        {/* Difficulty indicator */}
        <div className="absolute bottom-3 right-3 p-1.5 rounded-sm bg-muted text-muted-foreground">
          {difficultyConfig.icon}
        </div>

        <CardHeader className="pb-3 pt-4">
          <div className="flex items-start">
            <div
              className={`flex-shrink-0 mr-3 relative ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
            >
              <div
                className={`relative h-12 w-12 overflow-hidden ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
              >
                {!imageError ? (
                  <Image
                    src={award.image || "/placeholder.svg"}
                    alt={award.name}
                    fill
                    sizes="(max-width: 640px) 40px, (max-width: 1024px) 56px, 80px"
                    quality={100}
                    className={`object-cover ${award.isIconRoundedFull ? 'rounded-full' : 'rounded-sm'}`}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted rounded-sm">
                    {difficultyConfig.icon}
                  </div>
                )}
              </div>
              {award.difficulty === "major" && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 drop-shadow-sm" />
                </motion.div>
              )}
            </div>

            <div className="flex-grow min-w-0">
              <CardTitle className="text-lg font-bold line-clamp-2 text-foreground mb-1 leading-tight transition-colors duration-300">
                {award.name}
              </CardTitle>
              <CardDescription className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{formatDate(award.date)}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-3">
          <p className="text-foreground/80 line-clamp-3 text-sm leading-relaxed transition-colors duration-300">
            {award.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0 pb-4 flex flex-wrap gap-2">
          {award.submissionLink ? (
            <a
              href={award.submissionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:underline transition-all duration-200 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              View details
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : award.link ? (
            <a
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:underline transition-all duration-200 group/link"
              onClick={(e) => e.stopPropagation()}
            >
              View details 
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ) : null}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
