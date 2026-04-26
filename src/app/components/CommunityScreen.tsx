import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, MessageSquare, Users, Star, GitFork, Eye, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function CommunityScreen() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<"trending" | "following" | "yours">("trending");

  const communities = [
    {
      id: "1",
      name: "Advanced Mathematics Study Group",
      description: "Calculus, Linear Algebra, and beyond. Share solutions and discuss problems.",
      members: 1234,
      posts: 456,
      quizzes: 89,
      stars: 234,
      category: "Math",
      isFollowing: false,
    },
    {
      id: "2",
      name: "Computer Science Hub",
      description: "Algorithms, Data Structures, and Programming challenges. Collaborate and learn together.",
      members: 2456,
      posts: 892,
      quizzes: 156,
      stars: 567,
      category: "Programming",
      isFollowing: true,
    },
    {
      id: "3",
      name: "Psychology & Behavioral Science",
      description: "Discuss theories, research papers, and psychological concepts.",
      members: 876,
      posts: 234,
      quizzes: 45,
      stars: 123,
      category: "Psychology",
      isFollowing: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-2xl text-white">Community Discussions</h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-6 py-2.5 rounded-xl transition-colors ${
                activeTab === "trending"
                  ? "bg-white text-blue-600"
                  : "bg-white/20 text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </div>
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`px-6 py-2.5 rounded-xl transition-colors ${
                activeTab === "following"
                  ? "bg-white text-blue-600"
                  : "bg-white/20 text-white"
              }`}
            >
              Following
            </button>
            <button
              onClick={() => setActiveTab("yours")}
              className={`px-6 py-2.5 rounded-xl transition-colors ${
                activeTab === "yours"
                  ? "bg-white text-blue-600"
                  : "bg-white/20 text-white"
              }`}
            >
              Your Communities
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-4">
        {isGuest && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
            <p className="text-orange-900 text-sm">
              <strong>Guest Mode:</strong> You can view communities but need an account to join discussions and post.
            </p>
          </div>
        )}

        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl text-gray-900">{community.name}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {community.category}
                  </span>
                </div>
                <p className="text-gray-600">{community.description}</p>
              </div>
              <button
                onClick={() => !isGuest && navigate(`/community/${community.id}`)}
                disabled={isGuest}
                className={`px-6 py-2 rounded-xl transition-colors ${
                  community.isFollowing
                    ? "bg-gray-100 text-gray-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } ${isGuest ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {community.isFollowing ? "Following" : "Join"}
              </button>
            </div>

            <div className="flex gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{community.members.toLocaleString()} members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                <span>{community.posts} discussions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitFork className="w-4 h-4" />
                <span>{community.quizzes} quizzes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{community.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
