
import { useState, useEffect } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
}

interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  videos: YouTubeVideo[];
}

export const useYouTube = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract playlist ID from YouTube URL
  const extractPlaylistId = (url: string): string | null => {
    const regex = /[?&]list=([^#\&\?]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Get YouTube thumbnail URL
  const getThumbnailUrl = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'): string => {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
  };

  // Create YouTube embed URL
  const getEmbedUrl = (videoId: string, autoplay: boolean = false, start?: number): string => {
    let url = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();
    
    if (autoplay) params.append('autoplay', '1');
    if (start) params.append('start', start.toString());
    params.append('rel', '0'); // Don't show related videos
    params.append('modestbranding', '1'); // Modest branding
    
    return `${url}?${params.toString()}`;
  };

  // Mock function to simulate fetching playlist data
  const fetchPlaylistData = async (playlistId: string): Promise<YouTubePlaylist> => {
    setLoading(true);
    setError(null);

    try {
      // This would normally make an API call to YouTube Data API
      // For now, we'll return mock data based on the provided playlist
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      // Mock data for the provided playlist
      const mockPlaylist: YouTubePlaylist = {
        id: playlistId,
        title: 'English Learning Playlist',
        description: 'Comprehensive English lessons for Thai learners',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/medium.jpg',
        itemCount: 10,
        videos: [
          {
            id: 'dQw4w9WgXcQ1',
            title: 'Basic English Conversation - Lesson 1',
            description: 'Learn basic English conversation skills',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/medium.jpg',
            publishedAt: '2024-01-01',
            duration: '15:30'
          },
          {
            id: 'dQw4w9WgXcQ2',
            title: 'English Grammar Fundamentals',
            description: 'Master English grammar basics',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/medium.jpg',
            publishedAt: '2024-01-02',
            duration: '22:45'
          },
          {
            id: 'dQw4w9WgXcQ3',
            title: 'Business English Vocabulary',
            description: 'Essential business English terms',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/medium.jpg',
            publishedAt: '2024-01-03',
            duration: '18:20'
          }
        ]
      };

      setLoading(false);
      return mockPlaylist;
    } catch (err) {
      setError('Failed to fetch playlist data');
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    extractPlaylistId,
    extractVideoId,
    getThumbnailUrl,
    getEmbedUrl,
    fetchPlaylistData
  };
};
