'use client'
import Image from "next/image";
import Link from "next/link";
import { signout } from "@/app/actions/auth";

export function Header() {
    return (
        <div className="flex flex-row items-center bg-black p-2">
            <Link href="/" className="flex flex-row items-center">
                <Image
                        className="invert justify-center"
                        src="/free2top.svg"
                        alt="Free2Top logo"
                        width={45}
                        height={45}
                        priority
                        />
                <span className="text-white">Free2Top</span>
            </Link>
            <button onClick={() => signout()} className="absolute right-2 text-white">Sign out</button>
        </div>
    )
}
