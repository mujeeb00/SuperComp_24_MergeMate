"use client"

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useUser } from '@clerk/nextjs'
interface Contributor {
  email: string
  avatar: string
}

interface Task {
  id: string
  content: string
  assignee?: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

export default function TrelloBoard() {
  const { user } = useUser()
  const [contributors, setContributors] = useState<Contributor[]>([
    { email: 'hassan@gmail.com', avatar: 'https://github.com/shadcn.png' },
    { email: 'owaise@gmail.com', avatar: 'https://github.com/shadcn.png' },
  ])

  const [newContributorEmail, setNewContributorEmail] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inprogress', title: 'In Progress', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: [] },
  ])
  const [newTaskContent, setNewTaskContent] = useState('')
  const [selectedAssignee, setSelectedAssignee] = useState<Contributor | null>(null)

  const handleAddContributor = (e: React.FormEvent) => {
    e.preventDefault()
    if (newContributorEmail) {
      const newContributor: Contributor = {
        email: newContributorEmail,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${newContributorEmail}`,
      }
      setContributors([...contributors, newContributor])
      setNewContributorEmail('')
      setIsDialogOpen(false)
      toast({
        title: "Contributor added",
        description: `${newContributorEmail} has been added to the board.`,
      })
    }
  }

  const handleAddTask = () => {
    if (newTaskContent.trim() === '') return
    const todoColumn = columns.find(col => col.id === 'todo')
    if (todoColumn) {
      const newTaskObj: Task = {
        id: Date.now().toString(),
        content: newTaskContent,
        assignee: selectedAssignee?.email,
      }
      setColumns(columns.map(col => 
        col.id === 'todo' ? { ...col, tasks: [...col.tasks, newTaskObj] } : col
      ))
      setNewTaskContent('')
      setSelectedAssignee(null)
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return

    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)

    if (sourceColumn && destColumn) {
      const sourceTasks = Array.from(sourceColumn.tasks)
      const destTasks = source.droppableId === destination.droppableId ? sourceTasks : Array.from(destColumn.tasks)
      const [removed] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, removed)

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks }
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks }
        }
        return col
      }))
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add Contributor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new contributor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddContributor} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter contributor's email"
                value={newContributorEmail}
                onChange={(e) => setNewContributorEmail(e.target.value)}
                required
              />
              <Button type="submit">Add Contributor</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contributors Display */}
      <div className="flex flex-wrap gap-2">
        {contributors.map((contributor, index) => (
          <div key={index} className="flex items-center space-x-2 bg-secondary p-2 rounded-md">
            <Avatar>
              <AvatarImage src={contributor.avatar} alt={contributor.email} />
              <AvatarFallback>{contributor.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{contributor.email}</span>
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="mr-2"
        />
        <div className="w-full">
          <select
            value={selectedAssignee?.email || ''}
            onChange={(e) => setSelectedAssignee(contributors.find(c => c.email === e.target.value) || null)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Assign Task</option>
            {contributors.map((contributor) => (
              <option key={contributor.email} value={contributor.email}>
                {contributor.email}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {columns.map(column => (
            <div key={column.id} className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>{column.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-secondary p-2 mb-2 rounded"
                              >
                                {task.content}
                                {task.assignee && (
                                  <div className="mt-1 text-xs text-gray-600">
                                    Assigned to: {task.assignee}
                                  </div>
                                )}
                                {task.assignee === user?.id && (
                                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-1 rounded">
                                    Assigned to me
                                  </span>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
