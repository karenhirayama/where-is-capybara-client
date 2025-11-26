import { create } from "zustand";

import type { Position, Score } from "../interfaces/interfaces";

interface GameState {
  // Game state
  targetVisible: boolean;
  targetPosition: Position;
  sessionId: string;
  gameCompleted: boolean;
  showImage: boolean;

  // Modal state
  modalOpen: boolean;
  modalTitle: string;
  modalMessage: string;
  modalVariant: "default" | "danger";
  modalConfirmText: string;
  modalCancelText: string;
  modalShowCloseButton: boolean;
  modalShowFooter: boolean;

  modalOnConfirm: () => void;

  // Score state
  showScoreForm: boolean;
  playerName: string;
  scores: Score[];
  showScores: boolean;

  // Actions
  setShowImage: (show: boolean) => void;
  setScores: (scores: Score[]) => void;
  setTargetVisible: (visible: boolean) => void;
  setTargetPosition: (position: Position) => void;
  setSessionId: (id: string) => void;
  setGameCompleted: (completed: boolean) => void;
  modalConfig: (config: {
    title: string;
    message: string;
    variant?: "default" | "danger";
    modalConfirmText?: string;
    modalCancelText?: string;
    modalShowCloseButton?: boolean;
    modalShowFooter?: boolean;
    onConfirm?: () => void;
  }) => void;
  scoreConfig: (config: { showScoreForm: boolean; playerName: string }) => void;
  hideModal: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial state
  targetVisible: false,
  targetPosition: { x: 0, y: 0 },
  sessionId: "",
  gameCompleted: false,
  showImage: true,
  scores: [],
  showScores: false,
  showScoreForm: false,
  playerName: "",
  modalOpen: false,
  modalTitle: "",
  modalMessage: "",
  modalVariant: "default",
  modalConfirmText: "",
  modalCancelText: "",
  modalShowCloseButton: true,
  modalShowFooter: true,
  modalOnConfirm: () => {},

  // Actions
  setShowImage: (show) => set({ showImage: show }),
  setScores: (scores) => set({ scores, showScores: true, showImage: false }),
  setTargetVisible: (visible) => set({ targetVisible: visible }),
  setTargetPosition: (position) => set({ targetPosition: position }),
  setSessionId: (id) => set({ sessionId: id }),
  setGameCompleted: (completed) => set({ gameCompleted: completed }),

  modalConfig: (config) =>
    set({
      modalOpen: true,
      modalTitle: config.title,
      modalMessage: config.message,
      modalVariant: config.variant || "default",
      modalConfirmText: config.modalConfirmText,
      modalCancelText: config.modalCancelText,
      modalShowCloseButton: config.modalShowCloseButton,
      modalShowFooter: config.modalShowFooter,
      modalOnConfirm: config.onConfirm,
    }),

  scoreConfig: (config) =>
    set({
      modalOpen: false,
      showScoreForm: config.showScoreForm,
      playerName: config.playerName,
    }),

  hideModal: () =>
    set({
      modalOpen: false,
      showScoreForm: false,
    }),

  resetGame: () =>
    set({
      targetVisible: false,
      gameCompleted: false,
      modalOpen: false,
      showScoreForm: false,
    }),
}));
