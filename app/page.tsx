"use client";
import { signIn, useSession } from "next-auth/react";
import { motion, LayoutGroup } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import ClickSpark from "@/components/ClickSpark";
import Magnet from "@/components/Magnet";
import { useRef, useState, useEffect } from "react";
import { HyperText } from "@/components/magicui/hyper-text";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [count,setCount] =useState<number>()

  useEffect(() => {
    const get_profile = async (): Promise<void> => {
      try {
        const res = await axios.get("https://landing-coe-x-dme.onrender.com/profile");
        const imgMap =res.data.avatar.map((url: string)=>({imageUrl:url}))
        setCount(res.data.count)
        setAvatars(imgMap);
      } catch (error) {
        console.log(error);
      }
    };
    get_profile();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const [avatars, setAvatars] = useState<{ imageUrl: string }[]>([
   
  ]);

  return (
    <div
      className="font-roboto"
      style={{ width: "100%", height: "600px", position: "relative" }}
    >
      <ClickSpark
        sparkColor="#000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <RetroGrid />
        </motion.div>
        <SmoothCursor />

        <div className="absolute w-full px-14 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <div className="flex mt-16 flex-col gap-y-[15px] items-center">
            {/* Gentle float animation for avatars */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={
                isLoaded
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {}
              }
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AvatarCircles numPeople={count} avatarUrls={avatars ?? []} />
              </motion.div>
            </motion.div>

            {/* Title with subtle glow effect */}
            <motion.div
              className="flex items-center gap-x-[15px] font-bold justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.span
                className="md:text-[3em] sm:text-[2.5em] text-[2.3em] font-bold text-center md:max-w-screen sm:max-w-[300px] max-w-[200px]  bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ff1744 50%, #e91e63 75%, #9c27b0 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255, 107, 53, 0.3))",
                }}
              >
                CoE x DME First Meet
              </motion.span>
            </motion.div>

            {/* Enhanced description and button with subtle effects */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 25 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <TextAnimate
                  animation="blurInUp"
                  by="character"
                  once
                  className="text-center mb-4 text-[#595858] text-[0.8em] sm:text-[1em] max-w-[490px] mx-auto"
                >
                  Join the exciting CoE & DME freshmen welcome event at Khon
                  Kaen University on June 27th! Click below to show you're
                  interested.
                </TextAnimate>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  damping: 15,
                }}
              >
                {status === "unauthenticated" ? (
                  <Magnet padding={100} disabled={false} magnetStrength={5}>
                    <InteractiveHoverButton onClick={() => signIn("google")}>
                      Count Me In
                    </InteractiveHoverButton>
                  </Magnet>
                ) : (
                  <HyperText>
                    {`Hello  ${
                      session?.user.name?.split(" ")[0] ?? "notfound"
                    }`}
                  </HyperText>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </ClickSpark>
    </div>
  );
}
