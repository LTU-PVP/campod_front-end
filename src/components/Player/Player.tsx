import type { ReactElement } from "react";

export const Player = (): ReactElement => {
  const progressPercent = 0;

  return (
    <>
      <div className="player">
        <div className="progress-container">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="player-content">
          <span className="time-display">00:00</span>

          <span className="material-symbols-outlined player-control player-control-rewind">
            replay_10
          </span>
          <span className="material-symbols-outlined player-control player-control-play-pause">
            play_circle
          </span>
          <span className="material-symbols-outlined player-control player-control-forward">
            forward_30
          </span>

          <span className="time-display">00:00</span>
        </div>
      </div>
    </>
  );
};
