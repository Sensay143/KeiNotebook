import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Users, Video, Mic, Lock, Globe, Plus, Share2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function StudyRoomsScreen() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<"active" | "scheduled" | "yours">("active");

  const activeRooms = [
    {
      id: "1",
      name: "Calculus Study Session",
      host: "Sarah Chen",
      participants: 12,
      maxParticipants: 20,
      isLive: true,
      isPublic: true,
      subject: "Math",
      startedAgo: "15 min ago",
    },
    {
      id: "2",
      name: "Algorithm Practice",
      host: "Mike Johnson",
      participants: 8,
      maxParticipants: 15,
      isLive: true,
      isPublic: true,
      subject: "Programming",
      startedAgo: "45 min ago",
    },
    {
      id: "3",
      name: "Private Study Group",
      host: "Emma Wilson",
      participants: 5,
      maxParticipants: 10,
      isLive: true,
      isPublic: false,
      subject: "Psychology",
      startedAgo: "5 min ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-2xl text-white">Study Rooms</h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-6 py-2.5 rounded-xl transition-colors ${
                activeTab === "active"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white"
              }`}
            >
              Active Now
            </button>
            <button
              onClick={() => setActiveTab("scheduled")}
              className={`px-6 py-2.5 rounded-xl transition-colors ${
                activeTab === "scheduled"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white"
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setActiveTab("yours")}
              className={`px-6 py-2.5 rounded-xl transition-colors ${
                activeTab === "yours"
                  ? "bg-white text-purple-600"
                  : "bg-white/20 text-white"
              }`}
            >
              Your Rooms
            </button>
            <div className="flex-1"></div>
            {!isGuest && (
              <button
                onClick={() => navigate("/create-room")}
                className="px-6 py-2.5 bg-white text-purple-600 rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Room
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {isGuest && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6">
            <p className="text-orange-900 text-sm">
              <strong>Guest Mode:</strong> You can view active rooms but need an account to join or create rooms.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg text-gray-900">{room.name}</h3>
                    {room.isPublic ? (
                      <Globe className="w-4 h-4 text-green-600" />
                    ) : (
                      <Lock className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Hosted by {room.host}</p>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-2">
                    {room.subject}
                  </span>
                </div>
                {room.isLive && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    LIVE
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{room.participants}/{room.maxParticipants}</span>
                </div>
                <span className="text-xs">{room.startedAgo}</span>
              </div>

              <button
                disabled={isGuest}
                className={`w-full py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                  isGuest
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
              >
                <Video className="w-4 h-4" />
                Join Room
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
