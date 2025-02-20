'use client'

import Image from "next/image";
import {SigninForm} from './ui/signin-form'
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        
        <Image
          className="dark:invert justify-center"
          src="/free2top.svg"
          alt="Free2Top logo"
          width={180}
          height={180}
          priority
        />
        
        <SigninForm></SigninForm>

        <Link href={"/signup"}
          className='appearance-none px-4 py-2 rounded-full hover:bg-stone-100 font-bold text-sky-500 dark:hover:bg-stone-700'>
            Devenir membre
        </Link>
      
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Next.js
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://cas-diablerets.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Club Alpin Suisse - Diablerets
        </a>
      </footer>
    </div>
  );
}
