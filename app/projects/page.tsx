"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Project {
  id: string
  name: string
  description: string
  difficulty: string
  techStack: string
}

export default function ProjectsFeed() {
  const { user } = useUser()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Here you would typically fetch projects from your backend
    // For now, we'll use mock data
    const mockProjects: Project[] = [
      { id: '1', name: 'Project A', description: 'A cool project', difficulty: 'beginner', techStack: 'React, Node.js' },
      { id: '2', name: 'Project B', description: 'An awesome project', difficulty: 'intermediate', techStack: 'Vue.js, Express' },
      { id: '3', name: 'Project C', description: 'A complex project', difficulty: 'advanced', techStack: 'Angular, Django' },
    ]
    setProjects(mockProjects)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Open-Source Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <p className="mt-2"><strong>Difficulty:</strong> {project.difficulty}</p>
              <p><strong>Tech Stack:</strong> {project.techStack}</p>
              <Button className="mt-4" asChild>
                <Link href={`/projects/${project.id}`}>View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

