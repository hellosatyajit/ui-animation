'use client'
import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HomeIcon, MailIcon, UserIcon, SettingsIcon, MenuIcon, XIcon } from "lucide-react"

const MENU_OPTIONS = [
    {
        name: "Home",
        icon: <HomeIcon />
    },
    {
        name: "Mail",
        icon: <MailIcon />
    },
    {
        name: "User",
        icon: <UserIcon />
    },
    {
        name: "Settings",
        icon: <SettingsIcon />
    }
]

function FluidMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <svg className="hidden absolute">
                <defs>
                    <filter id="gooey-filter">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation={8}
                            result="blur-sm"
                        />
                        <feColorMatrix
                            in="blur-sm"
                            type="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="absolute top-4 left-4 sm:top-10 sm:left-10">
                <div className="relative w-full" style={{ filter: "url(#gooey-filter)" }}>
                    <AnimatePresence initial={false}>
                        <button
                            className="absolute z-50 flex items-center justify-center size-16 rounded-full bg-[#efefef] cursor-pointer text-foreground"
                            onClick={() => setIsMenuOpen(prev => !prev)}
                        >
                            <motion.span
                                key={isMenuOpen ? "close" : "menu"}
                                className="flex items-center justify-center"
                                initial={{ opacity: 0, filter: "blur(30px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(30px)" }}
                                transition={{ duration: 0.4 }}
                            >
                                {isMenuOpen ? <XIcon /> : <MenuIcon />}
                            </motion.span>
                        </button>
                        {isMenuOpen && MENU_OPTIONS.map((tab, index) => (
                            <motion.button
                                key={index}
                                className="absolute flex items-center justify-center size-16 rounded-full bg-[#efefef] cursor-pointer text-muted-foreground hover:text-foreground"
                                style={{ zIndex: index * 1 }}
                                custom={index}
                                variants={{
                                    open: (i) => ({
                                        opacity: 1,
                                        top: (i + 1) * 64,
                                        transition: {
                                            delay: i * 0.05,
                                            // type: "spring",
                                            // bounce: 0.0,
                                            duration: 0.4,
                                        }
                                    }),
                                    closed: (i) => ({
                                        opacity: 0,
                                        top: 0,
                                        transition: {
                                            delay: (MENU_OPTIONS.length - i - 1) * 0.05,
                                            // type: "spring",
                                            // bounce: 0.0,
                                            duration: 0.4
                                        },
                                    })
                                }}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {tab.icon}
                                <span className="sr-only">{tab.name}</span>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div >
    )
}

export default function FluidMenuPage() {
    return (
        <div className="flex items-center justify-center h-dvh">
            <FluidMenu />
            <p className="text-xl">Open the menu in the top left corner</p>
        </div>
    )
}