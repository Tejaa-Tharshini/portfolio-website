import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CursorTrail from './components/CursorTrail';
import LoadingScreen from './components/LoadingScreen';
import SinglePage from './pages/SinglePage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

// Lerp function for smooth interpolation
const lerp = (start, end, factor) => start + (end - start) * factor;

// Global Mouse Parallax Hook (Artemi Lebedev style)
function useGlobalParallax() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const animate = () => {
            // Very slow easing for cinematic feel
            const easing = 0.04;

            currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, easing);
            currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, easing);

            setSmoothPos({
                x: currentRef.current.x,
                y: currentRef.current.y
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize to -1 to 1 range from center of viewport
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            targetRef.current = { x, y };
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return smoothPos;
}

function ParallaxBackground() {
    const smoothPos = useGlobalParallax();

    // Stronger movement for background blobs
    const moveX = smoothPos.x * 40;
    const moveY = smoothPos.y * 30;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Aurora Blobs with enhanced parallax */}
            <div
                className="bg-blob bg-blob-1"
                style={{
                    transform: `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            />
            <div
                className="bg-blob bg-blob-2"
                style={{
                    transform: `translate(${moveX * -1.2}px, ${moveY * -1.2}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            />
            <div
                className="bg-blob bg-blob-3"
                style={{
                    transform: `translate(${moveX * 0.8}px, ${moveY * 0.8}px)`,
                    transition: 'transform 0.1s ease-out'
                }}
            />
        </div>
    );
}

// Parallax Container - wraps content with 3D perspective shift
function ParallaxContent({ children }) {
    const smoothPos = useGlobalParallax();

    // Subtle rotation and translation for 3D effect
    const rotateY = smoothPos.x * 1.5; // degrees
    const rotateX = smoothPos.y * -1; // degrees (inverted for natural feel)
    const translateX = smoothPos.x * 8; // pixels
    const translateY = smoothPos.y * 5; // pixels

    return (
        <div
            className="relative z-10"
            style={{
                perspective: '1200px',
                perspectiveOrigin: '50% 50%'
            }}
        >
            <div
                style={{
                    transform: `
                        rotateY(${rotateY}deg) 
                        rotateX(${rotateX}deg)
                        translate3d(${translateX}px, ${translateY}px, 0)
                    `,
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.05s ease-out'
                }}
            >
                {children}
            </div>
        </div>
    );
}

function MainLayout() {
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <LoadingScreen onComplete={() => setIsLoading(false)} />;
    }

    return (
        <>
            <CursorTrail />
            <CustomCursor />
            <ParallaxBackground />
            <Navbar />
            <ParallaxContent>
                <main>
                    <SinglePage />
                </main>
                <Footer />
            </ParallaxContent>
        </>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
