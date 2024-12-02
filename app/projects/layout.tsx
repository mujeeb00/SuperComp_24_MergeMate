import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">MergeMate</Link>
              <div className="space-x-4">
              <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
                <Button variant="ghost" asChild>
                  <Link href="/projects">Projects</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/add-project">Add Project</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}

