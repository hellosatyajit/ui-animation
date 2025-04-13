"use client"

import { useState } from "react"
import { motion, AnimatePresence, MotionConfig } from "motion/react"
import useMeasure from "react-use-measure"

type TransactionStatus = "analyzing" | "safe" | "warning"

function DynamicStatusIndicator() {
    const [status, setStatus] = useState<TransactionStatus>("safe");
    const [ref, bounds] = useMeasure();

    const changeState = async (state: 'safe' | 'warning') => {
        if (status === "analyzing") return;
        setStatus("analyzing");
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus(state);
    }

    return (
        <>
            <div className="flex flex-row gap-2">
                <button className="hover:underline cursor-pointer" onClick={() => changeState('safe')}>Safe</button>
                <button className="hover:underline cursor-pointer" onClick={() => changeState('warning')}>Warning</button>
            </div>
            <MotionConfig
                transition={{ duration: 0.2, type: "spring", bounce: 0.1 }}>
                <motion.button
                    className="rounded-full font-medium transition-colors cursor-pointer"
                    style={{
                        backgroundColor: status === "analyzing" ? "#e6f0ff" : status === "safe" ? "#e6ffe6" : "#ffe6e6",
                        color: status === "analyzing" ? "#3498db" : status === "safe" ? "#2ecc71" : "#e74c3c",
                    }}
                    animate={{ width: bounds.width }}
                >
                    <div className="px-6 py-3 flex items-center justify-center gap-2 w-fit" ref={ref}>
                        <AnimatePresence mode="wait">
                            {status === "analyzing" && (
                                <motion.div
                                    key="analyzing-icon"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <motion.svg
                                        key="analyzing-icon-svg"
                                        className="min-w-5 max-w-5 min-h-5 max-h-5"
                                        width="20" height="20" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                                    >
                                        <path d="M36.639 5.60895C39.5795 6.7434 42.2677 8.44592 44.5502 10.6193C46.8327 12.7927 48.6648 15.3943 49.9419 18.2757C51.2189 21.1571 51.9159 24.2619 51.9931 27.4126C52.0703 30.5634 51.5261 33.6985 50.3916 36.639C49.2572 39.5795 47.5547 42.2677 45.3813 44.5502C43.2079 46.8327 40.6063 48.6648 37.7249 49.9419C34.8435 51.2189 31.7387 51.9159 28.5879 51.9931C25.4372 52.0703 22.302 51.5261 19.3616 50.3916C16.4211 49.2572 13.7329 47.5547 11.4503 45.3813C9.16784 43.2079 7.33576 40.6063 6.05871 37.7249C4.78166 34.8435 4.08465 31.7387 4.00748 28.588C3.93031 25.4372 4.47448 22.3021 5.60894 19.3616C6.74339 16.4211 8.4459 13.7329 10.6193 11.4504C12.7926 9.16786 15.3943 7.33578 18.2757 6.05873C21.1571 4.78168 24.2618 4.08467 27.4126 4.0075C30.5634 3.93032 33.6985 4.4745 36.639 5.60895L36.639 5.60895Z" stroke="#BDDBFF" strokeWidth="8" />
                                        <path d="M28.0005 4.00024C31.1522 4.00024 34.2731 4.62102 37.1849 5.82714C40.0967 7.03325 42.7424 8.80108 44.9711 11.0297C47.1997 13.2583 48.9675 15.904 50.1736 18.8158C51.3797 21.7277 52.0005 24.8485 52.0005 28.0002" stroke="#4D9FEF" strokeWidth="8" strokeLinecap="round" />
                                    </motion.svg>
                                </motion.div>
                            )}
                            {status === "safe" && (
                                <motion.svg
                                    key="safe-icon"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="min-w-5 max-w-5 min-h-5 max-h-5"
                                    width="20" height="20" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="27" cy="27" r="27" fill="#36C250" />
                                    <path d="M15.5 29C15.5 29 22 35.5 22.5 35.5C23 35.5 38 20.5 38 20.5" stroke="white" strokeWidth="6" strokeLinecap="round" />
                                </motion.svg>
                            )}
                            {status === "warning" && (
                                <motion.div
                                    key="warning-icon"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <motion.svg
                                        key="warning-icon"
                                        initial={{ x: 0 }}
                                        animate={{ x: [0, -5, 5, 0] }}
                                        transition={{ duration: 0.1, repeat: 2 }}
                                        className="min-w-5 max-w-5 min-h-5 max-h-5"
                                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    >
                                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                                        <path d="M12 9v4" stroke="white" />
                                        <path d="M12 17h.01" stroke="white" />
                                    </motion.svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="w-max">
                            <AnimatePresence mode="wait" initial={false}>
                                {status === "analyzing" && (
                                    <motion.span
                                        key="analyzing"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                    >
                                        Analyzing Transaction
                                    </motion.span>
                                )}
                                {status === "safe" && (
                                    <motion.span
                                        key="safe-text"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                    >
                                        Transaction Safe
                                    </motion.span>
                                )}
                                {status === "warning" && (
                                    <motion.span
                                        key="warning-text"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                    >
                                        Transaction Warning
                                    </motion.span>

                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.button>
            </MotionConfig>
        </>
    )
}

export default function DynamicStatusIndicatorPage() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-dvh">
            <DynamicStatusIndicator />
        </div>
    )
}