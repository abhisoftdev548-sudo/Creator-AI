import { signInWithPopup } from "firebase/auth";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { auth, provider } from "../lib/firebase";
import axios from 'axios'
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const AuthPopup = ({ onClose }) => {
  const dispatch = useDispatch()
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result)
      const data = await axios.post(`${serverUrl}/auth/google-auth`, {
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL
        }, {withCredentials: true})
        dispatch(setUserData(data.data.data))
        onClose()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 w-full h-full flex items-center justify-center bg-black/90 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative rounded-3xl bg-linear-120 from-purple-500/40 via-blue-500/30 to-transparent max-w-md w-full"
        >
          <div className=" w-full relative rounded-3xl bg-[#0b0b0b] border px-12 py-5 border-white/10 shadow-xl">
            <button
              className="absolute top-5 right-5 py-1 px-2 rounded-lg bg-white/5"
              onClick={onClose}
            >
              X
            </button>
            <div className="px-8 pt-14 pb-10  text-center relative w-full">
              <h1 className="py-1.5 px-6 rounded-full bg-white/5">
                AI - Powered Website Builder
              </h1>
              <h2 className="flex items-center w-full gap-2 text-2xl leading-tight space-x-2 mt-6 justify-center">
                {" "}
                <span>Welcome To</span>
                <span className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-bold">
                  Creator.AI
                </span>
              </h2>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="py-2 w-full flex items-center gap-5 px-5 bg-white rounded-xl text-black mt-6 font-semibold"
                onClick={handleGoogleAuth}
              >
                <img
                  src="https://imgs.search.brave.com/V4RpNPmKOODzGwegK5fC4T8mpdAa6woC_Ns7OkWxy0g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdvb2dsZS1sb2dv/LWljb24tc3ZnLWRv/d25sb2FkLXBuZy02/NzU4MjcucG5nP2Y9/d2VicCZ3PTEyOA"
                  className="h-8 w-8"
                  alt=""
                />{" "}
                Continue With Google
              </motion.button>
              <div className=" mt-6 flex items-center gap-2 text-zinc-500">
                <div className="h-px bg-white/10 flex-1"></div>
                Secure Login
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <p className="mt-6 text-xs text-zinc-500">
                By Continuing, you agree to our{" "}
                <span className="underline cursor-pointer hover:text-zinc-300 transition-all duration-200">
                  Terms of Services
                </span>{" "}
                and{" "}
                <span className="underline cursor-pointer hover:text-zinc-300  transition-all duration-200">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthPopup;
