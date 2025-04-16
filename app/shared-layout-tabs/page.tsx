"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils";
import { DiamondIcon, Grid2x2Icon, LayersIcon, Rows3Icon } from "lucide-react";

const TABS = [
    {
        key: "list",
        label: "List view",
        icon: <Rows3Icon size={24} />
    },
    {
        key: "card",
        label: "Card view",
        icon: <Grid2x2Icon size={24} />
    },
    {
        key: "pack",
        label: "Pack view",
        icon: <LayersIcon size={24} />
    },
]

const COLLECTIBLES = [
    {
        id: 209,
        img: "https://i.seadn.io/gae/nntw1LC1mKsr0R6v7KULD7ScT9Fq7nBfIB_6P0obMP61ftA4f4h3_gFlJXeQ_xz7h8zMwu3PYqNJZRGrdgbEqb-IF_4YhdWKrXuO?auto=format&dpr=1&w=384",
        name: "The PixelVerse Series",
        price: 0.855,
    },
    {
        id: 808,
        img: "https://i.seadn.io/gae/S0J17jL28oQxjw7rPeCt-Wl1bxmmrsPU1FBfSMt8n0bmvLedMJ6C2IKFc4JvPfbNAzMwb-wx7WKKTF14IB5J-8UK-vTkXHn4xlk8Wg?auto=format&dpr=1&w=384",
        name: "Blitzionaire Icon Series",
        price: 0.209,
    },
]

export default function SharedLayoutTabsPage() {
    const [selectedTab, setSelectedTab] = useState("list");

    return (
        <div className="flex flex-col gap-4 items-center p-4 sm:p-8 lg:p-12 h-dvh">
            <div className="max-w-[400px] w-full space-y-4">
                <div className="space-y-4">
                    <h1 className="text-lg font-medium">Collectibles</h1>
                    <div className="flex items-center justify-between">
                        {
                            TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    className={cn("rounded-full flex items-center justify-center gap-1 px-4 py-2 font-medium cursor-pointer", selectedTab === tab.key ? 'bg-sky-400 text-white' : 'bg-gray-200 text-neutral-500')}
                                    onClick={() => setSelectedTab(tab.key)}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <hr />
                <div className={cn({
                    "space-y-3": selectedTab === 'list',
                    "grid grid-cols-2 gap-5": selectedTab === 'card',
                    "flex flex-col items-center justify-center gap-5": selectedTab === "pack"
                })}>
                    <AnimatePresence mode="popLayout">
                        {
                            selectedTab === "list" && (
                                COLLECTIBLES.map((item) => <div key={item.id} className="flex items-center gap-4">
                                    <motion.img key={selectedTab + item.id.toString() + "-img"} layoutId={item.id.toString() + "-img"} src={item.img} alt="collectible img" className="rounded-sm size-16" />
                                    <div className="flex-1 font-semibold">
                                        <motion.h2 key={selectedTab + item.id.toString() + "-name"} layoutId={item.id.toString() + "-name"}>{item.name}</motion.h2>
                                        <motion.p className="text-sm" key={selectedTab + item.id.toString() + "-price"} layoutId={item.id.toString() + "-price"}>{item.price} <span className="text-neutral-500">ETH</span></motion.p>
                                    </div>
                                    <motion.div className="flex items-center gap-1" key={selectedTab + item.id.toString() + "-id"} layoutId={item.id.toString() + "-id"}>
                                        <DiamondIcon size={16} className="text-yellow-200 fill-yellow-200" />
                                        <span className="text-neutral-500 font-medium">#{item.id}</span>
                                    </motion.div>
                                </div>
                                )
                            )
                        }
                        {
                            selectedTab === "card" && (
                                COLLECTIBLES.map((item) => <div key={item.id} className="flex flex-col items-center gap-4">
                                    <motion.img key={selectedTab + item.id.toString() + "-img"} layoutId={item.id.toString() + "-img"} src={item.img} alt="collectible img" className="rounded-lg w-full aspect-square" />
                                    <div className="w-full font-semibold">
                                        <motion.h2 key={selectedTab + item.id.toString() + "-name"} layoutId={item.id.toString() + "-name"}>{item.name}</motion.h2>
                                        <div className="flex items-center justify-between gap-1">
                                            <motion.p key={selectedTab + item.id.toString() + "-price"} layoutId={item.id.toString() + "-price"}>{item.price} <span className="text-neutral-500">ETH</span></motion.p>
                                            <motion.div className="flex items-center gap-1" key={selectedTab + item.id.toString() + "-id"} layoutId={item.id.toString() + "-id"}>
                                                <DiamondIcon size={16} className="text-yellow-200 fill-yellow-200" />
                                                <span className="text-neutral-500 font-medium">#{item.id}</span>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                                )
                            )
                        }
                        {
                            selectedTab === "pack" && (
                                <>
                                    <div className="relative h-24 w-24">
                                        {COLLECTIBLES.map((item, index) => <motion.div
                                            key={selectedTab + item.id.toString() + "-img"}
                                            layoutId={item.id.toString() + "-img"}
                                            className="absolute inset-0 h-full aspect-square rounded-3xl"
                                            animate={{
                                                rotate: (index + 1) * (index % 2 ? 8 : -8),
                                                transformOrigin: "50% 50% 0"
                                            }}
                                        >
                                            <img src={item.img} alt="collectible img" className="rounded-3xl size-full" />
                                        </motion.div>)}
                                    </div>
                                    <motion.div
                                        key="summary"
                                        className="font-semibold text-center"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0, }}
                                        transition={{ duration: 0.3, }}
                                    >
                                        <p>{COLLECTIBLES.length} Collectibeles</p>
                                        <p>
                                            {COLLECTIBLES.reduce((prev, curr) => prev + curr.price, 0)}
                                            <span className="text-neutral-500">ETH</span>
                                        </p>
                                    </motion.div>
                                </>
                            )
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}