import { useRef, useEffect } from "react";

import { useGameStore } from "../stores/useGameStore";

import { normalizeCoordinates } from "../helpers/normalizeCoordinates";
import { isWithinBounds } from "../helpers/isWithinBounds";

export const capybaraBounds = {
  x: Number(import.meta.env.VITE_CAPYBARA_X),
  y: Number(import.meta.env.VITE_CAPYBARA_Y),
};

export const useWhereCapybara = () => {
  const {
    targetVisible,
    targetPosition,
    sessionId,
    scoreConfig,
    setTargetVisible,
    setTargetPosition,
    setSessionId,
    modalConfig,
    hideModal,
  } = useGameStore();

  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startGame = async () => {
      try {
        const existSessionId = localStorage.getItem("sessionId");
        if (existSessionId) {
          setSessionId(existSessionId);
          return;
        }

        const response = await fetch("http://localhost:3000/api/game/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        localStorage.setItem("sessionId", result.data.sessionId);
        setSessionId(result.data.sessionId);
      } catch (error) {
        localStorage.clear();
        console.error("Error starting game:", error);
      }
    };

    startGame();
  }, [setSessionId]);


  const validatePosition = async (
    clickX: number,
    clickY: number,
    screenWidth: number,
    screenHeight: number
  ) => {
    try {
      const { normalizedX, normalizedY } = normalizeCoordinates(
        clickX,
        clickY,
        screenWidth,
        screenHeight
      );

      const isCorrect = isWithinBounds(
        normalizedX,
        normalizedY,
        capybaraBounds
      );

      if (!isCorrect) {
        modalConfig({
          title: "Capybara not found!",
          message: "Please, try again",
          variant: "danger",
          modalShowCloseButton: false,
          modalConfirmText: "Try again",
          onConfirm: hideModal,
        });
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/game/validate-position",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clickX,
            clickY,
            screenWidth,
            screenHeight,
            sessionId,
          }),
        }
      );

      const result = await response.json();
      console.log('result', result)
      if (result.data.found) {
        modalConfig({
          title: "Capybara found!",
          message: "Congratulations, you found the capybara!",
          variant: "default",
          modalCancelText: "Close",
          modalConfirmText: "Add score",
          onConfirm: () => scoreConfig({ showScoreForm: true, playerName: "" }),
        });
        return;
      }

      modalConfig({
        title: "Capybara not found!",
        message: "Please, try again",
        variant: "danger",
        modalShowCloseButton: false,
        modalConfirmText: "Try again",
        onConfirm: hideModal,
      });
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imageWidth = rect.width;
    const imageHeight = rect.height;

    validatePosition(x, y, imageWidth, imageHeight);

    setTargetPosition({ x, y });
    setTargetVisible(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      imageContainerRef.current &&
      !imageContainerRef.current.contains(e.target as Node)
    ) {
      setTargetVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    targetVisible,
    targetPosition,
    imageContainerRef,
    handleImageClick,
  };
};
