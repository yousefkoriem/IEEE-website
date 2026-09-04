import React, { useState, useEffect } from 'react';
import { useAllArticles } from '../../hooks/useApi';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

import defaultImage from "../../assets/images/heroImage1.png";

export default function Events() {
    const { data: articles, isLoading } = useAllArticles();
    
    // Fetch articles directly from API. Filter by "Events" category or take top articles
    const eventsData = React.useMemo(() => {
        if (!Array.isArray(articles) || articles.length === 0) return [];
        const eventsCategoryArticles = articles.filter(a => a.categoryName === "Events");
        return eventsCategoryArticles.length > 0 
            ? eventsCategoryArticles.slice(0, 3) 
            : articles.slice(0, 3);
    }, [articles]);

    // State for auto-cycle (0 = middle open, 1 = ends open)
    const [cycleStep, setCycleStep] = useState<number>(0);
    // State for hover tracking
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Auto-sliding interval (every 4 seconds) — pauses when user hovers over any card
    useEffect(() => {
        if (hoveredIndex !== null) return;

        const interval = setInterval(() => {
            setCycleStep((prev) => (prev === 0 ? 1 : 0));
        }, 4000); 

        return () => clearInterval(interval);
    }, [hoveredIndex]);

    return (
        <section className="relative w-full overflow-hidden pt-8 sm:pt-10 pb-20 sm:pb-40 min-h-screen bg-white">
            {/* Background Circles */}
            <div className="absolute top-[-633px] left-[-607px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full opacity-40 sm:opacity-80 pointer-events-none" />
            <div className="absolute top-[838px] right-[-480px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full opacity-40 sm:opacity-100 pointer-events-none" />
            <div className="absolute top-[935px] right-[-200px] w-[961px] h-[961px] bg-[#E6DBF2] rounded-full opacity-40 sm:opacity-100 pointer-events-none" />
            
            {/* Main Content Container */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Title & Description Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-4xl space-y-4 sm:space-y-6 text-center"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-[#000640]">
                        Our Events & <span className="text-[#5A10A5]">Activities</span>
                    </h1>
                    <p className="text-[#293A8F] leading-relaxed text-sm sm:text-lg max-w-2xl mx-auto px-2">
                        Explore the events, workshops, and activities organized or participated in by our IEEE branch.
                        These events reflect our commitment to knowledge sharing, technical development,
                        and building a strong community of future engineers and innovators.
                    </p>
                </motion.div>

                {/* Cards Container with Staggered Scale-In Entrance */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            }
                        },
                        hidden: {}
                    }}
                    className="mt-10 sm:mt-20 flex flex-col md:flex-row justify-center gap-10 sm:gap-16 lg:gap-[200px] items-center w-full max-w-7xl mx-auto px-4"
                >
                    {eventsData.map((event, index) => {
                        const isCenter = index === 1;
                        const isDefaultOpen = cycleStep === 0 ? isCenter : !isCenter;
                        const isHovered = hoveredIndex === index;
                        // When user hovers over a card, that card is ALWAYS open, and auto-cycle is paused
                        const isOpen = hoveredIndex !== null ? isHovered : isDefaultOpen;

                        return (
                            <motion.div 
                                key={event.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.85, y: 30 },
                                    visible: { 
                                        opacity: 1, 
                                        scale: 1, 
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                                    }
                                }}
                                className="relative w-[230px] sm:w-[250px] h-[400px] sm:h-[452px] group"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
                            >
                                {/* Slide-left Revealed Text Panel ("Book Opening") */}
                                <div className={`absolute top-0 left-0 w-[240px] sm:w-[280px] h-[400px] sm:h-[452px] bg-white border border-[#5A10A5] rounded-[32px] p-6 sm:p-8 pr-12 sm:pr-16 z-0 flex flex-col justify-center text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
                                    ${isOpen ? '-translate-x-[75px] sm:-translate-x-[160px] opacity-100 shadow-xl' : 'translate-x-0 opacity-0 pointer-events-none'}`}>
                                    <h2 className="text-[#480D84] text-xl sm:text-2xl font-bold mb-3 sm:mb-4 line-clamp-2">{event.title}</h2>
                                    <p className="text-[#1C1A1A] text-xs sm:text-sm leading-relaxed line-clamp-5 sm:line-clamp-6">{event.description}</p>
                                </div>

                                {/* Front Image Card Container */}
                                <div className={`relative w-[230px] sm:w-[250px] h-[400px] sm:h-[452px] z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden
                                    ${isOpen ? 'shadow-[15px_0_30px_-10px_rgba(109,16,165,0.5)] sm:shadow-[25px_0_40px_-10px_rgba(109,16,165,0.5)] scale-[1.02]' : 'shadow-md scale-100'}`}>
                                    <img 
                                        src={event.photo || defaultImage} 
                                        alt={event.title} 
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            if (target.src !== defaultImage) {
                                                target.src = defaultImage;
                                            }
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                                    />
                                    
                                    {/* Discover Button CTA */}
                                    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 
                                        ${isOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-10 opacity-0 invisible'}`}>
                                        <Link 
                                            to={`/article/${event.id}`} 
                                            className="flex items-center justify-center gap-2 w-full bg-[#5A10A5] text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 rounded-full hover:bg-[#480D84] transition-all duration-200 shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95"
                                        >
                                            Discover
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 16 16 12 12 8"></polyline>
                                                <line x1="8" y1="12" x2="16" y2="12"></line>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Slider Dots */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-12 sm:mt-24 flex justify-center items-center gap-3"
                >
                    <button 
                        onClick={() => setCycleStep(0)} 
                        aria-label="First slide group"
                        className={`w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full shadow-sm cursor-pointer transition-all duration-300 ${cycleStep === 0 ? 'bg-[#5A10A5] scale-110' : 'bg-[#CCB5E3] opacity-60 hover:opacity-100 scale-100'}`}
                    />
                    <button 
                        onClick={() => setCycleStep(1)} 
                        aria-label="Second slide group"
                        className={`w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full shadow-sm cursor-pointer transition-all duration-300 ${cycleStep === 1 ? 'bg-[#5A10A5] scale-110' : 'bg-[#CCB5E3] opacity-60 hover:opacity-100 scale-100'}`}
                    />
                </motion.div>

                {/* Discover More CTA Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-6 sm:mt-10 flex justify-center"
                >
                    <Link 
                        to="/events" 
                        className="inline-block bg-[#5A10A5] text-white text-center text-base sm:text-lg font-semibold px-10 sm:px-16 py-3 rounded-full hover:bg-[#480D84] transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 min-w-[200px] sm:min-w-[250px]"
                    >
                        Discover more
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
