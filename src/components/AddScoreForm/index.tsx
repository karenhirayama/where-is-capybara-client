import { useAddScoreForm } from "../../hooks/useAddScoreForm";
import Modal from "../Modal";

const AddScoreForm = () => {
  const { playerName,errorMessage, onChangeForm, hideModal, onAddScore } = useAddScoreForm();

  return (
    <Modal
      open={true}
      title="Add score"
      confirmText="Add score"
      message={
        <>
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={playerName}
                onChange={(e) => onChangeForm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e67c74] focus:border-[#e67c74] transition-colors duration-200"
                placeholder="Enter your name"
                required
              />
            </div>
            <span className="text-xs text-red-500 pl-2">{errorMessage}</span>
          </div>
        </>
      }
      onClose={hideModal}
      onConfirm={onAddScore}
    />
  );
};

export default AddScoreForm;
