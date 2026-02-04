import { useState, useEffect, useCallback } from 'react';
import { defaultPortfolioData, generateId } from '../utils/defaultData';

const API_URL = '/api/data';

export function usePortfolioData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch data from backend
    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch data');
            const jsonData = await response.json();

            // If empty object (new file), use defaults
            if (Object.keys(jsonData).length === 0) {
                setData(defaultPortfolioData);
                // Optionally save defaults to server immediately
                saveToServer(defaultPortfolioData);
            } else {
                setData(jsonData);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
            // Fallback to defaults on error
            setData(defaultPortfolioData);
        } finally {
            setLoading(false);
        }
    }, []);

    // Save data to backend
    const saveToServer = async (newData) => {
        setIsSaving(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });

            if (!response.ok) throw new Error('Failed to save data');
            const result = await response.json();
            console.log('Data saved:', result);
        } catch (err) {
            console.error('Error saving data:', err);
            // Optionally show user error
        } finally {
            setIsSaving(false);
        }
    };

    // Load data on mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Save function - updates local state and saves to server
    const saveData = useCallback((newData) => {
        setData(newData);
        // Debounce or immediate save? Immediate for now to ensure consistency
        saveToServer(newData);
    }, []);

    // Update a specific section
    const updateSection = useCallback((section, value) => {
        if (!data) return;
        const newData = { ...data, [section]: value };
        saveData(newData);
    }, [data, saveData]);

    // Profile methods
    const updateProfile = useCallback((profile) => {
        updateSection('profile', profile);
    }, [updateSection]);

    // About methods
    const updateAbout = useCallback((about) => {
        updateSection('about', about);
    }, [updateSection]);

    // Projects methods
    const addProject = useCallback((project) => {
        const newProject = { ...project, id: generateId() };
        const newProjects = [...(data?.projects || []), newProject];
        updateSection('projects', newProjects);
        return newProject;
    }, [data, updateSection]);

    const updateProject = useCallback((id, project) => {
        const newProjects = data?.projects?.map(p => p.id === id ? { ...project, id } : p) || [];
        updateSection('projects', newProjects);
    }, [data, updateSection]);

    const deleteProject = useCallback((id) => {
        const newProjects = data?.projects?.filter(p => p.id !== id) || [];
        updateSection('projects', newProjects);
    }, [data, updateSection]);

    // Skills methods
    const updateSkills = useCallback((skills) => {
        updateSection('skills', skills);
    }, [updateSection]);

    const addSkillCategory = useCallback((category) => {
        const newCategory = { ...category, id: generateId(), skills: [] };
        const newCategories = [...(data?.skills?.categories || []), newCategory];
        updateSection('skills', { categories: newCategories });
        return newCategory;
    }, [data, updateSection]);

    const updateSkillCategory = useCallback((id, category) => {
        const newCategories = data?.skills?.categories?.map(c => c.id === id ? { ...category, id } : c) || [];
        updateSection('skills', { categories: newCategories });
    }, [data, updateSection]);

    const deleteSkillCategory = useCallback((id) => {
        const newCategories = data?.skills?.categories?.filter(c => c.id !== id) || [];
        updateSection('skills', { categories: newCategories });
    }, [data, updateSection]);

    // Experience methods
    const addExperience = useCallback((experience) => {
        const newExperience = { ...experience, id: generateId() };
        const newExperiences = [...(data?.experience || []), newExperience];
        updateSection('experience', newExperiences);
        return newExperience;
    }, [data, updateSection]);

    const updateExperience = useCallback((id, experience) => {
        const newExperiences = data?.experience?.map(e => e.id === id ? { ...experience, id } : e) || [];
        updateSection('experience', newExperiences);
    }, [data, updateSection]);

    const deleteExperience = useCallback((id) => {
        const newExperiences = data?.experience?.filter(e => e.id !== id) || [];
        updateSection('experience', newExperiences);
    }, [data, updateSection]);

    // Education methods (inside about)
    const addEducation = useCallback((education) => {
        const newEducation = { ...education, id: generateId() };
        const newEducations = [...(data?.about?.education || []), newEducation];
        updateSection('about', { ...data?.about, education: newEducations });
        return newEducation;
    }, [data, updateSection]);

    const updateEducation = useCallback((id, education) => {
        const newEducations = data?.about?.education?.map(e => e.id === id ? { ...education, id } : e) || [];
        updateSection('about', { ...data?.about, education: newEducations });
    }, [data, updateSection]);

    const deleteEducation = useCallback((id) => {
        const newEducations = data?.about?.education?.filter(e => e.id !== id) || [];
        updateSection('about', { ...data?.about, education: newEducations });
    }, [data, updateSection]);

    // Links methods
    const addLink = useCallback((link) => {
        const newLink = { ...link, id: generateId() };
        const newLinks = [...(data?.links || []), newLink];
        updateSection('links', newLinks);
        return newLink;
    }, [data, updateSection]);

    const updateLink = useCallback((id, link) => {
        const newLinks = data?.links?.map(l => l.id === id ? { ...link, id } : l) || [];
        updateSection('links', newLinks);
    }, [data, updateSection]);

    const deleteLink = useCallback((id) => {
        const newLinks = data?.links?.filter(l => l.id !== id) || [];
        updateSection('links', newLinks);
    }, [data, updateSection]);

    // Footer methods
    const updateFooter = useCallback((footer) => {
        updateSection('footer', footer);
    }, [updateSection]);

    // Site Settings methods (logo, favicon, site name)
    const updateSiteSettings = useCallback((siteSettings) => {
        updateSection('siteSettings', siteSettings);
    }, [updateSection]);

    // Reset to defaults
    const resetToDefaults = useCallback(() => {
        saveData(defaultPortfolioData);
    }, [saveData]);

    // Export data
    const exportData = useCallback(() => {
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }, [data]);

    // Import data
    const importData = useCallback((jsonString) => {
        try {
            const parsed = JSON.parse(jsonString);
            saveData(parsed);
            return true;
        } catch (e) {
            console.error('Failed to import data:', e);
            return false;
        }
    }, [saveData]);

    return {
        data,
        loading,
        error,
        isSaving,
        updateProfile,
        updateAbout,
        addProject,
        updateProject,
        deleteProject,
        updateSkills,
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addLink,
        updateLink,
        deleteLink,
        updateFooter,
        updateSiteSettings,
        resetToDefaults,
        exportData,
        importData
    };
}

