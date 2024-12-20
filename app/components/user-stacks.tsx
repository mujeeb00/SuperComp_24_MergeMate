"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { marked } from "marked";
import axios from "axios";

async function fetchReadMe(githubUsername: string) {
  console.log("GitHub Username:", githubUsername);

  // Fetch the list of repositories for the user
  const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
  const repos = await response.json();

  // Find a repository, you can modify this logic if you need a specific repo
  const readmeRepo = repos.find((repo: any) => repo.name === githubUsername); // Adjust the repo name if needed

  if (readmeRepo) {
    // Fetch the raw README file from the repo
    const readmeUrl = `https://raw.githubusercontent.com/${githubUsername}/${readmeRepo.name}/main/README.md`; // Assuming README is in the root
    const readmeResponse = await fetch(readmeUrl);

    if (readmeResponse.ok) {
      const readmeContent = await readmeResponse.text();
      return readmeContent;
    }
  }
  return null;
}

export function UserStack() {
  const { user } = useUser(); // Access user data directly using the useUser hook
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  const checkAndSaveUser = async (userData: any) => {
    try {
      // Fetch all existing users
      const response = await axios.get("http://localhost:5000/user");
      const existingUsers = response.data;

      // Check if the current user matches any existing user
      const isUserExists = existingUsers.some(
        (existingUser: any) => existingUser.email === userData.email
      );

      if (!isUserExists) {
        // Post the new user to the backend
        const postResponse = await axios.post("http://localhost:5000/user", userData);
        console.log("User data saved successfully:", postResponse.data);
      } else {
        console.log("User already exists in the database.");
      }
    } catch (error: any) {
      console.error("Error checking or saving user data:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      // Log the user's email to the console
      console.log("User Email:", user.emailAddresses[0]?.emailAddress);

      // Prepare user data
      const userData = {
        email: user.emailAddresses[0]?.emailAddress,
        username: user.username || `${user.firstName}${user.lastName}`,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        externalAccounts: user.externalAccounts || [],
      };

      // Check if user exists and save only if not
      checkAndSaveUser(userData);

      // Fetch GitHub README content
      const githubAccount = user.externalAccounts.find(
        (account) => account.provider === "github"
      );
      const githubUsername = githubAccount?.username || "Not linked";

      if (githubUsername !== "Not linked") {
        fetchReadMe(githubUsername).then((content) => {
          if (content) {
            setReadmeContent(content);
          }
        });
      }
    }
  }, [user]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-8">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">My Expertise</h2>
      <div className="bg-gray-700 p-4 rounded-lg">
        {readmeContent ? (
          <div
            className="text-xs text-gray-300 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: marked(readmeContent),
            }}
          />
        ) : (
          <p className="text-gray-400">Loading expertise...</p>
        )}
      </div>
    </div>
  );
}
