"use client";

import { useSession, useUser } from "@clerk/nextjs";

function Row({ desc, value }: { desc: string; value: string }) {
  return (
    <div className="h-[2.125rem] grid grid-cols-2 items-center">
      <span className="text-xs font-semibold text-gray-300">{desc}</span>
      <span className="text-xs text-gray-400 font-mono truncate">{value}</span>
    </div>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();

  if (!user || !session) return null;

  // Extracting GitHub username from external accounts, if available
  const githubAccount = user.externalAccounts.find(
    (account) => account.provider === "github"
  );
  const githubUsername = githubAccount?.username || "Not linked";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-16">
      <div className="p-8 rounded-xl bg-gray-800 shadow-md ring-1 ring-gray-700 max-w-[25rem] mx-auto">
        <div className="flex flex-col items-center gap-4 mb-6">
          <img
            src={user.imageUrl}
            alt="User Avatar"
            className="size-20 rounded-full border-2 border-gray-700"
          />
          {user.firstName && user.lastName && (
            <h1 className="text-[1.0625rem] font-semibold text-gray-100">
              {user.firstName} {user.lastName}
            </h1>
          )}
        </div>

        <div className="px-2.5 bg-gray-700 rounded-lg divide-y divide-gray-600">
          <Row desc="Email" value={user.emailAddresses[0].emailAddress} />
          <Row desc="User name" value={githubUsername} />
          <Row desc="Last signed in" value={formatDate(user.lastSignInAt!)} />
          <Row desc="Joined on" value={formatDate(user.createdAt!)} />
        </div>
      </div>
    </div>
  );
}
