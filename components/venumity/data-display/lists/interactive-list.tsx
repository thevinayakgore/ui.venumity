import { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

export default function InteractiveList() {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: "1",
      text: "Finish project proposal",
      completed: true,
      priority: "high",
      dueDate: "Today",
    },
    {
      id: "2",
      text: "Buy groceries",
      completed: false,
      priority: "medium",
      dueDate: "Tomorrow",
    },
    {
      id: "3",
      text: "Schedule team meeting",
      completed: false,
      priority: "high",
      dueDate: "Today",
    },
    {
      id: "4",
      text: "Read documentation",
      completed: false,
      priority: "low",
      dueDate: "Next week",
    },
    { id: "5", text: "Update portfolio", completed: true, priority: "medium" },
  ]);

  const [newTodo, setNewTodo] = useState("");

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newItem: TodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      priority: "medium",
    };

    setTodos([...todos, newItem]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getPriorityColor = (priority: TodoItem["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">To-Do List</h2>

      {/* Add new todo */}
      <div className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center p-4 border rounded-lg transition-all ${
              todo.completed ? "bg-gray-50 opacity-75" : "hover:bg-gray-50"
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-green-500"
              }`}
            >
              {todo.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "font-medium"
                  }`}
                >
                  {todo.text}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                    todo.priority
                  )}`}
                >
                  {todo.priority}
                </span>
              </div>
              {todo.dueDate && (
                <div className="text-sm text-gray-500 mt-1">
                  Due: {todo.dueDate}
                </div>
              )}
            </div>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t flex justify-between text-sm text-gray-500">
        <span>
          {todos.filter((t) => t.completed).length} of {todos.length} completed
        </span>
        <button
          onClick={() => setTodos(todos.filter((t) => !t.completed))}
          className="text-blue-600 hover:text-blue-800"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
