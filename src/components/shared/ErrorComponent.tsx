
import { FaExclamationTriangle } from 'react-icons/fa';

function ErrorComponent({ error }: { error: string | null }) {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <FaExclamationTriangle className="text-3xl text-slate-800 mr-2" />
      <span className="text-slate-800 text-lg font-medium">{error}</span>
    </div>
  );
}

export default ErrorComponent