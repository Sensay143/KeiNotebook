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
    <div className="min-h-screen bg-[#F8F9FB] pb-24 relative flex flex-col font-sans">
      <div className="bg-gradient-to-r w-full from-[#1A73E8] to-[#12C88B] pt-8 pb-10 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">K.E.I Notebook</h1>
            <div className="flex items-center gap-3 md:gap-4 ml-auto">
              {isGuest && (
                <button
                  onClick={() => navigate("/auth")}
                  className="px-5 py-2 md:px-8 md:py-2.5 bg-white text-blue-600 font-semibold rounded-full text-sm md:text-base hover:bg-blue-50 transition-colors shadow-sm whitespace-nowrap"
                >
                  Sign In
                </button>
              )}
              <div className="flex items-center gap-2 bg-white/20 hover:bg-white/30 cursor-pointer backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/20 transition-colors">
                {isOnline ? (
                  <>
                    <Globe className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-sm md:text-base font-medium text-white whitespace-nowrap">Online</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-sm md:text-base font-medium text-white whitespace-nowrap">Offline</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            onClick={() => navigate("/your-notebook")}
            className="bg-white hover:bg-gray-50 transition-colors w-full rounded-2xl px-6 py-4 md:py-5 flex items-center gap-4 shadow-md cursor-pointer"
          >
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />
            <span className="text-gray-400 text-base md:text-lg font-medium">Your Notebook</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6 md:space-y-8 flex-1 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full max-w-4xl">
          <button
            onClick={() => navigate("/downloaded")}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-4 border border-gray-100 aspect-square sm:aspect-auto sm:h-56 md:h-64"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <Download className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            </div>
            <span className="text-base md:text-lg font-semibold text-slate-700">Downloads</span>
          </button>
          <button
            onClick={() => navigate("/share-quizzes")}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-4 border border-gray-100 aspect-square sm:aspect-auto sm:h-56 md:h-64"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 rounded-full flex items-center justify-center shrink-0">
              <Share2 className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
            </div>
            <span className="text-base md:text-lg font-semibold text-slate-700">Share</span>
          </button>
          <button
            onClick={() => navigate("/create")}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-4 border border-gray-100 aspect-square sm:aspect-auto sm:h-56 md:h-64"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
              <Plus className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
            </div>
            <span className="text-base md:text-lg font-semibold text-slate-700">Create</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
          <button
            onClick={() => navigate("/community")}
            className="bg-gradient-to-br from-[#6C5CE7] to-[#A259FF] p-6 md:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 border border-white/10"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex flex-col justify-center h-full pt-1 sm:pt-0">
              <span className="text-lg md:text-xl text-white block font-bold mb-1">Community</span>
              <span className="text-sm md:text-base text-white/90 font-medium">Discussions</span>
            </div>
          </button>
          <button
            onClick={() => navigate("/community-rooms")}
            className="bg-gradient-to-br from-[#D946EF] to-[#FF4785] p-6 md:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 border border-white/10"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shrink-0">
              <UsersIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex flex-col justify-center h-full pt-1 sm:pt-0">
              <span className="text-lg md:text-xl text-white block font-bold mb-1">Study Rooms</span>
              <span className="text-sm md:text-base text-white/90 font-medium">Join live</span>
            </div>
          </button>
        </div>
        
        {/* We keep the original offline/trending lists visually distinct below if they want to scroll to it, but the top matches Figma */}
        <div className="w-full max-w-4xl pt-8 md:pt-16 hidden sm:block">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Available Offline</h2>
          </div>
          {offlineQuizzes && offlineQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
              <p className="font-medium text-lg">No offline quizzes available</p>
            </div>
          )}
        </div>

        {isOnline && (
          <div className="w-full max-w-4xl pt-4 hidden sm:block">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-2 rounded-xl">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Trending Now</h2>
            </div>
            {trendingQuizzes && trendingQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
                <p className="font-medium text-lg">No trending quizzes at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-3 md:py-4 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4 md:px-12">
          <button className="flex flex-col items-center gap-1.5 text-blue-600 transition-transform hover:scale-105">
            <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-sm font-bold">Home</span>
          </button>
          <button
            onClick={() => navigate("/community-materials")}
            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-transform hover:scale-105"
          >
            <Download className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-sm font-medium">Materials</span>
          </button>
          <button
            onClick={() => navigate("/create-notebook")}
            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-transform hover:scale-105"
          >
            <Plus className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-sm font-medium">Create</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-transform hover:scale-105"
          >
            <User className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-[10px] md:text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
