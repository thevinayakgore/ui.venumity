"use client";
import { useState } from "react";
// import { motion } from "framer-motion";
import { Plus, MoreVertical, User, Calendar, Tag } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

export default function DataGrid2_3() {
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: 1,
          title: "Design Homepage",
          assignee: "Alex",
          priority: "high",
          dueDate: "2024-01-25",
        },
        {
          id: 2,
          title: "Write Documentation",
          assignee: "Maria",
          priority: "medium",
          dueDate: "2024-01-28",
        },
        {
          id: 3,
          title: "Update Logo",
          assignee: "David",
          priority: "low",
          dueDate: "2024-02-01",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [
        {
          id: 4,
          title: "API Integration",
          assignee: "Sarah",
          priority: "high",
          dueDate: "2024-01-22",
        },
        {
          id: 5,
          title: "Mobile App Design",
          assignee: "Michael",
          priority: "medium",
          dueDate: "2024-01-26",
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      tasks: [
        {
          id: 6,
          title: "User Testing",
          assignee: "Emily",
          priority: "medium",
          dueDate: "2024-01-23",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: 7,
          title: "Project Setup",
          assignee: "James",
          priority: "low",
          dueDate: "2024-01-20",
        },
        {
          id: 8,
          title: "Database Design",
          assignee: "Lisa",
          priority: "high",
          dueDate: "2024-01-21",
        },
      ],
    },
  ]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destColumn = columns.find(
      (col) => col.id === destination.droppableId
    );
    if (!sourceColumn || !destColumn) return;

    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, movedTask);

    setColumns((cols) =>
      cols.map((col) => {
        if (col.id === sourceColumn.id) return { ...col, tasks: sourceTasks };
        if (col.id === destColumn.id) return { ...col, tasks: destTasks };
        return col;
      })
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="max-w-7xl m-auto w-full h-full p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Project Board
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Drag and drop tasks between columns
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>

        {/* Kanban Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-4 min-h-125 ${
                      snapshot.isDraggingOver ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {column.title}
                        </h3>
                        <span className="w-6 h-6 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full text-xs flex items-center justify-center">
                          {column.tasks.length}
                        </span>
                      </div>
                      <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-4">
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              //   initial={{ opacity: 0, y: 20 }}
                              //   animate={{ opacity: 1, y: 0 }}
                              //   transition={{ delay: index * 0.1 }}
                              className={`bg-white dark:bg-gray-900 rounded-lg shadow p-4 cursor-move ${
                                snapshot.isDragging
                                  ? "ring-2 ring-blue-500"
                                  : ""
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {task.title}
                                </h4>
                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                  <MoreVertical className="w-4 h-4 text-gray-500" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {task.assignee}
                                  </span>
                                </div>
                                <span
                                  className={`px-2 py-1 text-xs rounded ${getPriorityColor(
                                    task.priority
                                  )}`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Tag className="w-4 h-4" />
                                  <span>Task</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>

                    {/* Add Task Button */}
                    <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" /> Add Task
                    </button>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              8
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Tasks</div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-xl">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              2
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              4
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              High Priority
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
