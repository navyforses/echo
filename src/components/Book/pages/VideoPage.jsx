import React, { useState, useRef, useEffect } from 'react';
import './VideoPage.css';

const VideoPage = ({ videoNumber, title, description, videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Check if video URL is valid
  useEffect(() => {
    if (videoUrl) {
      setVideoError(false);
      setVideoLoaded(false);
    }
  }, [videoUrl]);

  const handlePlay = () => {
    if (videoRef.current && !videoError) {
      setIsLoading(true);
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error playing video:', error);
          setIsLoading(false);
          setVideoError(true);
        });
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
    console.error('Video failed to load:', videoUrl);
  };

  return (
    <div className="video-page">
      <div className="video-header">
        <div className="page-number-badge">
          გვერდი {videoNumber + 2}
        </div>
        <h2 className="video-title">{title}</h2>
        <p className="video-description">{description}</p>
      </div>

      <div className="video-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            className="video-player"
            controls={false}
            onEnded={handleVideoEnd}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/webm" />
            თქვენი ბრაუზერი არ მხარს უჭერს ვიდეო ფაილებს.
          </video>

          {!isPlaying && !videoError && (
            <div className="video-overlay">
              <div className="play-button" onClick={handlePlay}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}

          {videoError && (
            <div className="video-error-overlay">
              <div className="error-message">
                <p>❌ ვიდეო ვერ ჩაიტვირთა</p>
                <p>ფაილი: {videoUrl}</p>
                <button onClick={() => window.location.reload()} className="retry-btn">
                  ხელახლა ცდა
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>ვიდეო იტვირთება...</p>
            </div>
          )}
        </div>

        <div className="video-controls">
          <button 
            className="control-btn"
            onClick={isPlaying ? handlePause : handlePlay}
            disabled={videoError}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          {videoError && (
            <button 
              className="control-btn retry-btn"
              onClick={() => window.location.reload()}
            >
              🔄
            </button>
          )}
        </div>
      </div>

      <div className="video-info">
        <div className="video-duration">დრო: ~5 წუთი</div>
        <div className="video-quality">ხარისხი: HD</div>
        {videoError && (
          <div className="video-error-info">
            <span>❌ ვიდეო ვერ ჩაიტვირთა</span>
          </div>
        )}
      </div>

      <div className="video-footer">
        <div className="video-notes">
          <h4>შენიშვნა:</h4>
          <p>ეს ვიდეო მოიცავს ილია ჭავჭავაძის ცხოვრებისა და მოღვაწეობის მნიშვნელოვან მომენტებს.</p>
        </div>
      </div>

      <div className="decorative-border">
        <div className="corner-ornament top-left"></div>
        <div className="corner-ornament top-right"></div>
        <div className="corner-ornament bottom-left"></div>
        <div className="corner-ornament bottom-right"></div>
      </div>
    </div>
  );
};

export default VideoPage; 