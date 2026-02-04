import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { FaQuoteLeft } from 'react-icons/fa';

function TestimonialsSection({ data, slideFrom = 'left' }) {
    const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const slideClass = slideFrom === 'left' ? 'slide-from-left' : 'slide-from-right';

    if (!data || data.length === 0) return null;

    return (
        <section
            id="testimonials"
            className={`py-32 relative slide-section ${slideClass} ${isVisible ? 'visible' : ''}`}
            ref={sectionRef}
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-primary-400 text-sm font-medium tracking-widest uppercase mb-4">
                        Testimonials
                    </p>
                    <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                        What <span className="gradient-text">Clients Say</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Feedback from people I've had the pleasure of working with.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {data.map((testimonial, index) => (
                        <div
                            key={testimonial.id || index}
                            className="group relative"
                            style={{
                                transitionDelay: `${index * 150}ms`,
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {/* Card */}
                            <div className="h-full p-8 rounded-3xl bg-dark-800/30 border border-white/5
                                hover:border-primary-500/20 hover:bg-dark-800/50 
                                transition-all duration-500 group-hover:-translate-y-2">

                                {/* Quote icon */}
                                <div className="mb-6">
                                    <FaQuoteLeft className="text-3xl text-primary-500/30 group-hover:text-primary-500/50 transition-colors" />
                                </div>

                                {/* Quote text */}
                                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light italic">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author info */}
                                <div className="flex items-center gap-4">
                                    {/* Avatar placeholder */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 
                                        flex items-center justify-center text-white font-bold text-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role}
                                            {testimonial.company && (
                                                <span>, {testimonial.company}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle glow effect */}
                            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary-500/0 to-accent-500/0 
                                group-hover:from-primary-500/10 group-hover:to-accent-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
