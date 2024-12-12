'use client'

import Image from "next/image";
import { usePathname } from 'next/navigation'
import Link from "next/link";


export function Header() {
    const pathname = usePathname()
    
    return (
        pathname !== '/' &&
        <div className="flex flex-row items-center bg-black p-2">
            <Link href="/" className="flex flex-row items-center">
                <Image
                        className="invert justify-center"
                        src="free2top.svg"
                        alt="Free2Top logo"
                        width={45}
                        height={45}
                        priority
                        />
                <span className="text-white">Free2Top</span>
            </Link>
        </div>
    )
}
