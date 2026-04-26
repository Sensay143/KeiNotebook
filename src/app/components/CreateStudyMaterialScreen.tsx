import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, Trash2, Share2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type MaterialType = "flashcards" | "notes" | "summary";

interface Note {
  title: string;
  content: string;
}

export function CreateStudyMaterialScreen() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [materialType, setMaterialType] = useState<MaterialType>("flashcards");
  const [notebookTitle, setNotebookTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [flashcards, setFlashcards] = useState([
    { front: "", back: "" }
  ]);
  const [notes, setNotes] = useState<Note[]>([
    { title: "", content: "" }
  ]);

  const addFlashcard = () => {
    setFlashcards([...flashcards, { front: "", back: "" }]);
  };

  const removeFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const addNote = () => {
    setNotes([...notes, { title: "", content: "" }]);
  };

  const removeNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/create-notebook")} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl text-white">Create Study Material</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm text-gray-600 mb-2 block">Notebook Title</label>
          <input
            type="text"
            value={notebookTitle}
            onChange={(e) => setNotebookTitle(e.target.value)}
            placeholder="Enter notebook title..."
            className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <label className="text-sm text-gray-600 mb-2 block">Subject Category</label>
          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (e.target.value !== "custom") setCustomSubject("");
            }}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select subject...</option>
            <option value="logic">Logic</option>
            <option value="programming">Programming</option>
            <option value="psychology">Psychology</option>
            <option value="biological">Biological</option>
            <option value="aerospace">Aerospace</option>
            <option value="others">Others</option>
            <option value="custom">Type your own...</option>
          </select>
          {subject === "custom" && (
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              placeholder="Enter custom subject..."
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-sm text-gray-600 mb-3 block">Material Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMaterialType("flashcards")}
              className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                materialType === "flashcards"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setMaterialType("notes")}
              className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                materialType === "notes"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Notes
            </button>
            <button
              onClick={() => setMaterialType("summary")}
              className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                materialType === "summary"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Summary
            </button>
          </div>
        </div>

        {materialType === "flashcards" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-lg text-gray-800">Flashcards</h2>
              <button
                onClick={addFlashcard}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            </div>

            {flashcards.map((card, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Card {index + 1}</span>
                  {flashcards.length > 1 && (
                    <button
                      onClick={() => removeFlashcard(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-2">Front (Question/Term)</label>
                  <input
                    type="text"
                    value={card.front}
                    onChange={(e) => {
                      const newCards = [...flashcards];
                      newCards[index].front = e.target.value;
                      setFlashcards(newCards);
                    }}
                    placeholder="Enter term or question..."
                    className="w-full px-4 py-3 bg-purple-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-2">Back (Answer/Definition)</label>
                  <textarea
                    value={card.back}
                    onChange={(e) => {
                      const newCards = [...flashcards];
                      newCards[index].back = e.target.value;
                      setFlashcards(newCards);
                    }}
                    placeholder="Enter definition or answer..."
                    className="w-full px-4 py-3 bg-purple-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {(materialType === "notes" || materialType === "summary") && (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="text-lg text-gray-800">
                {materialType === "notes" ? "Notes" : "Summaries"}
              </h2>
              <button
                onClick={addNote}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add {materialType === "notes" ? "Note" : "Summary"}
              </button>
            </div>

            {notes.map((note, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {materialType === "notes" ? "Note" : "Summary"} {index + 1}
                  </span>
                  {notes.length > 1 && (
                    <button
                      onClick={() => removeNote(index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => {
                    const newNotes = [...notes];
                    newNotes[index].title = e.target.value;
                    setNotes(newNotes);
                  }}
                  placeholder="Title..."
                  className="w-full px-4 py-2 bg-purple-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  value={note.content}
                  onChange={(e) => {
                    const newNotes = [...notes];
                    newNotes[index].content = e.target.value;
                    setNotes(newNotes);
                  }}
                  placeholder={`Write your ${materialType}...`}
                  className="w-full px-4 py-3 bg-purple-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={8}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => navigate("/home")}
            className="flex-1 bg-white text-gray-700 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            {isGuest ? "Save Locally" : "Save & Upload"}
          </button>
          <button
            onClick={() => navigate("/offline-sharing")}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
