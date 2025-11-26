import { useState } from "react";

import { useGameStore } from "../stores/useGameStore";

export const useAddScoreForm = () => {
  const { sessionId, hideModal, modalConfig, setScores } = useGameStore();

  const [playerName, setPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeForm = (newName: string) => {
    setPlayerName(newName);
  };

  const handleAddScore = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/scores/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, sessionId }),
      });

      const result = await response.json();

      if (result.success) {
        setScores(result.data.scores);

        modalConfig({
          title: "Score Added!",
          message: "Your score has been successfully submitted!",
          variant: "default",
          modalShowCloseButton: false,
          modalConfirmText: "Close",
          onConfirm: hideModal,
        });
        hideModal();
      }

      setErrorMessage(result.error ?? "");
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };

  return {
    playerName,
    errorMessage,
    onChangeForm: handleChangeForm,
    onAddScore: handleAddScore,
    hideModal,
  };
};
