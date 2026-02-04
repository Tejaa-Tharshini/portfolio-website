import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

function SkillsEditor({ data, portfolioData }) {
    const [editingCat, setEditingCat] = useState(null);
    const [newCategory, setNewCategory] = useState({ title: '', icon: '💻' });
    const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate', icon: '💻' });
    const [addingSkillTo, setAddingSkillTo] = useState(null);

    const handleAddCategory = () => {
        if (newCategory.title) {
            portfolioData.addSkillCategory(newCategory);
            setNewCategory({ title: '', icon: '💻' });
        }
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Delete this category and all its skills?')) {
            portfolioData.deleteSkillCategory(id);
        }
    };

    const handleAddSkill = (categoryId) => {
        if (newSkill.name) {
            const category = data.categories.find(c => c.id === categoryId);
            if (category) {
                const updatedSkills = [...(category.skills || []), newSkill];
                portfolioData.updateSkillCategory(categoryId, { ...category, skills: updatedSkills });
                setNewSkill({ name: '', level: 'intermediate', icon: '💻' });
                setAddingSkillTo(null);
            }
        }
    };

    const handleDeleteSkill = (categoryId, skillIndex) => {
        const category = data.categories.find(c => c.id === categoryId);
        if (category) {
            const updatedSkills = category.skills.filter((_, i) => i !== skillIndex);
            portfolioData.updateSkillCategory(categoryId, { ...category, skills: updatedSkills });
        }
    };

    return (
        <div className="space-y-6">
            {/* Add Category */}
            <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-4">Add Skill Category</h3>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newCategory.icon}
                        onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                        className="w-16 px-3 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-center text-xl"
                        placeholder="🎨"
                    />
                    <input
                        type="text"
                        value={newCategory.title}
                        onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white"
                        placeholder="Category Name (e.g., Frontend)"
                    />
                    <button onClick={handleAddCategory} className="px-6 py-3 rounded-xl bg-primary-500 text-white flex items-center gap-2">
                        <FaPlus /> Add
                    </button>
                </div>
            </div>

            {/* Categories List */}
            <div className="grid gap-6">
                {data?.categories?.map((category) => (
                    <div key={category.id} className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{category.icon}</span>
                                <h3 className="font-display text-lg font-semibold text-white">{category.title}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setAddingSkillTo(addingSkillTo === category.id ? null : category.id)}
                                    className="px-3 py-1 rounded-lg bg-primary-500/20 text-primary-400 text-sm flex items-center gap-1"
                                >
                                    <FaPlus size={12} /> Skill
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Add Skill Form */}
                        {addingSkillTo === category.id && (
                            <div className="flex gap-3 mb-4 p-4 bg-dark-800/50 rounded-xl">
                                <input
                                    type="text"
                                    value={newSkill.icon}
                                    onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                                    className="w-14 px-2 py-2 rounded-lg bg-dark-800 border border-white/10 text-white text-center"
                                    placeholder="💻"
                                />
                                <input
                                    type="text"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    className="flex-1 px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white"
                                    placeholder="Skill Name"
                                />
                                <select
                                    value={newSkill.level}
                                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                                    className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
                                <button onClick={() => handleAddSkill(category.id)} className="px-4 py-2 rounded-lg bg-green-500 text-white">
                                    <FaSave />
                                </button>
                            </div>
                        )}

                        {/* Skills */}
                        <div className="grid gap-2">
                            {category.skills?.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center justify-between p-3 bg-dark-800/50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span>{skill.icon}</span>
                                        <span className="text-white">{skill.name}</span>
                                        <span className="text-xs text-gray-500 capitalize px-2 py-0.5 rounded bg-dark-700">{skill.level}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteSkill(category.id, skillIndex)}
                                        className="p-1 rounded text-red-400 hover:bg-red-500/10"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillsEditor;
