"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

export default function AddProject() {
  const router = useRouter()
  const { user } = useUser()

  const [project, setProject] = useState({
    name: '',
    description: '',
    repoUrl: '',
    difficulty: '',
    techStack: '',
    contributionGuidelines: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate sending project data to the backend (e.g., via API)
    console.log('Project data:', { ...project, ownerId: user?.id })

    // After submission, navigate to the 'projects' page
    router.push('/projects')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Button variant="ghost">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Your Open-Source Project</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
            <Input
              id="name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              required
            />
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              required
            />
          </div>

          {/* Repository URL */}
          <div>
            <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">Repository URL</label>
            <Input
              id="repoUrl"
              value={project.repoUrl}
              onChange={(e) => setProject({ ...project, repoUrl: e.target.value })}
              required
            />
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
            <Select onValueChange={(value) => setProject({ ...project, difficulty: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tech Stack */}
          <div>
            <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">Tech Stack</label>
            <Input
              id="techStack"
              value={project.techStack}
              onChange={(e) => setProject({ ...project, techStack: e.target.value })}
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          {/* Contribution Guidelines */}
          <div>
            <label htmlFor="contributionGuidelines" className="block text-sm font-medium text-gray-700">Contribution Guidelines</label>
            <Textarea
              id="contributionGuidelines"
              value={project.contributionGuidelines}
              onChange={(e) => setProject({ ...project, contributionGuidelines: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit">Add Project</Button>
        </form>
      </div>
    </div>
  )
}
