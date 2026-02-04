import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';

function ProfileEditor({ data, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        tagline: '',
        description: '',
        resumeUrl: ''
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <h3 className="font-display text-lg font-semibold text-white mb-4">Hero Section</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Title/Role</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                            placeholder="e.g., Full Stack Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                        <input
                            type="text"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                            placeholder="e.g., Available for opportunities"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 outline-none resize-none"
                            placeholder="Brief introduction about yourself..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Resume URL</label>
                        <input
                            type="text"
                            name="resumeUrl"
                            value={formData.resumeUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder-gray-500 focus:border-primary-500 outline-none"
                            placeholder="/resume.pdf or https://..."
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${saved
                            ? 'bg-green-500 text-white'
                            : 'bg-primary-500 hover:bg-primary-600 text-white'
                        }`}
                >
                    <FaSave />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default ProfileEditor;
