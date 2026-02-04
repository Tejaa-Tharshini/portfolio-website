import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

function ProjectsEditor({ data, portfolioData }) {
    const [editing, setEditing] = useState(null);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: ''
    });
    const [showAdd, setShowAdd] = useState(false);

    const handleAdd = () => {
        if (newProject.title && newProject.description) {
            portfolioData.addProject({
                ...newProject,
                technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean)
            });
            setNewProject({ title: '', description: '', technologies: '', githubUrl: '', liveUrl: '' });
            setShowAdd(false);
        }
    };

    const handleUpdate = (id) => {
        if (editing) {
            portfolioData.updateProject(id, {
                ...editing,
                technologies: typeof editing.technologies === 'string'
                    ? editing.technologies.split(',').map(t => t.trim()).filter(Boolean)
                    : editing.technologies
            });
            setEditing(null);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this project?')) {
            portfolioData.deleteProject(id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Add Button */}
            <button
                onClick={() => setShowAdd(!showAdd)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all"
            >
                <FaPlus /> Add Project
            </button>

            {/* Add Form */}
            {showAdd && (
                <div className="glass-card rounded-2xl p-6 space-y-4">
                    <h3 className="font-display text-lg font-semibold text-white">New Project</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Project Title"
                        />
                        <input
                            type="text"
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Technologies (comma-separated)"
                        />
                    </div>
                    <textarea
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white resize-none"
                        rows={3}
                        placeholder="Description"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={newProject.githubUrl}
                            onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="GitHub URL"
                        />
                        <input
                            type="text"
                            value={newProject.liveUrl}
                            onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Live Demo URL"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-green-500 text-white flex items-center gap-2">
                            <FaSave /> Save
                        </button>
                        <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg bg-gray-600 text-white flex items-center gap-2">
                            <FaTimes /> Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Projects List */}
            <div className="grid gap-4">
                {data?.map((project) => (
                    <div key={project.id} className="glass-card rounded-2xl p-6">
                        {editing?.id === project.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={editing.title}
                                        onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                                    />
                                    <input
                                        type="text"
                                        value={Array.isArray(editing.technologies) ? editing.technologies.join(', ') : editing.technologies}
                                        onChange={(e) => setEditing({ ...editing, technologies: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                                    />
                                </div>
                                <textarea
                                    value={editing.description}
                                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white resize-none"
                                    rows={3}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={editing.githubUrl || ''}
                                        onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                                        placeholder="GitHub URL"
                                    />
                                    <input
                                        type="text"
                                        value={editing.liveUrl || ''}
                                        onChange={(e) => setEditing({ ...editing, liveUrl: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                                        placeholder="Live URL"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleUpdate(project.id)} className="px-4 py-2 rounded-lg bg-green-500 text-white flex items-center gap-2">
                                        <FaSave /> Save
                                    </button>
                                    <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg bg-gray-600 text-white flex items-center gap-2">
                                        <FaTimes /> Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-display text-lg font-semibold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 text-xs rounded-full bg-primary-500/10 text-primary-400">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditing(project)}
                                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsEditor;
