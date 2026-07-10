import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import {
  LuCode,
  LuFileCode2,
  LuMessageSquare,
  LuMonitor,
  LuRocket,
  LuSend,
  LuX,
} from "react-icons/lu";
import { AnimatePresence, motion } from "motion/react";
import CodeEditor from "@monaco-editor/react";
const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const iframeRef = useRef(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const thinkingSteps = [
    "Understanding Your request...",
    "Planning layout changes...",
    "Improving responsiveness...",
    "Applying animations...",
    "Finalizing update",
  ];
  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(`${serverUrl}/website/get-by-id/${id}`, {
          withCredentials: true,
        });
        console.log(result.data.data);
        setWebsite(result.data.data);
        setCode(result.data.data.latestCode);
        setMessages(result.data.data.conversation);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    handleGetWebsite();
  }, [id]);

  useEffect(() => {
    if (!iframeRef || !code) {
      return;
    }
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;
    return () => URL.revokeObjectURL(blob);
  }, [code]);

  useEffect(() => {
    const steps = setInterval(() => {
      setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1200);

    return () => clearInterval(steps);
  }, [updateLoading]);
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  };
  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black white">
        <div>Loading...</div>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (!prompt) return;
    setUpdateLoading(true);
    const text = prompt;
    setPrompt("");
    setMessages((m) => [...m, { role: "user", content: prompt }]);
    try {
      const result = await axios.post(
        `${serverUrl}/website/update/${id}`,
        { prompt: text },
        { withCredentials: true },
      );
      console.log(result);
      setMessages((m) => [...m, { role: "ai", content: result.data.message }]);
      setCode(result.data.code);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeploy = async () => {
    try {
      const result = await axios.get(`${serverUrl}/website/deploy/${id}`, {
        withCredentials: true,
      });
      console.log(result.data);
      console.log(result.data.url);
      window.open(`${result.data.url}`, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const Header = ({ onClose }) => {
    return (
      <div className="h-14 px-4 items-center flex justify-between border-b border-white/10">
        <span className="font-semibold truncate">{website.title}</span>
        {onClose && (
          <button onClick={onClose}>
            <LuX size={18} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="hidden lg:flex w-95 flex-col border-r border-white/10 bg-black/80">
        <Header />
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => {
              return (
                <div
                  key={i}
                  className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black" : "bg-white/5 border-white/10 border text-zinc-200"}`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}

            {updateLoading && (
              <div className="max-w-[85%] mr-auto">
                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                  {thinkingSteps[thinkingIndex]}
                </div>
              </div>
            )}
          </div>
          <div
            className="p-3
             border-t border-white/20"
          >
            <div className="flex gap-2">
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                name=""
                id=""
                placeholder="Describe Changes..."
                className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
              />
              <button
                onClick={handleUpdate}
                className="px-4 py-3 rounded-2xl bg-white text-black"
                disabled={updateLoading}
              >
                <LuSend size={14} />
              </button>
            </div>
          </div>
        </>
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center borderb border-white/10 bg-black/80 ">
          <span className="text-xs text-zinc-400">Live Preview</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleDeploy();
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
            >
              <LuRocket size={14} /> Deploy
            </button>
            <button onClick={() => setShowChat(true)} className="p-2 lg:hidden">
              <LuMessageSquare size={18} />
            </button>
            <button onClick={() => setShowCode(true)} className="p-2">
              <LuCode size={18} />
            </button>
            <button onClick={() => setShowFullPreview(true)} className="p-2">
              <LuMonitor size={18} />
            </button>
          </div>
        </div>
        <iframe
          sandbox="allow-scripts allow-same-origin allow-forms"
          ref={iframeRef}
          className="flex-1 w-full bg-white"
        />
      </div>

      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-200 bg-[#1e1e1e] flex flex-col"
          >
            <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
              <span className="text-sm font-medium">index.html</span>
              <button onClick={() => setShowCode(false)}>
                <LuX size={18} />
              </button>
            </div>
            <CodeEditor
              theme="vs-dark"
              value={code}
              language="html"
              onChange={(v) => setCode(v)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFullPreview && (
          <motion.div className="fixed inset-0 z-200 bg-black">
            <iframe
              sandbox="allow-scripts allow-same-origin allow-forms"
              className="w-full h-full bg-white"
              srcDoc={code}
            />
            <button
              onClick={() => setShowFullPreview(false)}
              className="absolute top-4 right-4 p-2 bg-black/70 rounded-lg"
            >
              <LuX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed inset-0 bg-black flex flex-col z-200"
          >
            <Header onClose={() => setShowChat(false)} />
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((m, i) => {
                  return (
                    <div
                      key={i}
                      className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}
                    >
                      <div
                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black" : "bg-white/5 border-white/10 border text-zinc-200"}`}
                      >
                        {m.content}
                      </div>
                    </div>
                  );
                })}

                {updateLoading && (
                  <div className="max-w-[85%] mr-auto">
                    <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                      {thinkingSteps[thinkingIndex]}
                    </div>
                  </div>
                )}
              </div>
              <div
                className="p-3
             border-t border-white/20"
              >
                <div className="flex gap-2">
                  <textarea
                    onChange={(e) => setPrompt(e.target.value)}
                    value={prompt}
                    name=""
                    id=""
                    placeholder="Describe Changes..."
                    className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"
                  />
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-3 rounded-2xl bg-white text-black"
                    disabled={updateLoading}
                  >
                    <LuSend size={14} />
                  </button>
                </div>
              </div>
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
