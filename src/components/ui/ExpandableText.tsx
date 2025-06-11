import { useState, useRef, useEffect } from "react"
import { Button } from "./button"

interface ExpandableTextProps {
  text: string
  lines?: number
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({ text, lines = 4 }) => {
  const [expanded, setExpanded] = useState(false)
  const [clamp, setClamp] = useState(true)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!expanded && textRef.current) {
      textRef.current.style.display = "-webkit-box"
      textRef.current.style.webkitBoxOrient = "vertical"
      textRef.current.style.overflow = "hidden"
      textRef.current.style.webkitLineClamp = String(lines)
    } else if (textRef.current) {
      textRef.current.style.display = "block"
      textRef.current.style.webkitLineClamp = "unset"
      textRef.current.style.overflow = "visible"
    }
  }, [expanded, lines])

  return (
    <div>
      <p
        ref={textRef}
        className="whitespace-pre-line text-sm text-muted-foreground transition-all duration-300"
      >
        {text}
      </p>
      <Button
        variant="link"
        size="sm"
        onClick={() => setExpanded(!expanded)}
        className="mt-1 text-indigo-500 px-0"
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </div>
  )
}
