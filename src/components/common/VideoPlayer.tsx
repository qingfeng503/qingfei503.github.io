'use client'

import React from 'react'

interface VideoPlayerProps {
    src: string
    title?: string
    className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title, className = '' }) => {
    return (
        <div className={`relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-lg ${className}`}>
            <iframe
                src={src}
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title={title || 'Video player'}
                loading="lazy"
            />
        </div>
    )
}

export default VideoPlayer