'use server'

import Image from "next/image";
import Link from "next/link";

import { getUserName } from '@/app/lib/dal'

export async function Header() {
    const userName = getUserName()
    return (
        <div className="flex flex-row items-center p-2">
            <Link href="/" className="flex flex-row items-center">
                <Image
                        className="dark:invert justify-center"
                        src="/free2top.svg"
                        alt="Free2Top logo"
                        width={45}
                        height={45}
                        priority
                        />
                <span className="dark:text-white">Free2Top</span>
            </Link>
            <div className="absolute right-2">
                <span>{userName}</span>
                <Link className="btn" href="/signout" prefetch={false}>Sign out</Link>
            </div>
        </div>
    )
}
