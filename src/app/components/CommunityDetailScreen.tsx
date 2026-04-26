import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, MessageSquare, ThumbsUp, Share2, Send, Pin } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function CommunityDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isGuest } = useAuth();
  const [newComment, setNewComment] = useState("");

  const discussions = [
    {
      id: "1",
      title: "How to approach Dynamic Programming problems?",
      author: "Sarah Chen",
      authorAvatar: "👩‍💻",
      content: "I'm struggling with DP problems. Any resources or tips to master them?",
      likes: 45,
      replies: 12,
      isPinned: true,
      timeAgo: "2 hours ago",
    },
    {
      id: "2",
      title: "Best practices for Graph Algorithms",
      author: "Mike Johnson",
      authorAvatar: "👨‍🎓",
      content: "Let's compile a list of best practices and common patterns for graph problems.",
      likes: 23,
      replies: 8,
      isPinned: false,
      timeAgo: "5 hours ago",
    },
    {
      id: "3",
      title: "Share your Algorithm study schedules",
      author: "Emma Wilson",
      authorAvatar: "👩‍🔬",
      content: "What's your daily routine for studying algorithms? Let's motivate each other!",
      likes: 67,
      replies: 34,
      isPinned: false,
      timeAgo: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-lg">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate("/community")} className="p-2 hover:bg-white/20 rounded-full">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl text-white">Computer Science Hub</h1>
              <p className="text-white/80 text-sm">2,456 members • 892 discussions</p>
            </div>
            <button className="px-6 py-2 bg-white text-blue-600 rounded-xl hover:bg-white/90 transition-colors">
              Following
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!isGuest && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Start a new discussion..."
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Post
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {discussion.isPinned && (
                <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                  <Pin className="w-4 h-4" />
                  <span>Pinned</span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{discussion.authorAvatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg text-gray-900">{discussion.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {discussion.author} • {discussion.timeAgo}
                  </p>
                  <p className="text-gray-700">{discussion.content}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 border-t pt-4">
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{discussion.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{discussion.replies} replies</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
