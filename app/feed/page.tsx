// pages/feed.tsx
"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa"; // GitHub icon

// Fetch GitHub repositories for the authenticated user
const query = 'react'; // Search term for repositories
const page = 1;  // Page number for pagination
const perPage = 10;  // Number of results per page
const sort = 'stars'; // Sort by stars (can also be 'forks', 'updated', etc.)
const order = 'desc'; // Order by descending

const url = `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${perPage}&sort=${sort}&order=${order}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data); // Debugging the response

    // Ensure that the data.items is an array
    const repos = data.items;

    if (Array.isArray(repos) && repos.length > 0) {
      const randomRepo = repos[Math.floor(Math.random() * repos.length)];
      console.log('Random Repo:', randomRepo);
    } else {
      console.log('No repositories found for the query or invalid response.');
    }
  })
  .catch(error => console.error('Error fetching repositories:', error));

 


export default function Feed() {
  const { user } = useUser(); // Get user from Clerk authentication
  const [repos, setRepos] = useState<any[]>([]); // State to hold GitHub repos
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      // Extract GitHub username from Clerk's external accounts
      const githubAccount = user.externalAccounts.find(
        (account) => account.provider === "github"
      );
      const githubUsername = githubAccount?.username || "";

      // if (githubUsername) {
      //   fetchGitHubRepos(githubUsername).then((reposData) => {
      //     setRepos(reposData);
      //     setLoading(false);
      //   });
      // }
    }
  }, [user]);

  if (loading) {
    return <div>Loading your feed...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your GitHub Feed</h1>
      <div className="space-y-4">
        {repos.length === 0 ? (
          <p>No repositories found</p>
        ) : (
          repos.map((repo: any) => (
            <div key={repo.id} className="flex items-center p-4 bg-gray-800 rounded-md shadow-md">
              <FaGithub className="text-gray-300 mr-2" />
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-gray-100"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-400">{repo.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
