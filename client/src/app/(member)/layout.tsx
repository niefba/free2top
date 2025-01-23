import { Header } from '@/app/ui/header'

export default function MemberLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
            <Header></Header>
            <div className='flex justify-center m-2'>
                {children}
            </div>
        </section>
    ) 
  }
  