
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  start?: number;
  width?: string;
  height?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title = 'YouTube Video',
  autoplay = false,
  start,
  width = '100%',
  height = '315'
}) => {
  const getEmbedUrl = () => {
    let url = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();
    
    if (autoplay) params.append('autoplay', '1');
    if (start) params.append('start', start.toString());
    params.append('rel', '0');
    params.append('modestbranding', '1');
    params.append('fs', '1'); // Enable fullscreen
    
    return `${url}?${params.toString()}`;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={getEmbedUrl()}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubePlayer;
