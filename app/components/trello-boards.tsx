"use client"

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/nextjs'

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
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inprogress', title: 'In Progress', tasks: [] },
    { id: 'completed', title: 'Completed', tasks: [] },
  ])
  const [newTask, setNewTask] = useState('')

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

  const addTask = () => {
    if (newTask.trim() === '') return
    const todo = columns.find(col => col.id === 'todo')
    if (todo) {
      const newTaskObj: Task = { id: Date.now().toString(), content: newTask, assignee: user?.id }
      setColumns(columns.map(col => 
        col.id === 'todo' ? { ...col, tasks: [...col.tasks, newTaskObj] } : col
      ))
      setNewTask('')
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="mr-2"
        />
        <Button onClick={addTask}>Add Task</Button>
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
