import { useNavigate } from "react-router";
import { BookOpen, Lightbulb, Plane, GraduationCap, Search, Settings, Bot, Monitor } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function DesktopHomeScreen() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();

  const notebooks = [
    { name: "Science", count: null },
    { name: "Math", count: 16 },
    { name: "Programming", count: 8 },
    { name: "Psychology", count: 3 },
  ];

  const actionCards = [
    {
      title: "Create Notebook",
      subtitle: "Quizzes & Study Materials",
      icon: BookOpen,
      route: "/create-notebook",
      color: "bg-sky-400"
    },
    {
      title: "Create Material",
      subtitle: "Upload or create quizzes",
      icon: Lightbulb,
      route: "/create",
      color: "bg-sky-400"
    },
    {
      title: "Room Sharing",
      subtitle: "Join study rooms",
      icon: Plane,
      route: "/community-rooms",
      color: "bg-sky-400"
    },
    {
      title: "Manage Material",
      subtitle: "Edit your quizzes",
      icon: GraduationCap,
      route: "/share-quizzes",
      color: "bg-sky-400"
    },
    {
      title: "Manage Room",
      subtitle: "Browse communities",
      icon: Search,
      route: "/community",
      color: "bg-sky-400"
    },
    {
      title: "K.E.I A.I",
      subtitle: "AI Study Assistant",
      icon: Bot,
      route: "/ai-assistant",
      color: "bg-sky-400"
    },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-300 rounded-r-[3rem] p-8 flex flex-col">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Monitor className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h1 className="text-3xl text-white">K.E.I</h1>
              <p className="text-white/90 text-sm">Notebook</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-white text-xl">Your Notebooks</h2>
            <span className="text-white text-xl">&gt;&gt;</span>
          </div>
          <div className="space-y-3">
            {notebooks.map((notebook, index) => (
              <button
                key={index}
                className="w-full text-left text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-colors"
              >
                {notebook.name} {notebook.count && notebook.count}
              </button>
            ))}
          </div>
        </div>

        <div className="text-white/60 text-sm">
          {isGuest ? "Guest Mode" : user?.nickname}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-6">
          <div className="flex-1"></div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/create-notebook")}
              className="px-6 py-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors shadow-md"
            >
              + Create
            </button>
            {isGuest ? (
              <button
                onClick={() => navigate("/auth")}
                className="px-6 py-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors shadow-md"
              >
                Sign In / Log In
              </button>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="px-6 py-3 bg-sky-400 text-white rounded-full hover:bg-sky-500 transition-colors shadow-md"
              >
                Profile
              </button>
            )}
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="flex-1 p-12">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {actionCards.map((card, index) => (
              <button
                key={index}
                onClick={() => navigate(card.route)}
                className={`${card.color} rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-transform shadow-lg group`}
              >
                <div className="w-20 h-20 bg-gray-900/80 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <card.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-white text-xl mb-1">{card.title}</h3>
                  <p className="text-white/80 text-sm">{card.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Button */}
        <button
          onClick={() => navigate("/profile")}
          className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <Settings className="w-7 h-7 text-gray-800" />
        </button>
      </div>
    </div>
  );
}
