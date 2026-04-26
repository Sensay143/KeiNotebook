import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Lock, QrCode } from "lucide-react";

export function PrivateAccessScreen() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleUnlock = () => {
    if (passcode.length === 4) {
      navigate("/quiz/3");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl text-white">Private Quiz</h1>
            <p className="text-white/80">Enter the passcode to access this quiz</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 space-y-6">
            <div>
              <label className="text-sm text-white/80 mb-2 block">Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.slice(0, 4))}
                placeholder="••••"
                maxLength={4}
                className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-white/50 text-center text-2xl tracking-widest"
              />
            </div>

            <div className="text-center">
              <span className="text-white/60 text-sm">or</span>
            </div>

            <button
              onClick={() => setShowScanner(!showScanner)}
              className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
            >
              <QrCode className="w-5 h-5" />
              Scan QR Code
            </button>

            {showScanner && (
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-full aspect-square bg-white/30 rounded-xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-white/50" />
                </div>
                <p className="text-white/80 text-sm text-center mt-3">
                  Position QR code within the frame
                </p>
              </div>
            )}

            <button
              onClick={handleUnlock}
              disabled={passcode.length !== 4}
              className="w-full bg-white text-purple-600 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
            >
              Unlock Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
