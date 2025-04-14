"use client"

import { useState } from "react"
import { motion, AnimatePresence, MotionConfig } from "motion/react"

type ToDoItem = {
    id: string;
    isChecked: boolean;
    label: string;
}

interface ToDoItemProps {
    id: string;
    isChecked: boolean;
    onCheck: (id: string, isChecked: boolean) => void;
    label: string;
}

function ToDoItem({ id, isChecked, onCheck, label }: ToDoItemProps) {
    return (
        <MotionConfig transition={{
            duration: 0.2,
        }}>
            <div className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 relative group">
                <label htmlFor={id} className="relative flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="size-5 invisible"
                        checked={isChecked}
                        id={id}
                        onChange={() => onCheck(id, !isChecked)}
                    />
                    <AnimatePresence mode="wait" initial={false}>
                        {!isChecked
                            ? <motion.div
                                key={`${id}-unchecked`}
                                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"
                            >
                                <svg width="20" height="20">
                                    <motion.rect x="1" y="1" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" pathLength="1"
                                        initial={{ pathLength: 0, }}
                                        animate={{ pathLength: 1, }}
                                        exit={{ pathLength: 0, }}
                                        transition={{ duration: 0.3, }}
                                    ></motion.rect>
                                </svg>
                            </motion.div>
                            : <motion.div
                                key={`${id}-checked`}
                                className="size-5 rounded-sm border-2 border-blue-600 bg-blue-600 pointer-events-none flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-50"
                                style={{ transform: "none" }}
                                initial={{ scale: 0.5, }}
                                animate={{ scale: 1, }}
                                exit={{ scale: 0.5, opacity: 0, }}
                                transition={{ duration: 0.1, }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    className="size-3.5"
                                >
                                    <motion.path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 12l6 6 10-14"
                                        initial={{ pathLength: 0, }}
                                        animate={{ pathLength: 1, }}
                                        exit={{ pathLength: 0, }}
                                    />
                                </svg>
                            </motion.div>
                        }
                    </AnimatePresence>
                </label>
                <div className="flex-grow">
                    <motion.label
                        className="relative ml-2 overflow-hidden text-sm font-medium cursor-pointer"
                        htmlFor={id}
                        initial={false}
                        animate={{
                            x: isChecked ? [0, -4, 0] : [0, 4, 0],
                            color: isChecked ? "#99a1af" : "#000"
                        }}
                    >
                        {label}
                        <motion.div
                            className="absolute left-0 top-1/2 h-[1px] bg-muted-foreground translate-y-1/2"
                            initial={false}
                            animate={{ right: isChecked ? 0 : "100%", }}
                        />
                    </motion.label>
                </div>
            </div>
        </MotionConfig>
    );
}

export default function AnimatedCheckboxesPage() {
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>([
        { id: "1", isChecked: false, label: "Complete day 3 challenge" },
        { id: "2", isChecked: true, label: "Reach 25k votes on Hindi Commentary" },
        { id: "3", isChecked: false, label: "Study for OS exam" },
    ]);

    const handleCheck = (id: string, isChecked: boolean) => {
        setToDoItems(toDoItems.map((item) => item.id === id ? { ...item, isChecked } : item));
    };

    return (
        <div className="flex flex-col gap-4 items-center p-4 sm:p-8 lg:p-12 h-dvh">
            <h1 className="text-2xl">Animated Checkboxes</h1>
            <div className="max-w-sm w-full space-y-1">
                {toDoItems.map((item) => (
                    <ToDoItem
                        key={item.id}
                        {...item}
                        onCheck={handleCheck}
                    />
                ))}
            </div>
        </div>
    );
}