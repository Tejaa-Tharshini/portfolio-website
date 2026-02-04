import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

function ExperienceEditor({ data, portfolioData }) {
    const [editing, setEditing] = useState(null);
    const [newExp, setNewExp] = useState({
        title: '', company: '', duration: '', type: 'Full-time', description: '', technologies: ''
    });
    const [showAdd, setShowAdd] = useState(false);

    const handleAdd = () => {
        if (newExp.title && newExp.company) {
            portfolioData.addExperience({
                ...newExp,
                technologies: newExp.technologies.split(',').map(t => t.trim()).filter(Boolean)
            });
            setNewExp({ title: '', company: '', duration: '', type: 'Full-time', description: '', technologies: '' });
            setShowAdd(false);
        }
    };

    const handleUpdate = (id) => {
        if (editing) {
            portfolioData.updateExperience(id, {
                ...editing,
                technologies: typeof editing.technologies === 'string'
                    ? editing.technologies.split(',').map(t => t.trim()).filter(Boolean)
                    : editing.technologies
            });
            setEditing(null);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this experience?')) {
            portfolioData.deleteExperience(id);
        }
    };

    return (
        <div className="space-y-6">
            <button
                onClick={() => setShowAdd(!showAdd)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600"
            >
                <FaPlus /> Add Experience
            </button>

            {showAdd && (
                <div className="glass-card rounded-2xl p-6 space-y-4">
                    <h3 className="font-display text-lg font-semibold text-white">New Experience</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={newExp.title}
                            onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Job Title"
                        />
                        <input
                            type="text"
                            value={newExp.company}
                            onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Company"
                        />
                        <input
                            type="text"
                            value={newExp.duration}
                            onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Duration (e.g., Jan 2024 - Present)"
                        />
                        <select
                            value={newExp.type}
                            onChange={(e) => setNewExp({ ...newExp, type: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Contract">Contract</option>
                        </select>
                    </div>
                    <textarea
                        value={newExp.description}
                        onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white resize-none"
                        rows={3}
                        placeholder="Job description..."
                    />
                    <input
                        type="text"
                        value={newExp.technologies}
                        onChange={(e) => setNewExp({ ...newExp, technologies: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                        placeholder="Technologies (comma-separated)"
                    />
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

            <div className="grid gap-4">
                {data?.map((exp) => (
                    <div key={exp.id} className="glass-card rounded-2xl p-6">
                        {editing?.id === exp.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white" />
                                    <input type="text" value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white" />
                                    <input type="text" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white" />
                                    <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white">
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>
                                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white resize-none" rows={3} />
                                <input type="text" value={Array.isArray(editing.technologies) ? editing.technologies.join(', ') : editing.technologies} onChange={(e) => setEditing({ ...editing, technologies: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white" />
                                <div className="flex gap-3">
                                    <button onClick={() => handleUpdate(exp.id)} className="px-4 py-2 rounded-lg bg-green-500 text-white flex items-center gap-2"><FaSave /> Save</button>
                                    <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg bg-gray-600 text-white flex items-center gap-2"><FaTimes /> Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-display text-lg font-semibold text-white">{exp.title}</h3>
                                    <p className="text-primary-400">{exp.company} • {exp.duration}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-primary-500/10 text-primary-400">{exp.type}</span>
                                    <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditing(exp)} className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10"><FaEdit /></button>
                                    <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"><FaTrash /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExperienceEditor;
