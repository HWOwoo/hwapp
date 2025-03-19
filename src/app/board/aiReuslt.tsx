import ReactMarkDown from 'react-markdown';

interface AiResultProps {
  visible: boolean;
  onClose: () => void;
  aiContent: string;
}

const aiResult: React.FC<AiResultProps> = ({ visible, onClose, aiContent }) => {

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white !p-6 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI 분석 결과</h2>
          <ReactMarkDown>{aiContent}</ReactMarkDown>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white !px-4 !py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
        );
}

export default aiResult;