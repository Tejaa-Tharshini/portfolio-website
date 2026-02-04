import { usePortfolioData } from '../hooks/usePortfolioData';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import LinksSection from '../components/sections/LinksSection';

function SinglePage() {
    const { data, loading } = usePortfolioData();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Hero - No slide, centered */}
            <HeroSection data={data?.profile} />

            {/* About - Slide from LEFT */}
            <AboutSection data={data?.about} slideFrom="left" />

            {/* Projects / Latest Work - Slide from RIGHT */}
            <ProjectsSection data={data?.projects} slideFrom="right" />

            {/* Skills - Slide from LEFT */}
            <SkillsSection data={data?.skills} slideFrom="left" />

            {/* Experience - Slide from RIGHT */}
            <ExperienceSection data={data?.experience} slideFrom="right" />

            {/* Links / Contact - Slide from LEFT */}
            <LinksSection data={data?.links} slideFrom="left" />
        </div>
    );
}

export default SinglePage;
