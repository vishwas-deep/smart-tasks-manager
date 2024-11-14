"use client";
import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [filter, setFilter] = useState("All");
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  const toggleShowCompleted = () => setShowCompleted((prev) => !prev);

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const sortedPendingTasks = pendingTasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const sortedCompletedTasks = completedTasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const searchedPendingTasks = sortedPendingTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchedCompletedTasks = sortedCompletedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="bg-white p-8 rounded-lg shadow-xl space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl font-semibold text-gray-800">Tasks</h2>
        <div className="w-full md:w-auto flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 md:flex-none border border-gray-300 rounded-lg p-3 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={toggleShowCompleted}
            className={`py-3 px-6 rounded-lg transition duration-200 ${
              showCompleted
                ? "bg-teal-500 text-white hover:bg-teal-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {showCompleted ? "Show Pending Tasks" : "Show Completed Tasks"}
          </button>
        </div>
      </div>

      {searchedPendingTasks.length === 0 && searchedCompletedTasks.length === 0 ? (
        <p className="text-gray-500">No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {!showCompleted &&
            searchedPendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          {showCompleted &&
            searchedCompletedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          {!showCompleted &&
            searchedCompletedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
