import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Footer } from "./components/footer";
import { CARDS } from "./consts/cards";
import { LearnMore } from "./components/learn-more";

export default function Home() {
  return (
    <>
      <main className="bg-[#FAFAFA] w-full relative">
        {/* Central container with flex to create two columns */}
        <div className="w-full bg-white max-w-[75rem] mx-auto flex flex-col lg:flex-row border-l border-r border-[#F2F2F2] relative z-10">
          
          {/* Left Content Section */}
          <div className="pt-[10rem] flex-1 p-10 border-b border-[#F2F2F2] lg:border-b-0">
            <h1 className="text-5xl font-bold tracking-tight text-[#131316]">
              MergeMate
            </h1>
            <p className="text-[#5E5F6E] pt-3 pb-6 max-w-[30rem] text-[1.0625rem]">
              A simple and powerful Next.js Open-Source Contributor Platform.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                >
                  Dashboard
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="flex-1 p-10">
            <LearnMore cards={CARDS} />
          </div>
        </div>

        {/* Gradient background */}
        <div className="absolute left-0 right-0 bottom-0 h-[18.75rem] bg-gradient-to-t from-white to-[#F6F8FA]" />
      </main>
      <Footer />
    </>
  );
}
