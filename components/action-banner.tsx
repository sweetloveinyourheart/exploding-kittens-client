"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ActionBannerHandle = {
  addMessage: (msg: string) => void;
};

const ActionBanner = forwardRef<ActionBannerHandle, { delay?: number }>(
  ({ delay = 2000 }, ref) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [current, setCurrent] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      addMessage: (msg: string) => {
        setMessages((prev) => [...prev, msg]);
      },
    }));

    useEffect(() => {
      if (!current && messages.length > 0) {
        setCurrent(messages[0]);
        setMessages((prev) => prev.slice(1));
      }

      if (current) {
        const timer = setTimeout(() => {
          setCurrent(null);
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [current, messages, delay]);

    return (
      <div className="w-full max-w-2xl mx-auto px-4 min-h-[64px]">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-b from-[#cb2d3e] to-[#ef473a] text-white font-bold uppercase tracking-wide px-6 py-3 flex items-center justify-center space-x-3 rounded shadow"
            >
              <span>{current}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ActionBanner.displayName = "ActionBanner";
export default ActionBanner;
