import Link from 'next/link'

export function LinkButton({href, children} : {href:string, children: string}) {
    
    return (
    <Link className='mx-2 appearance-none px-4 py-2 rounded-full border border-solid border-zinc-400 hover:bg-stone-100 hover:border-transparent dark:hover:bg-stone-700 dark:border-zinc-600'
        href={href}>
        {children}
    </Link>
    )
}