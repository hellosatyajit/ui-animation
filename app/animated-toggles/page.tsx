"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils";

type Toggle = "free" | "monthly" | "annual";

function AnimatedToggles() {
    const [selectedToggle, setSelectedToggle] = useState<Toggle>("free");

    return (
        <div className="flex items-center rounded-full max-w-md w-full h-16 p-1 bg-white border shadow-sm">
            <button
                className="w-full h-full relative cursor-pointer"
                onClick={() => setSelectedToggle("free")}
            >
                <span
                    className={cn(
                        "relative font-medium text-lg z-10 duration-500",
                        selectedToggle === "free" ? "text-white" : "text-black"
                    )}
                >
                    Free
                </span>
                {selectedToggle === "free" && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-black w-full h-full"
                        layoutId="bg-1"
                    />
                )}
            </button>
            <div
                className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative"
                onClick={() => selectedToggle === "free" && setSelectedToggle("monthly")}
            >
                <AnimatePresence mode="popLayout">
                    {selectedToggle === "free" && (
                        <motion.span
                            key="premium-text"
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.75 }}
                            className="text-lg font-medium block mt-1"
                        >
                            Premium
                        </motion.span>
                    )}
                </AnimatePresence>
                <motion.div
                    className={cn("flex items-center justify-center gap-1 z-10 w-full relative h-full rounded-full", selectedToggle === "free" && "-mt-2")}
                >
                    <motion.button className="relative cursor-pointer" layoutId="btn-monthly">
                        <motion.span className="text-black text-sm relative z-10" layoutId="text-monthly">
                            Monthly
                        </motion.span>
                        {(selectedToggle === "free" || selectedToggle === "monthly") && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-white w-full h-full opacity-0"
                                layoutId="bg-2"
                            />
                        )}
                    </motion.button>
                    <motion.span
                        className="block size-1 rounded-full bg-black"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.button className="relative cursor-pointer" layoutId="btn-annual">
                        <motion.span className="text-black text-sm" layoutId="text-annual">
                            Annual
                        </motion.span>
                    </motion.button>
                    <AnimatePresence mode="popLayout">
                        {(selectedToggle !== "free") && (
                            <div className="absolute inset-0 flex items-center justify-center p-1 z-20">
                                <motion.button
                                    className="relative w-full h-full cursor-pointer"
                                    onClick={() => setSelectedToggle("monthly")}
                                    layoutId="btn-monthly"
                                >
                                    <motion.span
                                        className={cn(
                                            "z-20 relative font-medium",
                                            selectedToggle === "monthly" ? "text-black" : "text-white"
                                        )}
                                        layoutId="text-monthly"
                                    >
                                        Monthly
                                    </motion.span>
                                    {selectedToggle === "monthly" && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-white w-full h-full"
                                            layoutId="bg-2"
                                        />
                                    )}
                                </motion.button>
                                <motion.button
                                    className="relative w-full h-full cursor-pointer"
                                    onClick={() => setSelectedToggle("annual")}
                                    layoutId="btn-annual"
                                >
                                    <motion.span
                                        className={cn(
                                            "z-20 relative font-medium",
                                            selectedToggle === "annual" ? "text-black" : "text-white"
                                        )}
                                        layoutId="text-annual"
                                    >
                                        Annual
                                    </motion.span>
                                    {selectedToggle === "annual" && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-white w-full h-full"
                                            layoutId="bg-2"
                                        />
                                    )}
                                </motion.button>
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
                {selectedToggle !== "free" && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-black w-full h-full"
                        layoutId="bg-1"
                    />
                )}
            </div>
        </div>
    )
}

export default function AnimatedTogglesPage() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-dvh">
            <AnimatedToggles />
        </div>
    )
}