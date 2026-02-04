import { useState, useEffect } from 'react';

function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const duration = 2000; // 2 seconds total
        const interval = 20;
        const increment = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment + Math.random() * 2;
                if (next >= 100) {
                    clearInterval(timer);
                    // Start exit animation
                    setTimeout(() => {
                        setIsExiting(true);
                        setTimeout(() => {
                            onComplete?.();
                        }, 600);
                    }, 300);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div
            className={`
                fixed inset-0 z-[99999] flex items-center justify-center
                bg-dark-950 transition-all duration-600 ease-out
                ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
            `}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    w-[600px] h-[600px] rounded-full 
                    bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-transparent
                    blur-3xl animate-pulse"
                />
            </div>

            {/* Content */}
            <div className="relative text-center">
                {/* Logo / Name */}
                <div className={`mb-8 transition-all duration-700 ${progress > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
                        <span className="gradient-text">TT</span>
                    </h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">
                        Tejaa Tharshini
                    </p>
                </div>

                {/* Progress bar */}
                <div className={`w-48 mx-auto transition-all duration-500 ${progress > 10 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <p className="mt-4 text-gray-500 text-xs font-mono">
                        {Math.floor(Math.min(progress, 100))}%
                    </p>
                </div>

                {/* Loading text */}
                <div className={`mt-8 transition-all duration-500 delay-300 ${progress > 30 ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;
