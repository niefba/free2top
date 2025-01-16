import { SignupForm } from "@/app/ui/signup-form";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center max-w-48">
                <div className="flex flex-row items-center">
                    <Image
                        className="dark:invert"
                        src="/free2top.svg"
                        alt="Free2Top logo"
                        width={45}
                        height={45}
                        priority
                    />
                    <span>Free2Top</span>
                </div>
        
                <SignupForm></SignupForm>

                <Link href={"/"}
                    className='appearance-none px-4 py-2 rounded-full hover:bg-stone-100 font-bold text-sky-500 dark:hover:bg-stone-700'>
                    Déjà membre ?
                </Link>
            </main>
        </div>
    )
}