"use client";

import { SignIn, useUser } from "@clerk/nextjs";

export default function Page() {
  const { user, isSignedIn } = useUser();

  
  if (isSignedIn && user) {
    console.log("User email:", user.emailAddresses[0]?.emailAddress);
  }

  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}
