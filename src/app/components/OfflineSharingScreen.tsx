import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Bluetooth, Wifi, Radio, CheckCircle2 } from "lucide-react";

export function OfflineSharingScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send");
  const [selectedMethod, setSelectedMethod] = useState<"bluetooth" | "wifi">("bluetooth");
  const [nearbyDevices] = useState([
    { id: 1, name: "Sarah's Phone", distance: "2m away" },
    { id: 2, name: "Mike's Tablet", distance: "5m away" },
    { id: 3, name: "Alex's Phone", distance: "8m away" }
  ]);
  const [transferComplete, setTransferComplete] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl text-white">Offline Sharing</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("send")}
            className={`flex-1 py-2.5 rounded-xl transition-colors ${
              activeTab === "send"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white"
            }`}
          >
            Send
          </button>
          <button
            onClick={() => setActiveTab("receive")}
            className={`flex-1 py-2.5 rounded-xl transition-colors ${
              activeTab === "receive"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white"
            }`}
          >
            Receive
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === "send" ? (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-gray-800 mb-3">Select Quiz to Share</h2>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 border-2 border-blue-500 rounded-xl cursor-pointer">
                  <h3 className="text-gray-900">Algebra Fundamentals</h3>
                  <p className="text-sm text-gray-600">Math • 10 questions</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100">
                  <h3 className="text-gray-900">Physics: Motion & Forces</h3>
                  <p className="text-sm text-gray-600">Science • 15 questions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-gray-800 mb-3">Sharing Method</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMethod("bluetooth")}
                  className={`flex-1 p-4 rounded-xl transition-all ${
                    selectedMethod === "bluetooth"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Bluetooth className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Bluetooth</span>
                </button>
                <button
                  onClick={() => setSelectedMethod("wifi")}
                  className={`flex-1 p-4 rounded-xl transition-all ${
                    selectedMethod === "wifi"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Wifi className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Wi-Fi Direct</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-gray-800 mb-3">Nearby Devices</h2>
              <div className="space-y-2">
                {nearbyDevices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => setTransferComplete(true)}
                    className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Radio className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900">{device.name}</p>
                        <p className="text-sm text-gray-500">{device.distance}</p>
                      </div>
                    </div>
                    <div className="text-blue-600 text-sm">Send</div>
                  </button>
                ))}
              </div>
            </div>

            {transferComplete && (
              <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-green-900">Transfer Complete!</p>
                  <p className="text-sm text-green-700">Quiz sent via Bluetooth</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center space-y-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Radio className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 mb-2">Listening for Nearby Devices</h2>
                <p className="text-sm text-gray-600">
                  Make sure {selectedMethod === "bluetooth" ? "Bluetooth" : "Wi-Fi"} is enabled
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setSelectedMethod("bluetooth")}
                  className={`p-3 rounded-xl ${
                    selectedMethod === "bluetooth"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Bluetooth className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedMethod("wifi")}
                  className={`p-3 rounded-xl ${
                    selectedMethod === "wifi"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Wifi className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-gray-800 mb-3">Recent Transfers</h2>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-1">
                    <Bluetooth className="w-4 h-4 text-green-600" />
                    <p className="text-gray-900">Physics: Motion & Forces</p>
                  </div>
                  <p className="text-sm text-gray-600">Received from Sarah's Phone • 2 min ago</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
