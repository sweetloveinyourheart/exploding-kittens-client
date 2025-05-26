'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

interface CardSliderProps {
  loading: boolean
  cardNumber: number
  onSelectIndex: (index: number) => void
}

export default function CardSlider({ loading, cardNumber, onSelectIndex }: CardSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [y, setY] = useState(86)
  const [currentIndex, setCurrentIndex] = useState<number>(1)

  useEffect(() => {
    if (!containerRef.current) return

    const bounds = containerRef.current.getBoundingClientRect()
    const totalHeight = bounds.height
    const clampedY = Math.min(Math.max(y, 0), totalHeight)
    const segmentHeight = totalHeight / (cardNumber - 1)

    let index = Math.round(clampedY / segmentHeight) + 1
    index = Math.min(Math.max(index, 1), cardNumber)
    setCurrentIndex(index)
  }, [y, cardNumber])

  return (
    <div>
      <div className="flex justify-center items-center mb-4 font-semibold text-background">
        {currentIndex.toString().padStart(2, '0')} / {cardNumber.toString().padStart(2, '0')}
      </div>
      <div className="flex flex-col items-center justify-center h-[300px] w-full relative">
        <div className="absolute top-[60px] bottom-[60px] left-1/2 transform -translate-x-1/2 flex flex-col justify-between z-0">
          {Array.from({ length: 15 }).map((_, idx) => (
            <div key={idx} className="w-[2px] h-[8px] bg-background my-[2px]" />
          ))}
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-background z-10" />
        <motion.div
          drag="y"
          dragConstraints={containerRef}
          dragElastic={0.2}
          dragTransition={{ power: 0, timeConstant: 0 }}
          onDrag={(event, info) => {
            setY(info.point.y - containerRef.current!.getBoundingClientRect().top)
          }}
          className="bg-background border-2 border-foreground w-[40px] h-[40px] rounded-md flex items-center justify-center cursor-grab z-10"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-background z-10" />
        <div
          ref={containerRef}
          className="absolute top-[60px] bottom-[60px] left-0 right-0 pointer-events-none z-0"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="mt-4 px-4 py-2 rounded transition-colors z-20"
          type="button"
          onClick={() => {
            onSelectIndex(currentIndex)
          }}
          disabled={loading}
        >
          Select
        </Button>
      </div>
    </div>

  )
}
