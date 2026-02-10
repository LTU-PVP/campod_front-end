import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type MouseEvent,
} from "react";
import { usePlayerStore } from "../../store/usePlayerStore";

export const Player = (): ReactElement => {
  const { currentEpisode, isPlaying, setIsPlaying, togglePlay } =
    usePlayerStore();

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentEpisode) {
      const audio = audioRef.current;
      // audio.src = currentEpisode.file_path;
      audio.src = "/white-noise.mp3";
      audio.load();
      audio.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [currentEpisode, setIsPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  const handleToggle = () => {
    togglePlay();
  };

  const skip = (amount: number) => {
    audioRef.current.currentTime += amount;
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleScrub = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();

    const clickPositionX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickPositionX / width));

    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

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
          <img
            src={currentEpisode?.imageUrl || "https://placehold.co/48x48"}
            alt={currentEpisode?.title || ""}
            className="player-avatar"
          />
          <div className="player-text">
            <span className="player-title">{currentEpisode?.title || ""}</span>
            <span className="player-subtitle">
              {currentEpisode?.collection_name || ""}
            </span>
          </div>
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
