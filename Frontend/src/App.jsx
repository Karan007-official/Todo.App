import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("All");

  const API = "http://localhost:5000";

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/tasks`, { title, priority });
    setTitle("");
    setPriority("Medium");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const completeTask = async (id) => {
    await axios.put(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const updateTask = async () => {
    await axios.put(`${API}/edit/${editId}`, { title, priority });
    setEditId(null);
    setTitle("");
    setPriority("Medium");
    fetchTasks();
  };

  const editTask = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setPriority(task.priority);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setPriority("Medium");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const donePercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const pendPercent = tasks.length ? Math.round((pendingCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchSearch;
    if (filter === "Pending") return matchSearch && !task.completed;
    if (filter === "Completed") return matchSearch && task.completed;
    return matchSearch && task.priority === filter;
  });

  const priorityClass = (p) => {
    if (p === "High") return "bg-red-500/10 text-red-400 border border-red-500/20";
    if (p === "Medium") return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    return "bg-green-500/10 text-green-400 border border-green-500/20";
  };

  const filters = ["All", "Pending", "Completed", "High", "Medium", "Low"];
  const filterEmoji = { High: "🔴 ", Medium: "🟡 ", Low: "🟢 " };

  return (
    <div className="min-h-screen bg-[#09090B] text-white px-5 py-8 font-sans">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-medium bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              TaskFlow Pro
            </h1>
            <p className="text-zinc-500 text-sm mt-1">Manage your tasks like a professional.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center font-medium text-sm">
            K
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Total */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Total Tasks</p>
            <h2 className="text-4xl font-medium mt-2">{tasks.length}</h2>
          </div>
          {/* Completed */}
          <div className="bg-zinc-900 border-t-2 border-green-600 border-x border-b border-zinc-800 rounded-2xl p-5">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Completed</p>
            <h2 className="text-4xl font-medium text-green-400 mt-2">{completedCount}</h2>
            <div className="h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-green-600 rounded-full transition-all duration-500"
                style={{ width: `${donePercent}%` }}
              />
            </div>
          </div>
          {/* Pending */}
          <div className="bg-zinc-900 border-t-2 border-orange-600 border-x border-b border-zinc-800 rounded-2xl p-5">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Pending</p>
            <h2 className="text-4xl font-medium text-orange-400 mt-2">{pendingCount}</h2>
            <div className="h-1 bg-zinc-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-500"
                style={{ width: `${pendPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-5">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
            {editId ? "✏️ Edit Task" : "＋ New Task"}
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (editId ? updateTask() : addTask())}
              className="flex-1 bg-[#09090B] border border-zinc-700 focus:border-violet-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-600"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="bg-[#09090B] border border-zinc-700 rounded-xl px-3 py-2.5 text-sm outline-none text-zinc-300 cursor-pointer"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            {editId ? (
              <div className="flex gap-2">
                <button
                  onClick={updateTask}
                  className="bg-yellow-600 hover:bg-yellow-500 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Update
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-zinc-400"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={addTask}
                className="bg-violet-600 hover:bg-violet-500 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Add Task
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-base">🔍</span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-500 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors placeholder:text-zinc-600"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filter === f
                  ? "bg-violet-600/20 border-violet-500/50 text-violet-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {(filterEmoji[f] || "") + f}
            </button>
          ))}
        </div>

        {/* Task Count */}
        <p className="text-xs text-zinc-600 uppercase tracking-widest mb-3">
          Tasks{" "}
          <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full ml-1">
            {filteredTasks.length}
          </span>
        </p>

        {/* Task Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {filteredTasks.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-zinc-600">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-base">No tasks found</p>
              <p className="text-sm mt-1 text-zinc-700">Add a task above to get started</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-zinc-900 border rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/40 ${
                  task.completed ? "border-zinc-800 opacity-60" : "border-zinc-800"
                }`}
              >
                {/* Card Top */}
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${priorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs flex items-center gap-1.5 ${task.completed ? "text-green-400" : "text-orange-400"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${task.completed ? "bg-green-400" : "bg-orange-400"}`} />
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                {/* Title */}
                <p className={`text-base font-medium mb-4 leading-snug ${task.completed ? "line-through text-zinc-600" : "text-zinc-200"}`}>
                  {task.title}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => completeTask(task.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    {task.completed ? "↩ Undo" : "✓ Done"}
                  </button>
                  <button
                    onClick={() => editTask(task)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    🗑 Del
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default App;