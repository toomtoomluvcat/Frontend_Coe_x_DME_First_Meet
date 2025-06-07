"use client"

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Teams } from "@/types/team";
import { useEffect, useState } from "react";
import Coe_footer from "@/components/coe_footer";


export default function Landign() {
    const { data: session, status } = useSession();
    const [problem, setProblem] = useState<{ ID: number, Title: string, Problem: string, ImgUrl: string }>()
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [showProblem, setShowProblem] = useState<boolean>(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn('google')
        }
    }, [])
    const getProblem = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!session) {
            signIn('google')
            return
        }
        const formData = {
            Code: code
        }
        try {
            const res = await axios.post("https://landing-coe-x-dme.onrender.com/problem", formData)
            setProblem(res.data)
            setShowProblem(true)

        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="bg-white font-sarabun [background:linear-gradient(180deg,rgba(253,188,152,1)_0%,rgba(255,243,230,1)_35%)] min-h-screen pb-10  relative flex flex-col">
            <div className="max-w-[600px] flex flex-col items-center pt-12 px-4 mx-auto  grow">
                <div className="flex mx-auto justify-center items-center mb-8">
                    <Image src={"/landing/01.svg"} className="w-12 sm:w-16" height={500} quality={100} width={500} alt='logo'></Image>
                    <h1 className="text-center font-bold text-[#880000] text-wrap sm:text-[2em] text-[1.3em]">CoE_x_DME_First_Meet</h1>
                </div>
                <hr className=" border border-[#880000] w-[60vw] mb-8" />

                {showProblem ? <div className="w-full">
                    <div className="border-2 border-[#006600] bg-[#EEFFEE] w-full pb-6 ">
                        <h1 className="bg-[#99CC66] text-[#006600] p-2">{problem?.Title}</h1>
                        <div className="p-2 text-[0.8em]">{problem?.Problem}</div>
                        <Image src={problem?.ImgUrl ?? ""} className="mx-auto h-48 w-auto" width={500} height={500} quality={100} alt="problem"></Image>
                    </div>
                    <button type="submit" onClick={() => setShowProblem(false)} className="text-[0.9em] text-[#FFF2EB] bg-[#880000] w-fit px-4 mx-auto px-2 py-1 mt-4 flex justify-center rounded-[5px]">กลับไปกรอกโค้ด</button>
                </div> :
                    <form className="flex flex-col gap-y-4" onSubmit={(e) => getProblem(e)}>
                        <Image src={'/GIF/hutao.gif'} className="mx-auto h-24 w-auto" width={200} height={200} quality={100} alt="hutao"></Image>
                        <label className="text-[#880000] font-bold">กรอกโค้ดที่ได้มาจากพี่ๆ ในฐานนั้นๆ</label>
                        <input type="text" className="focus:outline-none border-2 border-[#880000] px-2 py-1 text-[#880000]" value={code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)} />
                        <button type="submit" className="text-[0.9em] text-[#FFF2EB] bg-[#880000] w-fit px-4 mx-auto px-2 py-1 rounded-[5px]" disabled={loading}>{loading ? "กำลังส่ง" : "ยืนยัน"}</button>
                    </form>}
            </div>
            <Coe_footer />
        </div>
    );
}
