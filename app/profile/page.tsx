"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Coe_footer from "@/components/coe_footer";
import Link from "next/link";

interface ProfileForm {
  Email: string;
  UserName: string;
  Profile: string;
  Description: string;
  Link_1: string;
  Link_2: string;
  Link_3: string;
}

export default function Profile() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState<ProfileForm>({
    Email: session?.user?.email ?? "",
    UserName: "",
    Profile: "",
    Description: "",
    Link_1: "",
    Link_2: "",
    Link_3: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetProfile = async () => {
    const formData = {
      Email: session?.user.email,
    };
    try {
      const res = await axios.post(
        "https://landing-coe-x-dme.onrender.com/profile",
        formData
      );
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user.email) {
      handleGetProfile();
    } else if (status === "unauthenticated") {
      signIn("google");
    }
  }, [status]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    if (!form.Email) {
      setMessage({ text: "Email is required", error: true });
      return;
    }

    const cleanUserName = form.UserName.startsWith("@")
      ? form.UserName.slice(1)
      : form.UserName;

    const payload = {
      ...form,
      UserName: cleanUserName,
    };

    try {
      const res = await axios.put(
        "https://landing-coe-x-dme.onrender.com/profile",
        payload
      );
      setMessage({ text: "อัพเดตโปรไฟล์เสร็จสิ้น", error: false });
    } catch (error) {
      setMessage({ text: "Network error, try again later", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen [background:linear-gradient(180deg,rgba(253,188,152,1)_0%,rgba(255,243,230,1)_35%)] font-sarabun text-sm text-[#380000] flex items-center flex-col justify-center pt-6 px-4">
      <div className="flex mx-auto justify-center items-center mb-4">
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
      <div className="w-full max-w-xl border h-fit border-[#880000] pb-4 bg-[#FFF2EB] ">
        <header className="mb-2 flex items-center space-x-3  text-[#FFF2EB] bg-[#880000]">
          <h1 className="text-[1.1em] py-1 px-2 font-bold">
            กรอกข้อมูลโปรไฟล์
          </h1>
        </header>
        <Image
          className="w-20 mx-auto rounded-full mt-4 mb-2 border-2 border-[#880000]"
          src={session?.user.image ?? "/default-profile.png"}
          width={200}
          quality={100}
          height={200}
          alt="profile"
        />
        <h2 className="text-center font-bold text-[1.3em] mb-4 text-[#880000]">
          {session?.user.name}
        </h2>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} spellCheck={false} className="px-4">
          <label htmlFor="UserName" className="block mb-1 font-semibold">
            User Name
          </label>
          <div className="mb-4 relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#880000] font-serif select-none">
              @
            </span>
            <input
              id="UserName"
              name="UserName"
              type="text"
              maxLength={255}
              value={form.UserName}
              onChange={handleChange}
              className="pl-6 w-full border border-[#880000] text-[#380000] px-2 py-1 text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#880000]"
            />
          </div>

          <label htmlFor="Description" className="block mb-1 font-semibold">
            Description
          </label>
          <input
            id="Description"
            name="Description"
            type="text"
            maxLength={1000}
            value={form.Description}
            onChange={handleChange}
            className="w-full border border-[#880000] resize-none text-[#380000] px-2 py-1 mb-4 text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#880000]"
          />

          <label htmlFor="Link_1" className="block mb-1 font-semibold">
            FaceBook Link
          </label>
          <input
            id="Link_1"
            name="Link_1"
            type="text"
            maxLength={255}
            value={form.Link_1}
            onChange={handleChange}
            className="w-full border border-[#880000]  text-[#380000] px-2 py-1 mb-4 text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#880000]"
          />

          <label htmlFor="Link_2" className="block mb-1 font-semibold">
            IG link
          </label>
          <input
            id="Link_2"
            name="Link_2"
            type="text"
            maxLength={255}
            value={form.Link_2}
            onChange={handleChange}
            className="w-full border border-[#880000]  text-[#380000] px-2 py-1 mb-4 text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#880000]"
          />

          <label htmlFor="Link_3" className="block mb-1 font-semibold">
            Other Link
          </label>
          <input
            id="Link_3"
            name="Link_3"
            type="text"
            maxLength={255}
            value={form.Link_3}
            onChange={handleChange}
            className="w-full border border-[#880000]  text-[#380000] px-2 py-1 mb-4 text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#880000]"
          />

          <button
            disabled={loading}
            type="submit"
            className="mt-4 bg-[#880000] h text-[0.8em] hover:bg-[#a50000] px-4 py-2 text-white font-semibold text-sm"
          >
            {loading ? "กำลังส่ง" : "ยืนยัน"}
          </button>
        </form>

        {message && (
          <p
            className={`px-4 mt-2 ${
              message.error ? "text-red-700" : "text-green-700"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
      <div className=" w-full">
        <footer className="flex justify-center items-center text-[0.8em] mt-4 border-t border-[#880000] text-[#880000]">
          <Link href="/landing">
            {" "}
            <div className="px-2 py-[1px] border border-[#880000]">Join</div>
          </Link>
          <Link href="/team">
            <div className="px-2 py-[1px] border border-[#880000]">Team</div>
          </Link>
          <Link href="/profile">
            <div className="px-2 h-full py-[1px] border border-[#880000]">
              profile
            </div>
          </Link>
          <Link href="/#">
            {" "}
            <div className="px-2  h-full py-[1px] border border-[#880000]">
              Contact
            </div>
          </Link>
          <Link href="/challengs">
            <div className="px-2 h-full py-[1px] border border-[#880000]">
              Game
            </div>
          </Link>
        </footer>
      </div>
    </div>
  );
}
