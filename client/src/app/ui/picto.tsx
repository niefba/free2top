'use client'

import Image from "next/image";
import { WINTER_CATEGORIES } from "@/app/lib/constants"

export function Picto({category, large=false}: {category: string, large?:boolean}) {
    const isWinter = WINTER_CATEGORIES.includes(category)
    const color = isWinter ? 'bg-sky-500' : 'bg-green-600'
    const altText = isWinter ? 'Hiver' : 'Été'
    const size = large ? 35 : 25
    return (
        <span className={`mr-2 ${color} rounded-full inline-block align-middle`}>
            <Image
                className="invert rounded-full"
                src="/free2top.svg"
                alt={altText}
                width={size}
                height={size}
                priority
                />
        </span>
    )
}