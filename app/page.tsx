"use client";

import Link from "next/link";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { signIn } from "next-auth/react";
import Magnet from "@/components/Magnet";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { useEffect,useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ClickSpark from "@/components/ClickSpark";

export default function RetroGridDemo() {
  const { data: session, status } = useSession();
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState<number>();

  useEffect(() => {
    const get_profile = async (): Promise<void> => {
      try {
        const res = await axios.get(
          "https://landing-coe-x-dme.onrender.com/profile"
        );
        const imgMap = res.data.avatar.map((url: string) => ({
          imageUrl: url,
        }));
        setCount(res.data.count);
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

  const [avatars, setAvatars] = useState<{ imageUrl: string }[]>([]);
  return (
    <div className="relative flex w-full h-[900px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <ClickSpark
  sparkColor='#000'
  sparkSize={20}
  sparkRadius={15}
  sparkCount={8}
  duration={400}
>
      <SmoothCursor />
      <RetroGrid />
      <div className="flex flex-col items-center h-full justify-center">
      <AvatarCircles numPeople={count} avatarUrls={avatars} />
      <span className="pointer-events-none mt-4 z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
        CoE x DME First Meet
      </span>
      <p className="mt-8 z-11 text-zinc-600 md:max-w-[800px] text-xl px-6 text-center">Join the exciting CoE & DME freshmen welcome event at Khon Kaen University on August 9th! Click below to show you're interested.</p>  
      
      {/*button under */}
       <div className="mt-8">
        {status === "unauthenticated" ? (
                  <Magnet padding={100} disabled={false} magnetStrength={5}>
                    <InteractiveHoverButton onClick={() => signIn()}>
                      Count Me In
                    </InteractiveHoverButton>
                  </Magnet>
                ) : (
                  <button className="mt-6">
                    <Link
                      style={{
                        background:
                          "linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ff1744 50%, #e91e63 75%, #9c27b0 100%)",
                        backgroundSize: "200% 200%",
                        animation: "gradientShift 3s ease infinite",
                        filter:
                          "drop-shadow(0 8px 25px rgba(255, 107, 53, 0.4))",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      className="
    relative overflow-hidden
    px-6 py-3 
    text-[1.1em]  text-white 
    rounded-xl
    transform hover:scale-105 hover:shadow-2xl
    active:scale-95
    cursor-pointer
    border border-white/20
    backdrop-blur-sm
    group
  "
                      href="/landing"
                    >
                      <span className="relative z-10 tracking-wide">
                        Let's go
                      </span>

                      {/* Shine effect overlay */}
                      <div
                        className="
    absolute inset-0 
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    transform -skew-x-12 -translate-x-full
    group-hover:translate-x-full
    transition-transform duration-700 ease-out
  "
                      ></div>

                      {/* Inner glow */}
                      <div
                        className="
    absolute inset-0.5 
    bg-gradient-to-r from-white/10 to-transparent 
    rounded-xl
    opacity-0 group-hover:opacity-100
    transition-opacity duration-300
  "
                      ></div>
                    </Link>
                  </button>
                )}
                </div>
                </div>

  {/* Your content here */}
</ClickSpark>
      </div>
  );
}
