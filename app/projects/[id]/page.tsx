"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TrelloBoard from '@/app/components/trello-boards'


interface Project {
  id: string
  name: string
  description: string
  difficulty: string
  techStack: string
  contributionGuidelines: string
}

export default function ProjectDetails() {
  const { user } = useUser()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [isContributor, setIsContributor] = useState(false)

  useEffect(() => {
    // Here we fetch the project details from  backend
    // For now, we'll use mock data
    const mockProject: Project = {
      id: params.id as string,
      name: 'Sample Project',
      description: 'This is a sample project description.',
      difficulty: 'Intermediate',
      techStack: 'React, Node.js, MongoDB',
      contributionGuidelines: 'Please read CONTRIBUTING.md in the repository.'
    }
    setProject(mockProject)

    // Check if the user is a contributor
    setIsContributor(true) // for debug 
  }, [params.id, user])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2"><strong>Description:</strong> {project.description}</p>
          <p className="mb-2"><strong>Difficulty:</strong> {project.difficulty}</p>
          <p className="mb-2"><strong>Tech Stack:</strong> {project.techStack}</p>
          <p><strong>Contribution Guidelines:</strong> {project.contributionGuidelines}</p>
        </CardContent>
      </Card>

      {isContributor && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Project Tasks</h2>
          <TrelloBoard />
        </div>
      )}
    </div>
  )
}

