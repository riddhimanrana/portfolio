"use client";
import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="pb-8 bg-white dark:bg-gray-950">
      <div className="text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} All rights reserved &middot; Built and
        designed by Riddhiman Rana
      </div>
    </footer>
  );
};

export default Footer;
