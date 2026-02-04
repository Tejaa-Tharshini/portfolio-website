import { useState, useEffect } from 'react';
import { FaSave, FaKey, FaUser, FaDownload, FaUpload, FaUndo, FaImage } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

function SettingsEditor({ data, onSave, portfolioData }) {
    const [formData, setFormData] = useState({ copyright: '', tagline: '', showMadeWith: true });
    const [siteSettings, setSiteSettings] = useState({ logoUrl: '/logo.png', logoData: null, siteName: '', siteTitle: '' });
    const [saved, setSaved] = useState(false);
    const [logoSaved, setLogoSaved] = useState(false);
    const { changeUsername, changePassword } = useAuth();

    // Credential change states
    const [showUsernameChange, setShowUsernameChange] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [credMessage, setCredMessage] = useState('');

    useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    useEffect(() => {
        if (portfolioData?.data?.siteSettings) {
            setSiteSettings(portfolioData.data.siteSettings);
        }
    }, [portfolioData?.data?.siteSettings]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
        setSaved(false);
    };

    const handleSiteSettingsChange = (e) => {
        setSiteSettings({ ...siteSettings, [e.target.name]: e.target.value });
        setLogoSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }
            // Validate file size (max 500KB for localStorage)
            if (file.size > 500 * 1024) {
                alert('Image size should be less than 500KB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const base64Data = event.target.result;
                setSiteSettings({
                    ...siteSettings,
                    logoData: base64Data,
                    logoUrl: file.name // Store original filename for reference
                });
                setLogoSaved(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveSiteSettings = () => {
        if (portfolioData?.updateSiteSettings) {
            portfolioData.updateSiteSettings(siteSettings);
            setLogoSaved(true);
            setTimeout(() => setLogoSaved(false), 2000);
        }
    };

    const handleRemoveLogo = () => {
        setSiteSettings({
            ...siteSettings,
            logoData: null,
            logoUrl: '/logo.png'
        });
        setLogoSaved(false);
    };

    const handleUsernameChange = async () => {
        if (!currentPassword || !newUsername) {
            setCredMessage('Please fill all fields');
            return;
        }
        const success = await changeUsername(currentPassword, newUsername);
        if (success) {
            setCredMessage('Username changed successfully!');
            setCurrentPassword('');
            setNewUsername('');
            setShowUsernameChange(false);
        } else {
            setCredMessage('Failed: incorrect password');
        }
        setTimeout(() => setCredMessage(''), 3000);
    };

    const handlePasswordChange = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setCredMessage('Please fill all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setCredMessage('Passwords do not match');
            return;
        }
        const success = await changePassword(currentPassword, newPassword);
        if (success) {
            setCredMessage('Password changed successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordChange(false);
        } else {
            setCredMessage('Failed: incorrect current password');
        }
        setTimeout(() => setCredMessage(''), 3000);
    };

    const handleExport = () => {
        portfolioData.exportData();
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const success = portfolioData.importData(e.target.result);
                    if (success) {
                        alert('Data imported successfully!');
                        window.location.reload();
                    } else {
                        alert('Failed to import data');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handleReset = () => {
        if (confirm('Reset all portfolio data to defaults? This cannot be undone.')) {
            portfolioData.resetToDefaults();
            window.location.reload();
        }
    };

    // Get current logo source - prefer base64 data if available
    const currentLogoSrc = siteSettings.logoData || siteSettings.logoUrl || '/logo.png';

    return (
        <div className="max-w-2xl space-y-6">
            {/* Logo & Favicon Upload */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="font-display text-lg font-semibold text-white">🎨 Logo & Favicon</h3>

                <div className="flex items-start gap-6">
                    <div className="text-center">
                        <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center mb-2 overflow-hidden border-2 border-dashed border-white/20">
                            <img
                                src={currentLogoSrc}
                                alt="Current Logo"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <span className="text-xs text-gray-500">Current Logo</span>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Upload New Logo</label>
                            <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 cursor-pointer transition-all">
                                <FaImage />
                                <span>Choose Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">PNG, JPG, SVG (max 500KB)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={siteSettings.siteName}
                                onChange={handleSiteSettingsChange}
                                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white outline-none"
                                placeholder="Your Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Browser Tab Title</label>
                            <input
                                type="text"
                                name="siteTitle"
                                value={siteSettings.siteTitle}
                                onChange={handleSiteSettingsChange}
                                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white outline-none"
                                placeholder="Your Name | Portfolio"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveSiteSettings}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${logoSaved ? 'bg-green-500 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'
                                    }`}
                            >
                                <FaSave /> {logoSaved ? 'Saved!' : 'Save Logo'}
                            </button>
                            {siteSettings.logoData && (
                                <button
                                    onClick={handleRemoveLogo}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Settings */}
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="font-display text-lg font-semibold text-white">Footer Settings</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Copyright Name</label>
                    <input
                        type="text"
                        name="copyright"
                        value={formData.copyright}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white outline-none"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Footer Tagline</label>
                    <input
                        type="text"
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white outline-none"
                        placeholder="e.g., Full Stack Developer"
                    />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="showMadeWith"
                        checked={formData.showMadeWith}
                        onChange={handleChange}
                        className="w-5 h-5 rounded bg-dark-800 border border-white/10"
                    />
                    <span className="text-gray-300">Show "Made with ❤️ in India"</span>
                </label>

                <button type="submit" className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${saved ? 'bg-green-500' : 'bg-primary-500 hover:bg-primary-600'} text-white`}>
                    <FaSave /> {saved ? 'Saved!' : 'Save Footer'}
                </button>
            </form>

            {/* Credential Settings */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="font-display text-lg font-semibold text-white">🔐 Security</h3>

                {credMessage && (
                    <div className={`p-3 rounded-xl ${credMessage.includes('success') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {credMessage}
                    </div>
                )}

                <div className="flex gap-3">
                    <button onClick={() => setShowUsernameChange(!showUsernameChange)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                        <FaUser /> Change Username
                    </button>
                    <button onClick={() => setShowPasswordChange(!showPasswordChange)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
                        <FaKey /> Change Password
                    </button>
                </div>

                {showUsernameChange && (
                    <div className="p-4 bg-dark-800/50 rounded-xl space-y-3">
                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="Current Password" />
                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="New Username" />
                        <button onClick={handleUsernameChange} className="px-4 py-2 rounded-lg bg-blue-500 text-white">Update Username</button>
                    </div>
                )}

                {showPasswordChange && (
                    <div className="p-4 bg-dark-800/50 rounded-xl space-y-3">
                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="Current Password" />
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="New Password" />
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white" placeholder="Confirm New Password" />
                        <button onClick={handlePasswordChange} className="px-4 py-2 rounded-lg bg-orange-500 text-white">Update Password</button>
                    </div>
                )}
            </div>

            {/* Data Management */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
                <h3 className="font-display text-lg font-semibold text-white">📦 Data Management</h3>
                <div className="flex flex-wrap gap-3">
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 hover:bg-green-500/30">
                        <FaDownload /> Export Data
                    </button>
                    <button onClick={handleImport} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
                        <FaUpload /> Import Data
                    </button>
                    <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30">
                        <FaUndo /> Reset to Defaults
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SettingsEditor;
