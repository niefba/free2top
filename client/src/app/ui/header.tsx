'use client'

import Image from "next/image";
import free2top from '../../../public/free2top.svg'
import { usePathname } from 'next/navigation'


export function Header() {
    const pathname = usePathname()
    console.log(pathname)
    return (
        pathname !== '/' &&
        <div className="flex flex-row items-center bg-black p-2">
            <Image
                    className="invert justify-center"
                    src={free2top}
                    alt="Free2Top logo"
                    width={45}
                    priority
                    />
            <span className="text-white">Free2Top</span>
        </div>
    )
}
