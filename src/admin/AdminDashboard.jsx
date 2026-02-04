import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaHome, FaUser, FaProjectDiagram, FaCode, FaBriefcase, FaLink, FaCog, FaSignOutAlt, FaGraduationCap } from 'react-icons/fa';
import ProfileEditor from './editors/ProfileEditor';
import AboutEditor from './editors/AboutEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import SkillsEditor from './editors/SkillsEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import LinksEditor from './editors/LinksEditor';
import SettingsEditor from './editors/SettingsEditor';

const menuItems = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'about', label: 'About', icon: FaHome },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'skills', label: 'Skills', icon: FaCode },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'links', label: 'Links', icon: FaLink },
    { id: 'settings', label: 'Settings', icon: FaCog },
];

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('profile');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { isAuthenticated, loading: authLoading, logout } = useAuth();
    const portfolioData = usePortfolioData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, authLoading, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    if (authLoading || portfolioData.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-950">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const renderEditor = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileEditor data={portfolioData.data?.profile} onSave={portfolioData.updateProfile} />;
            case 'about':
                return <AboutEditor data={portfolioData.data?.about} onSave={portfolioData.updateAbout} portfolioData={portfolioData} />;
            case 'projects':
                return <ProjectsEditor data={portfolioData.data?.projects} portfolioData={portfolioData} />;
            case 'skills':
                return <SkillsEditor data={portfolioData.data?.skills} portfolioData={portfolioData} />;
            case 'experience':
                return <ExperienceEditor data={portfolioData.data?.experience} portfolioData={portfolioData} />;
            case 'links':
                return <LinksEditor data={portfolioData.data?.links} portfolioData={portfolioData} />;
            case 'settings':
                return <SettingsEditor data={portfolioData.data?.footer} onSave={portfolioData.updateFooter} portfolioData={portfolioData} />;
            default:
                return <ProfileEditor data={portfolioData.data?.profile} onSave={portfolioData.updateProfile} />;
        }
    };

    return (
        <div className="min-h-screen bg-dark-950 flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-dark-900 border-r border-white/10 transition-all duration-300 flex flex-col`}>
                {/* Logo */}
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <img
                            src={portfolioData.data?.siteSettings?.logoData || portfolioData.data?.siteSettings?.logoUrl || '/logo.png'}
                            alt="Logo"
                            className="w-10 h-10 object-contain"
                        />
                        {sidebarOpen && (
                            <div>
                                <h2 className="font-display font-bold text-white">Admin</h2>
                                <p className="text-xs text-gray-500">Portfolio Manager</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                                ? 'bg-primary-500/20 text-primary-400'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={18} />
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <FaHome size={18} />
                        {sidebarOpen && <span>View Portfolio</span>}
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <FaSignOutAlt size={18} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <header className="sticky top-0 z-10 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display text-2xl font-bold text-white capitalize">
                                {activeSection}
                            </h1>
                            <p className="text-gray-500 text-sm">
                                Manage your {activeSection} content
                            </p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-white/5 text-gray-400"
                        >
                            ☰
                        </button>
                    </div>
                </header>

                {/* Editor Content */}
                <div className="p-8">
                    {renderEditor()}
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
