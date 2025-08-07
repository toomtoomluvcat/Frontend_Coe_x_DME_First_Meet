"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Teams } from "@/types/team";
import { useEffect, useState } from "react";
import Coe_footer from "@/components/coe_footer";
import ClickSpark from "@/components/ClickSpark";


export default function Landign() {
  const { data: session, status } = useSession();
  const [showSuggestion, setShowsuggestiom] = useState<boolean>(true);
  const [joinTeam, setJoinTeam] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<Teams[]>([]);
  const [showInfo, setShowInfo] = useState<string>("");

  const getAllTeam = async (): Promise<void> => {
    try {
      const res = await axios.get(
        "https://landing-coe-x-dme.onrender.com/team"
      );
      // console.log(res.data)
      setTeamData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTeam();
  }, []);

  const chaneInfo = (email: string): void => {
    if (showInfo === email) {
      setShowInfo("");
    } else {
      setShowInfo(email);
    }
  };

  return (
    <div className="bg-white font-sarabun [background:linear-gradient(180deg,rgba(253,188,152,1)_0%,rgba(255,243,230,1)_35%)] min-h-screen pb-10  relative flex flex-col">
      <div className="max-w-[600px] flex flex-col items-center pt-12 px-4 mx-auto  grow">
        <div className="flex mx-auto justify-center items-center mb-8">
          <Image
            src={"/landing/01.svg"}
            className="w-12 sm:w-16"
            height={500}
            quality={100}
            width={500}
            alt="logo"
          ></Image>
          <h1 className="text-center font-bold text-[#880000] text-wrap sm:text-[2em] text-[1.3em]">
            CoE_x_DME_First_Meet
          </h1>
        </div>
        <hr className=" border border-[#880000] w-[60vw] mb-8" />
        <div className="w-full  space-y-4">
          {teamData.map((item) => (
            <div key={item.ID} className="text-white border border-[#5599AA] ">
              <div className="flex px-2 py-1 bg-[#5599AA] items-center justify-between">
                <h1 className="font-bold">{item.Name}</h1>
              </div>
              <div className="bg-[#EEFFFF]  p-4 space-y-3 ">
                {item.Joins.map((user) => (
                  <div key={user.ID}>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-x-2   items-center">
                        <Image
                          className="w-6 h-6 rounded-full"
                          src={user.Profile}
                          width={100}
                          height={100}
                          quality={100}
                          alt={String(user.ID)}
                        ></Image>
                      <h3
                        className={`hover:underline ${user.Rainbow ? "text-rainbow animate-rainbow" : "text-black"}`}
                      >
                        @{user.UserName === "" ? user.Email.split("@")[0] : user.UserName}
                      </h3>

                      </div>
                      <svg
                        onClick={() => chaneInfo(user.Email)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#00000"
                        viewBox="0 0 256 256"
                      >
                        <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z"></path>
                      </svg>
                    </div>
                    {showInfo === user.Email && (
                      <div className="mt-2 font-normal text-[0.8em] text-black ">
                        <p className=" text-gray-600">{user.Description}</p>
                        <p className="">
                          FaceBook:{" "}
                          <span className=" text-gray-600 hover:underline">
                            <a href={user.Link_1} target="blank">
                              {user.Link_1 !== "" ? user.Link_1 : "-"}
                            </a>
                          </span>
                        </p>
                        <p className="">
                          Instagram:{" "}
                          <span className=" text-gray-600">
                            <a href={user.Link_2} target="blank">
                              {user.Link_2 !== "" ? user.Link_2 : "-"}
                            </a>
                          </span>
                        </p>
                        <p className="">
                          other:{" "}
                          <span className=" text-gray-600">
                            <a href={user.Link_1} target="blank">
                              {user.Link_3 !== "" ? user.Link_3 : "-"}
                            </a>
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Coe_footer />
    </div>
  );
}
