
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, Eye, ExternalLink } from 'lucide-react';
import { useYouTube } from '@/hooks/useYouTube';
import YouTubePlayer from './YouTubePlayer';

interface YouTubePlaylistProps {
  playlistUrl: string;
  title?: string;
  showPlayer?: boolean;
}

const YouTubePlaylist: React.FC<YouTubePlaylistProps> = ({
  playlistUrl,
  title,
  showPlayer = false
}) => {
  const { extractPlaylistId, fetchPlaylistData, loading, error } = useYouTube();
  const [playlist, setPlaylist] = useState<any>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylist = async () => {
      const playlistId = extractPlaylistId(playlistUrl);
      if (playlistId) {
        try {
          const data = await fetchPlaylistData(playlistId);
          setPlaylist(data);
          if (showPlayer && data.videos.length > 0) {
            setSelectedVideoId(data.videos[0].id);
          }
        } catch (err) {
          console.error('Error loading playlist:', err);
        }
      }
    };

    loadPlaylist();
  }, [playlistUrl]);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-24 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !playlist) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <p className="text-red-600">
            {error || 'Failed to load playlist. Please check the URL.'}
          </p>
          <p className="text-red-500 text-sm mt-2 thai-text">
            ไม่สามารถโหลดเพลย์ลิสต์ได้ กรุณาตรวจสอบ URL
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      {showPlayer && selectedVideoId && (
        <YouTubePlayer
          videoId={selectedVideoId}
          title={playlist.videos.find((v: any) => v.id === selectedVideoId)?.title}
        />
      )}

      {/* Playlist Info */}
      <Card className="classroom-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">
                {title || playlist.title}
              </CardTitle>
              <p className="text-gray-600 text-sm mb-3">{playlist.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <Badge variant="outline">
                  {playlist.itemCount} videos
                </Badge>
                <a 
                  href={playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-600"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View on YouTube
                </a>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Video List */}
          <div className="space-y-3">
            {playlist.videos.map((video: any, index: number) => (
              <div
                key={video.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedVideoId === video.id
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedVideoId(video.id)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 rounded object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {index + 1}. {video.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
                {showPlayer && (
                  <Button
                    variant={selectedVideoId === video.id ? "default" : "outline"}
                    size="sm"
                  >
                    {selectedVideoId === video.id ? 'Playing' : 'Play'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubePlaylist;
