"use client";
import React, { useState } from "react";

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(task);
    setTask({
      title: "",
      description: "",
      priority: "Medium",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="Describe your task"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-600 font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
