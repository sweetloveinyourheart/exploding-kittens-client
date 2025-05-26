"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FullscreenNotificationProps {
    message: string
    duration?: number
    show: boolean
    onClose?: () => void
}

export const FullscreenNotification = ({
    message,
    duration = 1000,
    show,
    onClose,
}: FullscreenNotificationProps) => {
    const [visible, setVisible] = useState(show)

    useEffect(() => {
        if (show) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
                onClose?.()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [show, duration, onClose])

    return (
        <div
            className={cn(
                "font-londrina-solid fixed inset-0 z-50 flex items-center justify-center",
                "bg-foreground/25 text-background text-4xl font-bold",
                "transition-opacity duration-500",
                visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
        >
            <motion.div
                key={message}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-background text-4xl font-bold"
            >
                {message}
            </motion.div>
        </div>
    )
}
