import { UserDetails } from "../components/user-details";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Footer } from "../components/footer";
import { UserStack } from "../components/user-stacks";
import Link from "next/link"; 

export default async function DashboardPage() {
  return (
    <>
      <main className="w-full min-h-screen bg-gray-900 text-gray-300">
        {/* Header */}
        <header className="flex items-center justify-between w-full h-16 px-6 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-4">
      <OrganizationSwitcher
      appearance={{
        elements: {
          organizationPreviewAvatarBox: "size-6",
        },
      }}
      />
    <h1 className="text-lg font-semibold text-gray-100">Dashboard</h1>
  </div>
  
  <div className="flex items-center gap-6">
    <Link href="/feed"> {/* Link to the feed page */}
      <button className="text-gray-300 hover:text-gray-100">
        Feed
      </button>
    </Link>
  </div>

  <UserButton
    afterSignOutUrl="/"
    appearance={{
      elements: {
        userButtonAvatarBox: "size-6",
      },
    }}
  />
</header>
        {/* Main Content */}
        <div className="flex w-full p-10">
          {/* Left Content - Align to the very left */}
          <div className="w-[30rem] bg-gray-800 rounded-lg  shadow-md border border-gray-700">
            <UserDetails />
          </div>

          {/* Right Content */}
          <aside className="flex-1 ml-10 bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              <UserStack/>
            </h2>
            <p className="text-sm text-gray-400">
              Recent activities or additional dashboard content can go here.
            </p>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
