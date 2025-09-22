import { createFileRoute } from "@tanstack/react-router"
import React, { useState } from "react"
import { trpc } from "@/utils/trpc"
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/todos")({
  component: TodosRoute,
})

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function TodosRoute() {
  const [newTodoText, setNewTodoText] = useState("");
  const todos = trpc.todo.getAll.useQuery();

  const createMutation = trpc.todo.create.useMutation({
    onSuccess: () => {
      todos.refetch();
      setNewTodoText("");
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  })

  const toggleMutation = trpc.todo.toggle.useMutation({
    onSuccess: () => {
      todos.refetch();
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  })

  const deleteMutation = trpc.todo.delete.useMutation({
    onSuccess: () => {
      todos.refetch();
    },
    onError: (error: any) => {
      toast.error(error.message);
    }
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ text: newTodoText });
  }

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed });
  }

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate({ id });
  }

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>A list of your todos</CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={handleAddTodo} 
            className="mb-6 flex items-center space-x-2"
          >
            <Input 
            type="text" 
            value={newTodoText} 
            onChange={(e) => setNewTodoText(e.target.value)} 
            placeholder="Add a new task..."
            disabled={createMutation.isPending}
            />
            <Button 
            type="submit"
            disabled={createMutation.isPending || !newTodoText.trim()}
            >
              {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Todo"}
            </Button>
          </form>

          {
            todos.isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (todos.data as Todo[])?.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground">
                No tasks yet. Add one above!
              </div>
            ) : (
              <ul className="space-y-3">
                {(todos.data as Todo[])?.map((todo: Todo) => (
                  <li 
                  key={todo.id}
                  className="flex items-center justify-between rounded-md border p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
                      id={`todo-${todo.id}`}
                      />
                      <label htmlFor={`todo-${todo.id}`} className={todo.completed ? "line-through" : ""}>
                        {todo.text}
                      </label>
                      </div>
                      <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTodo(todo.id)}
                      aria-label="Delete todo"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                  </li>
                ))}
              </ul>
            )
          }
        </CardContent>
      </Card>
    </div>
  )
}
