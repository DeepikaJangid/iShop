'use client'
import { useState, useEffect, useRef } from "react";

export default function Description({ html, lines = 3 }) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const el = contentRef.current;
        if (el) {
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            const maxHeight = lineHeight * lines;
            if (el.scrollHeight > maxHeight) {
                setShowButton(true);
            }
        }
    }, [html, lines]);

    return (
        <div className="mt-1 text-xs text-slate-500">
            <div
                ref={contentRef}
                className={`${!expanded ? "overflow-hidden" : ""}`}
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: !expanded ? lines : 'none',
                    WebkitBoxOrient: 'vertical',
                    wordBreak: 'break-word',
                }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
            {showButton && (
                <button
                    className={`text-xs mt-1 hover:cursor-pointer hover:underline ${expanded ? "text-red-600" : "text-blue-600"
                        }`}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </div>
    );
}