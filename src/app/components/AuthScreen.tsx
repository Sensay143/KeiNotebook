import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Mail, Lock, User as UserIcon, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function AuthScreen() {
  const navigate = useNavigate();
  const { login, signup, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<"choice" | "login" | "signup">("choice");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      await signup(nickname, email, password);
      navigate("/home");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate("/home");
  };

  if (mode === "choice") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-green-400 to-blue-400 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-3">QuizShare</h1>
          <p className="text-white/90">Learn Anywhere, Even Offline</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => setMode("login")}
            className="w-full bg-white text-blue-600 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className="w-full bg-white/20 backdrop-blur-sm text-white border-2 border-white py-4 rounded-2xl hover:bg-white/30 transition-all"
          >
            Create Account
          </button>
          <button
            onClick={handleGuest}
            className="w-full bg-transparent text-white py-4 rounded-2xl border-2 border-white/50 hover:border-white transition-all"
          >
            Continue as Guest
          </button>
        </div>

        <p className="text-white/70 text-sm mt-8 text-center">
          Guests can only share quizzes offline
        </p>
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-green-400 to-blue-400 flex flex-col p-6">
        <button
          onClick={() => setMode("choice")}
          className="self-start p-2 hover:bg-white/20 rounded-full mb-8"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-white mb-2">Welcome Back</h2>
              <p className="text-white/80">Login to your account</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading || !email || !password}
                className="w-full bg-white text-blue-600 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <p className="text-center text-white/80 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-green-400 to-blue-400 flex flex-col p-6">
      <button
        onClick={() => setMode("choice")}
        className="self-start p-2 hover:bg-white/20 rounded-full mb-8"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-white mb-2">Create Account</h2>
            <p className="text-white/80">Join QuizShare today</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Nickname"
                className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <button
              onClick={handleSignup}
              disabled={loading || !nickname || !email || !password}
              className="w-full bg-white text-blue-600 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-white/80 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
