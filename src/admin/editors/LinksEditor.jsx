import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

function LinksEditor({ data, portfolioData }) {
    const [editing, setEditing] = useState(null);
    const [newLink, setNewLink] = useState({ name: '', description: '', url: '', icon: '🔗', color: '#6366f1' });
    const [showAdd, setShowAdd] = useState(false);

    const handleAdd = () => {
        if (newLink.name && newLink.url) {
            portfolioData.addLink(newLink);
            setNewLink({ name: '', description: '', url: '', icon: '🔗', color: '#6366f1' });
            setShowAdd(false);
        }
    };

    const handleUpdate = (id) => {
        if (editing) {
            portfolioData.updateLink(id, editing);
            setEditing(null);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this link?')) {
            portfolioData.deleteLink(id);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <button
                onClick={() => setShowAdd(!showAdd)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600"
            >
                <FaPlus /> Add Link
            </button>

            {showAdd && (
                <div className="glass-card rounded-2xl p-6 space-y-4">
                    <h3 className="font-display text-lg font-semibold text-white">New Link</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <input
                            type="text"
                            value={newLink.icon}
                            onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-center text-xl"
                            placeholder="📧"
                        />
                        <input
                            type="text"
                            value={newLink.name}
                            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                            className="px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                            placeholder="Link Name"
                        />
                        <input
                            type="color"
                            value={newLink.color}
                            onChange={(e) => setNewLink({ ...newLink, color: e.target.value })}
                            className="w-full h-12 rounded-xl bg-dark-800 border border-white/10 cursor-pointer"
                        />
                    </div>
                    <input
                        type="text"
                        value={newLink.description}
                        onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                        placeholder="Description (e.g., email@example.com)"
                    />
                    <input
                        type="text"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                        placeholder="URL (e.g., mailto:email@example.com)"
                    />
                    <div className="flex gap-3">
                        <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-green-500 text-white flex items-center gap-2"><FaSave /> Save</button>
                        <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg bg-gray-600 text-white flex items-center gap-2"><FaTimes /> Cancel</button>
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {data?.map((link) => (
                    <div key={link.id} className="glass-card rounded-2xl p-5">
                        {editing?.id === link.id ? (
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-3">
                                    <input type="text" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white text-center text-xl" />
                                    <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" />
                                    <input type="color" value={editing.color} onChange={(e) => setEditing({ ...editing, color: e.target.value })} className="w-full h-10 rounded-lg bg-dark-800 border border-white/10" />
                                </div>
                                <input type="text" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="Description" />
                                <input type="text" value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="URL" />
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdate(link.id)} className="px-3 py-1 rounded-lg bg-green-500 text-white text-sm"><FaSave /></button>
                                    <button onClick={() => setEditing(null)} className="px-3 py-1 rounded-lg bg-gray-600 text-white text-sm"><FaTimes /></button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${link.color}20` }}>
                                    {link.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-white">{link.name}</h3>
                                    <p className="text-sm text-gray-400">{link.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditing(link)} className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10"><FaEdit /></button>
                                    <button onClick={() => handleDelete(link.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"><FaTrash /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LinksEditor;
