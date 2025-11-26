import WhereIsCapybaraImage from "./assets/where-is-capybara.png";

import AddScoreForm from "./components/AddScoreForm";
import Modal from "./components/Modal";
import Scores from "./components/Scores";

import { useWhereCapybara } from "./hooks/useWhereCapybara";

import { useGameStore } from "./stores/useGameStore";

function App() {
  const { imageContainerRef, handleImageClick } = useWhereCapybara();
  const {
    targetVisible,
    targetPosition,
    modalOpen,
    modalTitle,
    modalMessage,
    modalVariant,
    modalConfirmText,
    modalCancelText,
    modalShowCloseButton,
    showScoreForm,
    showScores,
    showImage,
    hideModal,
    modalOnConfirm,
  } = useGameStore();

  return (
    <>
      <div className="text-center flex flex-col items-center justify-center gap-4 mt-8">
        <h1 className="text-5xl font-bold text-gray-800 tracking-tight">
          Where's Capybara?
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Welcome to{" "}
          <span className="font-semibold text-[#e67c74]">
            Where's Capybara?
          </span>
          , a fun and interactive game that challenges your observation skills.
        </p>
      </div>

      {showScores ? <Scores /> : null}

      {showImage ? <div className="flex items-center justify-center">
        <div
          ref={imageContainerRef}
          className="relative bg-gray-100 rounded-lg overflow-hidden"
        >
          <img
            src={WhereIsCapybaraImage}
            alt="Where's capybara?"
            className="w-full h-full object-contain cursor-crosshair"
            onClick={handleImageClick}
          />

          {targetVisible && (
            <div
              className="absolute border-2 border-red-500 rounded-full w-8 h-8 pointer-events-none z-10"
              style={{
                left: `${targetPosition.x - 16}px`,
                top: `${targetPosition.y - 16}px`,
              }}
            >
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500 transform -translate-x-1/2"></div>
            </div>
          )}
        </div>
      </div> : null}

      {modalOpen ? (
        <Modal
          open={modalOpen}
          title={modalTitle}
          message={modalMessage}
          variant={modalVariant}
          confirmText={modalConfirmText}
          cancelText={modalCancelText}
          showCloseButton={modalShowCloseButton}
          onClose={hideModal}
          onConfirm={modalOnConfirm}
        />
      ) : null}
      {showScoreForm ? <AddScoreForm /> : null}
    </>
  );
}

export default App;
