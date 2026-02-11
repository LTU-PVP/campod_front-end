import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type MouseEvent,
  useCallback,
} from "react";
import { usePlayerStore } from "../../store/usePlayerStore";

export const Player = (): ReactElement => {
  const { currentEpisode, isPlaying, setIsPlaying, togglePlay } =
    usePlayerStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      console.error("Audio playback error");
    };

    const handleCanPlay = () => {};

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.pause();
      audio.src = "";
    };
  }, [setIsPlaying]);

  useEffect(() => {
    if (!currentEpisode || !audioRef.current) return;

    const audio = audioRef.current;
    setCurrentTime(0);

    // audio.src = currentEpisode.file_path;
    audio.src = "/white-noise.mp3";
    audio.load();

    audio.play().catch((error) => {
      console.error("Auto-play failed:", error);
      setIsPlaying(false);
    });
  }, [currentEpisode, setIsPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Play failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const handleToggle = useCallback(() => {
    if (!currentEpisode) return;
    togglePlay();
  }, [togglePlay, currentEpisode]);

  const skip = useCallback((amount: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(
      0,
      Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + amount,
      ),
    );
    audioRef.current.currentTime = newTime;
  }, []);

  const handleScrub = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current || !audioRef.current) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const clickPositionX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.max(0, Math.min(1, clickPositionX / width));
      const newTime = percentage * duration;

      audioRef.current.currentTime = newTime;
    },
    [duration],
  );

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const formatTime = useCallback((time: number): string => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  return (
    <div className="player">
      <div
        className="progress-container"
        ref={progressBarRef}
        onClick={handleScrub}
      >
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="player-content">
        <div className="player-info">
          {currentEpisode && (
            <>
              <img
                src={currentEpisode?.imageUrl || "https://placehold.co/48x48"}
                alt={currentEpisode?.title || ""}
                className="player-avatar"
              />
              <div className="player-text">
                <span className="player-title">
                  {currentEpisode?.title || ""}
                </span>
                <span className="player-subtitle">
                  {currentEpisode?.collection_name || ""}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="player-controls-group">
          <span className="time-display">{formatTime(currentTime)}</span>

          <span
            className="material-symbols-outlined player-control"
            onClick={() => skip(-10)}
          >
            replay_10
          </span>

          <span
            className="material-symbols-outlined player-control"
            onClick={handleToggle}
          >
            {isPlaying ? "pause_circle" : "play_circle"}
          </span>

          <span
            className="material-symbols-outlined player-control"
            onClick={() => skip(30)}
          >
            forward_30
          </span>

          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="player-actions"></div>
      </div>
    </div>
  );
};
