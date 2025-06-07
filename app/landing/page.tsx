"use client"

import axios, { AxiosError, isAxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Landign() {
    const { data: session, status } = useSession();
    const [showSuggestion, setShowsuggestiom] = useState<boolean>(true)
    const [joinTeam, setJoinTeam] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const [showError, setShowError] = useState<string>('')
    const [attempCount, setAttempCount] = useState<number>(0)
    const [submit, setSubmit] = useState<boolean>(false)
    const [groupName, setGroupName] = useState<string>('')


    const joinTeamByCode = async (): Promise<void> => {

        setSubmit(true)
        if (code.includes("<")) {
            alert('โอ้ยยยยย จะแตกแล้วพี่จ๋า 🤯')
            setSubmit(false)
            return
        }
        const attemp = attempCount + 1
        setAttempCount(attemp)
        if (!session) {
            signIn('google')
            return
        }
        const formData = {
            Email: session?.user.email,
            Code: code
        }
        try {
            const res = await axios.put("http://localhost:8000/team", formData)
            setGroupName(res.data.Name)
            setJoinTeam(true)

        } catch (err) {
            if (isAxiosError(err) && err.response?.status === 404) {
                switch (attemp) {
                    case 1:
                        setShowError("โค้ดของทีมไม่ตรง ลองเช็คโค้ดดีๆ นะ 🤓")
                        break
                    case 2:
                        setShowError('ก็ยังไม่ถูกอยู่ดี พี่ๆ ช่วยเช็คโค้ดให้หน่อย 🥵')
                        break
                    case 3:
                        setShowError("อันนี้ใส่รหัสผิดหรือจะ Injection เว็บพี่กันนะ  🤔?")
                        break
                    case 4:
                        setShowError('ยังไม่หยุดอีกหรอ เดิ๋ยวจะโดนดีนะ ถ้าแน่ก็เข้ามาเลย! 😤')
                        break
                    default:
                        setSubmit(true)
                        try {
                            const res = await axios.get('https://api.ipify.org?format=json')
                            setShowError("ip: " + res.data.ip)

                        } catch (err) {
                            console.log(err)
                        }
                        break

                }

            }
        } finally {
            setSubmit(false)
        }
    }

    return (
        <div className="bg-white font-sarabun [background:linear-gradient(180deg,rgba(253,188,152,1)_0%,rgba(255,243,230,1)_35%)] min-h-screen pb-10  relative flex flex-col">
            <div className="max-w-[700px] pt-12 px-4 mx-auto  grow">
                <div className="flex mx-auto justify-center items-center mb-8">
                    <Image src={"/landing/01.svg"} className="w-12 sm:w-16" height={500} quality={100} width={500} alt='logo'></Image>
                    <h1 className="text-center font-bold text-[#880000] text-wrap sm:text-[2em] text-[1.3em]">CoE_x_DME_First_Meet</h1>
                </div>

                {showSuggestion && <div className="mb-8  sm:mx-4 mx-0 border border-[#880000] ">
                    <div className="py-2 px-4 bg-[#880000] text-white flex justify-between items-center">
                        <h3 className=" text-[0.6em] sm:text-[0.8em]">งาน Coe x DME First Meet คืออะไร</h3>
                        <p className="text-[0.7em] sm:text-[1em]" onClick={() => setShowsuggestiom(false)}>x</p>
                    </div>
                    <h2 className="bg-[#FFF2EB] px-4 py-4 text-[#880000] sm:text-[0.8em] text-[0.7em]  font-thin indent-[20px] text-justify">งาน CoE x DME First Meet เป็นกิจกรรมที่จัดขึ้นเพื่อให้นักศึกษาสาขา CoE และ DME ได้ทำความรู้จักกัน พูดคุย แลกเปลี่ยนประสบการณ์ และฝึกการทำงานเป็นทีม โดยจัดที่อาคารเพียรวิจิตร ชั้น 3 ห้อง EN16307
                        <br className="" />
                        <p>   แม้กิจกรรมนี้จะมีของที่ระลึกและส่งเสริมความสัมพันธ์ระหว่างเพื่อนและพี่ๆ ในสาขา แต่การไม่เข้าร่วมจะ ไม่ส่งผลต่อการเรียน หรือข้อกำหนดใดๆ ของคณะและมหาวิทยาลัย เป็นกิจกรรมเสริมที่มาแล้วอบอุ่นแน่นอน!</p></h2>
                </div>}
                <div className="max-w-[1040px] px-8 mx-auto flex flex-col items-center">
                    {(joinTeam && status == 'authenticated') ?
                        <div className="flex flex-col items-center gap-y-4">
                            <Image src={"/landing/02.svg"} className="w-40" height={800} quality={100} width={800} alt='happy_party'></Image>
                            <h2 className="font-medium text-[1.3em] text-[#880000]">กลุ่ม {groupName}</h2>
                            <p className="text-center font-normal max-w-[400px] mx-6 text-[1em] text-[#880000]">ยินดีต้อนรับเข้าสู่ทีม {groupName} กิจจะกรรมกำลังจะเริ่มเร็วๆ นี้ สามารถ <span className="text-[#204FC6] underline"><Link href={'/team'}>ตรวจสอบสมาชิกทีม</Link></span> และเมื่อเกมเริ่มขึ้น  <span className="text-[#204FC6] underline"><Link href={'/'}>ไปกันได้เลย</Link></span></p>

                        </div>
                        : <div className="flex flex-col">
                            <h2 className="font-normal text-center mb-4 text-[#880000]">กรอกรหัสของทีมด้านล่าง</h2>
                            <input placeholder="กรอกรหัสทีมของคุณ" value={code} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)} className="text-[#880000] w-[200px] mx-auto border-2 border-[#880000] focus:outline-none px-2 py-1" type="text" />
                            <button type="button" onClick={() => joinTeamByCode()} className="text-[#FFF2EB] w-fit rounded-[5px] text-[0.8em] mt-4 mx-auto py-2 px-8 bg-[#880000]" disabled={submit}>{submit ? "กำลังส่ง" : 'ยืนยัน'}</button>
                            <p className="text-center text-[0.9em] mt-2  text-[#880000]">{showError}</p>
                        </div>
                    }
                </div>
            </div>
            <footer className="flex justify-center text-[0.8em] mt-4 border-t border-[#880000] text-[#880000]">
                <Link href='/#'> <div className="px-2 py-[1px] border border-[#880000]">Dev</div></Link>
                <Link href='/#'><div className="px-2 py-[1px] border border-[#880000]">Rule</div></Link>
                <Link href='/#'><div className="px-2 py-[1px] border border-[#880000]">Team</div></Link>
                <Link href='/#'> <div className="px-2 py-[1px] border border-[#880000]">Contact</div></Link>
                <Link href='/#'><div className="px-2 py-[1px] border border-[#880000]">Game</div></Link>
            </footer>
        </div>
    );
}
