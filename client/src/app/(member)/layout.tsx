import { Header } from '@/app/ui/header'

export default function MemberLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
            <Header></Header>
            {children}
        </section>
    ) 
  }
  