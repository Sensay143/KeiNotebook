import { useNavigate } from "react-router";
import { ChevronLeft, Award, Download, CheckCircle2, Settings, Trophy, Flame, Target, Lock, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, isGuest, privateQuizPins, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const badges = [
    { name: "Quiz Master", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-100" },
    { name: "7 Day Streak", icon: Flame, color: "text-orange-600", bg: "bg-orange-100" },
    { name: "Perfect Score", icon: Target, color: "text-green-600", bg: "bg-green-100" },
  ];

  const myQuizzes = [
    { id: "1", title: "Algebra Fundamentals", downloads: 234, completed: 156 },
    { id: "2", title: "Spanish Basics", downloads: 89, completed: 67 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md lg:max-w-full mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-6 pb-12 lg:pb-16 lg:rounded-b-3xl shadow-lg">
        <div className="lg:max-w-6xl lg:mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Settings className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              {isGuest ? (
                <UserCircle className="w-16 h-16 lg:w-20 lg:h-20 text-gray-400" />
              ) : (
                <span className="text-3xl lg:text-5xl">👤</span>
              )}
            </div>
            <h1 className="text-2xl lg:text-3xl text-white mb-1">
              {isGuest ? "Guest User" : user?.nickname || "User"}
            </h1>
            {!isGuest && user && (
              <p className="text-white/80 lg:text-lg">{user.email}</p>
            )}
            {isGuest && (
              <p className="text-white/80 text-sm lg:text-base">Limited features • Offline only</p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 -mt-8 lg:-mt-12 space-y-4 lg:max-w-6xl lg:mx-auto lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
        <div className="bg-white rounded-2xl p-6 shadow-lg lg:col-span-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-blue-600 mb-1">12</div>
              <div className="text-sm text-gray-600">Quizzes Created</div>
            </div>
            <div>
              <div className="text-2xl text-green-600 mb-1">487</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
            <div>
              <div className="text-2xl text-purple-600 mb-1">89</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-3">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-800">Achievements</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`${badge.bg} p-4 rounded-xl flex flex-col items-center gap-2`}
              >
                <badge.icon className={`w-8 h-8 ${badge.color}`} />
                <span className="text-xs text-center text-gray-700">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-2">
          <h2 className="text-gray-800 mb-4">My Quizzes</h2>
          {myQuizzes && myQuizzes.length > 0 ? (
            <div className="space-y-3">
              {myQuizzes.map((quiz) => (
                <div key={quiz.id} className="p-3 bg-gray-50 rounded-xl">
                  <h3 className="text-gray-900 mb-2">{quiz.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {quiz.downloads || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {quiz.completed || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <p>No quizzes created yet</p>
            </div>
          )}
        </div>

        {!isGuest && privateQuizPins.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm lg:row-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-purple-600" />
              <h2 className="text-gray-800">Private Quiz PINs</h2>
            </div>
            <div className="space-y-2">
              {privateQuizPins.map((quiz) => (
                <div key={quiz.id} className="p-3 bg-purple-50 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-gray-900 text-sm">{quiz.title}</p>
                    <p className="text-xs text-gray-500 mt-1">PIN: {quiz.pin}</p>
                  </div>
                  <Lock className="w-4 h-4 text-purple-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-gray-800 mb-4">Settings</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Offline Mode</span>
              <button className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </button>
            </div>
            {!isGuest && (
              <button className="w-full p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                Sync Data
              </button>
            )}
            <button
              onClick={handleLogout}
              className="w-full p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isGuest ? "Exit Guest Mode" : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
