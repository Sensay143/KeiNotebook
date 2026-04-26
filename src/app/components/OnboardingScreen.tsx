import { useNavigate } from "react-router";
import { User, Wifi, Download } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function OnboardingScreen() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-between p-8 bg-gradient-to-br from-blue-500 via-green-400 to-blue-400">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl">
            <div className="flex gap-6 items-center justify-center">
              <User className="w-16 h-16 text-blue-600" />
              <Download className="w-12 h-12 text-green-600" />
              <Wifi className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl text-white">
            Learn Anywhere, Even Offline
          </h1>
          <p className="text-lg text-white/90">
            Share and access quizzes without internet
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
          <div className="w-2 h-2 rounded-full bg-white/40"></div>
        </div>

        <button
          onClick={() => navigate(user || isGuest ? "/home" : "/auth")}
          className="w-full bg-white text-blue-600 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          {user || isGuest ? "Next" : "Get Started"}
        </button>
      </div>
    </div>
  );
}
