import { Lock, User, Download as DownloadIcon, Bluetooth, Play } from "lucide-react";

interface QuizCardProps {
  title: string;
  subject: string;
  creator: string;
  visibility: "public" | "anonymous" | "private";
  downloaded?: boolean;
  bluetoothReceived?: boolean;
  onClick?: () => void;
}

export function QuizCard({
  title,
  subject,
  creator,
  visibility,
  downloaded,
  bluetoothReceived,
  onClick
}: QuizCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{subject}</p>
        </div>
        <div className="flex gap-1.5">
          {visibility === "public" && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              Public
            </span>
          )}
          {visibility === "anonymous" && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <User className="w-3 h-3" />
              Anonymous
            </span>
          )}
          {visibility === "private" && (
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Private
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>{visibility === "anonymous" ? "Anonymous" : creator}</span>
          {downloaded && (
            <span className="flex items-center gap-1 text-blue-600">
              <DownloadIcon className="w-3.5 h-3.5" />
              Downloaded
            </span>
          )}
          {bluetoothReceived && (
            <span className="flex items-center gap-1 text-purple-600">
              <Bluetooth className="w-3.5 h-3.5" />
              Bluetooth
            </span>
          )}
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
          <Play className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
