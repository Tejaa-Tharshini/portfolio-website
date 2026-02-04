import { useState, useEffect, useRef } from 'react';
import { FaSave, FaPlus, FaTrash, FaEdit, FaCamera, FaLink, FaSearchPlus, FaSearchMinus, FaArrowsAlt, FaUndo } from 'react-icons/fa';

function AboutEditor({ data, onSave, portfolioData }) {
    const [formData, setFormData] = useState({
        bio: '',
        whatIDo: '',
        interests: '',
        education: [],
        stats: [],
        photoUrl: '',
        photoSettings: {
            zoom: 1,
            positionX: 50,
            positionY: 50
        }
    });
    const [saved, setSaved] = useState(false);
    const [editingEdu, setEditingEdu] = useState(null);
    const [newEdu, setNewEdu] = useState({ degree: '', institution: '', duration: '', description: '' });
    const [photoMode, setPhotoMode] = useState('url'); // 'url' or 'upload'
    const [showAdjustments, setShowAdjustments] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (data) {
            setFormData({ ...formData, ...data });
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setSaved(false);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photoUrl: reader.result });
                setSaved(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleAddEducation = () => {
        if (newEdu.degree && newEdu.institution) {
            const education = portfolioData.addEducation(newEdu);
            setNewEdu({ degree: '', institution: '', duration: '', description: '' });
        }
    };

    const handleDeleteEducation = (id) => {
        portfolioData.deleteEducation(id);
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData({ ...formData, stats: newStats });
        setSaved(false);
    };

    return (
        <div className="max-w-3xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo Section */}
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
                        <FaCamera className="text-primary-400" />
                        Profile Photo
                    </h3>

                    {/* Photo Preview */}
                    <div className="flex items-start gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-dark-800 border-2 border-dashed border-white/20 overflow-hidden flex items-center justify-center">
                                {formData.photoUrl ? (
                                    <img
                                        src={formData.photoUrl}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                        style={{
                                            transform: `scale(${formData.photoSettings?.zoom || 1})`,
                                            objectPosition: `${formData.photoSettings?.positionX || 50}% ${formData.photoSettings?.positionY || 50}%`
                                        }}
                                    />
                                ) : (
                                    <span className="text-4xl">👩‍💻</span>
                                )}
                            </div>
                            {/* Edit/Remove overlay */}
                            {formData.photoUrl && (
                                <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAdjustments(!showAdjustments)}
                                        className="p-2 rounded-lg bg-accent-500/80 text-white hover:bg-accent-500 transition-colors"
                                        title="Adjust Photo"
                                    >
                                        <FaArrowsAlt size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-2 rounded-lg bg-primary-500/80 text-white hover:bg-primary-500 transition-colors"
                                        title="Change Photo"
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, photoUrl: '' });
                                            setSaved(false);
                                        }}
                                        className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                                        title="Remove Photo"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-3">
                            {/* Toggle between URL and Upload */}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setPhotoMode('url')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${photoMode === 'url'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-dark-800 text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <FaLink size={12} /> Image URL
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPhotoMode('upload')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${photoMode === 'upload'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-dark-800 text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <FaCamera size={12} /> Upload
                                </button>
                            </div>

                            {photoMode === 'url' ? (
                                <input
                                    type="text"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white focus:border-primary-500 outline-none"
                                    placeholder="https://example.com/photo.jpg or /profile.jpg"
                                />
                            ) : (
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handlePhotoUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-gray-400 hover:text-white hover:border-primary-500/50 transition-all"
                                    >
                                        Click to upload image...
                                    </button>
                                </div>
                            )}

                            <p className="text-xs text-gray-500">
                                Recommended: Square image, at least 400x400px. Supports JPG, PNG, WebP.
                            </p>
                        </div>
                    </div>

                    {/* Image Adjustment Controls */}
                    {showAdjustments && formData.photoUrl && (
                        <div className="p-4 bg-dark-800/50 rounded-xl space-y-4 mt-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-white flex items-center gap-2">
                                    <FaArrowsAlt className="text-accent-400" />
                                    Adjust Image
                                </h4>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            photoSettings: { zoom: 1, positionX: 50, positionY: 50 }
                                        });
                                        setSaved(false);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs bg-dark-700 text-gray-400 hover:text-white transition-colors"
                                >
                                    <FaUndo size={10} /> Reset
                                </button>
                            </div>

                            {/* Zoom Slider */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400 flex items-center gap-2">
                                        <FaSearchPlus size={12} /> Zoom
                                    </span>
                                    <span className="text-white">{Math.round((formData.photoSettings?.zoom || 1) * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="3"
                                    step="0.1"
                                    value={formData.photoSettings?.zoom || 1}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            photoSettings: {
                                                ...formData.photoSettings,
                                                zoom: parseFloat(e.target.value)
                                            }
                                        });
                                        setSaved(false);
                                    }}
                                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                            </div>

                            {/* X Position Slider */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Position X</span>
                                    <span className="text-white">{formData.photoSettings?.positionX || 50}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={formData.photoSettings?.positionX || 50}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            photoSettings: {
                                                ...formData.photoSettings,
                                                positionX: parseInt(e.target.value)
                                            }
                                        });
                                        setSaved(false);
                                    }}
                                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                            </div>

                            {/* Y Position Slider */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Position Y</span>
                                    <span className="text-white">{formData.photoSettings?.positionY || 50}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={formData.photoSettings?.positionY || 50}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            photoSettings: {
                                                ...formData.photoSettings,
                                                positionY: parseInt(e.target.value)
                                            }
                                        });
                                        setSaved(false);
                                    }}
                                    className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Bio Section */}
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <h3 className="font-display text-lg font-semibold text-white">About Content</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Education Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white focus:border-primary-500 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">What I Do</label>
                        <textarea
                            name="whatIDo"
                            value={formData.whatIDo}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white focus:border-primary-500 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Interests</label>
                        <textarea
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white focus:border-primary-500 outline-none resize-none"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-display text-lg font-semibold text-white mb-4">Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {formData.stats?.map((stat, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                    className="w-24 px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white text-center"
                                    placeholder="10+"
                                />
                                <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                    className="flex-1 px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white"
                                    placeholder="Projects"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${saved ? 'bg-green-500 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'
                        }`}
                >
                    <FaSave />
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
            </form>

            {/* Education List */}
            <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-white mb-4">🎓 Education</h3>

                {/* Add New */}
                <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-dark-800/50 rounded-xl">
                    <input
                        type="text"
                        value={newEdu.degree}
                        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white"
                        placeholder="Degree"
                    />
                    <input
                        type="text"
                        value={newEdu.institution}
                        onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white"
                        placeholder="Institution"
                    />
                    <input
                        type="text"
                        value={newEdu.duration}
                        onChange={(e) => setNewEdu({ ...newEdu, duration: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white"
                        placeholder="Duration"
                    />
                    <button
                        onClick={handleAddEducation}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                    >
                        <FaPlus /> Add
                    </button>
                </div>

                {/* List */}
                <div className="space-y-3">
                    {formData.education?.map((edu) => (
                        <div key={edu.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                            <div>
                                <h4 className="font-medium text-white">{edu.degree}</h4>
                                <p className="text-sm text-gray-400">{edu.institution} • {edu.duration}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteEducation(edu.id)}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AboutEditor;
