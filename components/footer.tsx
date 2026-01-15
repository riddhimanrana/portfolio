"use client";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="py-8 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">© {new Date().getFullYear()} All rights reserved</span>
          <span className="mx-1">·</span>
          <span>Built and designed by Riddhiman Rana</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
