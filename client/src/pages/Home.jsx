import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AuthPopup from "../components/AuthPopup";
import { useDispatch, useSelector } from "react-redux";
import { LuCoins } from "react-icons/lu";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [openAuthPopup, setopenAuthPopup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userData);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log(error);
    }
  };
  const heighlights = [
    {
      head: "Build Responsive Layouts",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor adipisci, laboriosam laborum magnam fugiat ratione iusto fuga accusamus.",
    },
    {
      head: "Production Ready Output",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor adipisci, laboriosam laborum magnam fugiat ratione iusto fuga accusamus.",
    },
    {
      head: "AI Generated Code",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor adipisci, laboriosam laborum magnam fugiat ratione iusto fuga accusamus.",
    },
  ];
  return (
    <div className="relative h-screen w-full bg-black/90 overflow-y-auto">
      <div className="h-60 w-60 rounded-full fixed  top-1/2 left-1/4 bg-linear-60 from-blue-500 to-purple-500 blur-2xl opacity-60 animate-pulse"></div>
      <div className="h-60 w-60 rounded-full fixed  top-1/6 left-[60%] bg-linear-60 from-blue-500 to-purple-500 blur-2xl opacity-60 animate-pulse"></div>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-black/40"
      >
        <div className="max-w-7xl mx-auto p-5 flex items-center justify-between">
          <div className="text-xl font-semibold">Creator.ai</div>

          <div className="flex items-center gap-5">
            <div
              className="hidden md:inline text-sm text-zinc-400 hover:text-white"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </div>
            {userData && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                <LuCoins className="text-yellow-400" size={14} />
                <span className="text-zinc-300">Credits</span>
                <span>{userData?.credits}</span>
                <span
                  className="font-semibold"
                  onClick={() => navigate("/pricing")}
                >
                  +
                </span>
              </div>
            )}
            {!userData ? (
              <button
                className="px-5 py-2 rounded-md hover:bg-white/10"
                onClick={() => {
                  setopenAuthPopup(!openAuthPopup);
                }}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={
                      userData?.avatar ||
                      `https://ui-avatars.com/api/?name=${userData?.name}`
                    }
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium  truncate">
                            {userData.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}
                          </p>
                        </div>
                        <button className="md:hidden w-full px-4 py-3 flex items-center text-sm border-b border-white/10 hover:bg-white/5 gap-2">
                          <LuCoins className="text-yellow-400" size={14} />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData?.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>
                        <button
                          className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
                          onClick={() => navigate("/dashboard")}
                        >
                          Dashboard
                        </button>
                        <button
                          className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <section className="py-32 flex items-center justify-center flex-col">
        <div className="h-30 w-full"></div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-1 pt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-5 font-black justify-center text-center"
        >
          <span className="text-center">BUILD CREATIVE WEBSITE</span>
          <span>
            {" "}
            WITH{" "}
            <span className="bg-linear-60 from-blue-500 to-purple-500 bg-clip-text text-transparent">
              CREATOR.AI
            </span>
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center  text-sm md:text-lg max-w-md px-5 md:max-w-xl mx-auto mt-10 text-white/40"
        >
          Describe you idea and let AI generate a modern, responsive,
          production-ready website.
        </motion.p>
        <button
          className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12"
          onClick={() => {
            userData ? navigate("/dashboard") : setopenAuthPopup(true);
          }}
        >
          {userData ? "Go to Dashboard" : "Get Started"}
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {heighlights.map((data, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="rounded-xl bg-white/5 border border-white/10 p-8"
              >
                <h2 className="text-xl font-semibold mb-5">{data.head}</h2>
                <p className="text-sm text-zinc-400">{data.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
      <footer className="py-5 text-center text-sm text-zinc-400">
        &copy; {new Date().getFullYear()} Creator.AI
      </footer>

      {openAuthPopup && (
        <AuthPopup
          onClose={() => {
            setopenAuthPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
