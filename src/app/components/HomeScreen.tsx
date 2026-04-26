import { useNavigate } from "react-router";
import { Download, Share2, Plus, Globe, Radio, BookOpen, Trophy, User, Users as UsersIcon, MessageCircle } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { useAuth } from "../context/AuthContext";

export function HomeScreen() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const isOnline = true;

  const offlineQuizzes = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      subject: "Math",
      creator: "Sarah Chen",
      visibility: "public" as const,
      downloaded: true,
    },
    {
      id: "2",
      title: "Physics: Motion & Forces",
      subject: "Science",
      creator: "Anonymous",
      visibility: "anonymous" as const,
      bluetoothReceived: true,
    },
  ];

  const trendingQuizzes = [
    {
      id: "3",
      title: "World War II Events",
      subject: "History",
      creator: "Prof. Johnson",
      visibility: "public" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-6 pb-8 md:px-12 md:pb-12 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">K.E.I Notebook</h1>
          <div className="flex items-center gap-2 md:gap-4">
            {isGuest && (
              <button
                onClick={() => navigate("/auth")}
                className="px-5 py-2 bg-white text-blue-600 font-medium rounded-full text-sm hover:bg-blue-50 transition-colors shadow-sm"
              >
                Sign In
              </button>
            )}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              {isOnline ? (
                <>
                  <Globe className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Online</span>
                </>
              ) : (
                <>
                  <Radio className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate("/your-notebook")}
          className="bg-white/95 hover:bg-white transition-colors max-w-2xl mx-auto rounded-2xl px-5 py-4 flex items-center gap-3 shadow-lg cursor-pointer border border-white/40"
        >
          <BookOpen className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500 font-medium">Search Your Notebook...</span>
        </div>
      </div>

      <div className="px-6 py-8 md:px-12 lg:px-16 space-y-10">
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 lg:gap-8">
          <div className="grid grid-cols-3 md:flex gap-3 md:gap-6 flex-1 max-w-2xl">
            <button
              onClick={() => navigate("/downloaded")}
              className="bg-white p-4 sm:px-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center gap-3 flex-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Downloads</span>
            </button>
            <button
              onClick={() => navigate("/share-quizzes")}
              className="bg-white p-4 sm:px-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center gap-3 flex-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                <Share2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Share</span>
            </button>
            <button
              onClick={() => navigate("/create")}
              className="bg-white p-4 sm:px-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center gap-3 flex-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Create</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:flex gap-3 md:gap-6 flex-1 max-w-2xl">
            <button
              onClick={() => navigate("/community")}
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col sm:flex-row items-center sm:items-start sm:text-left gap-4 flex-1 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-base text-white block font-semibold mb-1">Community</span>
                <span className="text-xs text-blue-100 font-medium">Join Discussions</span>
              </div>
            </button>
            <button
              onClick={() => navigate("/community-rooms")}
              className="bg-gradient-to-br from-purple-500 to-pink-500 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col sm:flex-row items-center sm:items-start sm:text-left gap-4 flex-1 border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shrink-0">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-base text-white block font-semibold mb-1">Study Rooms</span>
                <span className="text-xs text-purple-100 font-medium">Join Live Sessions</span>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Available Offline</h2>
          </div>
          {offlineQuizzes && offlineQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {offlineQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  title={quiz.title}
                  subject={quiz.subject}
                  creator={quiz.creator}
                  visibility={quiz.visibility}
                  downloaded={quiz.downloaded}
                  bluetoothReceived={quiz.bluetoothReceived}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center text-gray-500">
              <p className="font-medium">No offline quizzes available</p>
            </div>
          )}
        </div>

        {isOnline && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Trophy className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Trending Now</h2>
            </div>
            {trendingQuizzes && trendingQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {trendingQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    title={quiz.title}
                    subject={quiz.subject}
                    creator={quiz.creator}
                    visibility={quiz.visibility}
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-dashed border-gray-200 text-center text-gray-500">
                <p className="font-medium">No trending quizzes at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 px-6 py-4 z-50 transition-all">
        <div className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto flex justify-between items-center px-4">
          <button className="flex flex-col items-center gap-1.5 text-blue-600 transition-transform hover:scale-105">
            <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-xs font-semibold">Home</span>
          </button>
          <button
            onClick={() => navigate("/community-materials")}
            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-transform hover:scale-105"
          >
            <Download className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-xs font-medium">Materials</span>
          </button>
          <button
            onClick={() => navigate("/create-notebook")}
            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-transform hover:scale-105"
          >
            <Plus className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-xs font-medium">Create</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-transform hover:scale-105"
          >
            <User className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
