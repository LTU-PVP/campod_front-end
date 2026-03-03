import { create } from "zustand";
import type { Episode } from "../types";

interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  setEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentEpisode: null,
  isPlaying: false,
  setEpisode: (episode) => set({ currentEpisode: episode, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
}));
