import Link from 'next/link'
import React from 'react'

function Coe_footer() {
    return (
        <div className='w-full'><footer className="flex justify-center items-center text-[0.8em] mt-4 border-t border-[#880000] text-[#880000]">
            <Link href='/landing'> <div className="px-2 py-[1px] border border-[#880000]">Join</div></Link>
            <Link href='/team'><div className="px-2 py-[1px] border border-[#880000]">Team</div></Link>
            <Link href='/profile'><div className="px-2 h-full py-[1px] border border-[#880000]">profile</div></Link>
            <Link href='/#'> <div className="px-2  h-full py-[1px] border border-[#880000]">Contact</div></Link>
            <Link href='/challenges'><div className="px-2 h-full py-[1px] border border-[#880000]">Game</div></Link>
        </footer></div>
    )
}

export default Coe_footer