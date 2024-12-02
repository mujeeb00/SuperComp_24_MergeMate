import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import Link from 'next/link';
import { Footer } from '../components/footer';
import { UserStack } from '../components/user-stacks';
import { UserDetails } from "../components/user-details";

export default function DashboardPage() {
  return (
    <>
      <main className="w-full min-h-screen bg-gray-900 text-gray-300 font-shedcn">
        {/* Header */}
        <header className="flex items-center justify-between w-full h-16 px-6 bg-gray-800 border-b border-gray-700">
          {/* Left side: Organization and Title */}
          <div className="flex items-center gap-4">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationPreviewAvatarBox: "size-6",
                },
              }}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <button className="text-gray-300 hover:text-gray-100">Dashboard</button>
            </Link>
            <Link href="/projects">
              <button className="text-gray-300 hover:text-gray-100">Task Management</button>
            </Link>
            <Link href="/feed">
              <button className="text-gray-300 hover:text-gray-100">Feed</button>
            </Link>
            <Link href="/browse">
              <button className="text-gray-300 hover:text-gray-100">Browse Repositories</button>
            </Link>
          </div>

          {/* User Button (Profile and Logout) */}
          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-6",
                },
              }}
            />
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex w-full p-10">
          {/* Left Side: User Details */}
          <div className="w-[30rem] bg-gray-800 rounded-lg shadow-md border border-gray-700">
            <UserDetails />
          </div>

          {/* Right Side: User Stack */}
          <aside className="flex-1 ml-10 bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              <UserStack />
            </h2>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
