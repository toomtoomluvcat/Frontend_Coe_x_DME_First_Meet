import Link from 'next/link'
import React from 'react'

function Coe_footer() {
    return (
        <div><footer className="flex justify-center text-[0.8em] mt-4 border-t border-[#880000] text-[#880000]">
            <Link href='/landing'> <div className="px-2 py-[1px] border border-[#880000]">Join Team</div></Link>
            <Link href='/team'><div className="px-2 py-[1px] border border-[#880000]">Team List</div></Link>
            <Link href='/#'><div className="px-2 py-[1px] border border-[#880000]">Rule</div></Link>
            <Link href='/#'> <div className="px-2 py-[1px] border border-[#880000]">Contact</div></Link>
            <Link href='/challengs'><div className="px-2 py-[1px] border border-[#880000]">Game</div></Link>
        </footer></div>
    )
}

export default Coe_footer