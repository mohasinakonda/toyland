"use client";

import Link from "next/link";

const PLAY_WORLDS = [
    {
        id: "action-figures",
        slug: "action-figures-playsets",
        title: "Action Figures & Playsets",
        emoji: "🦸‍♂️",
        gradient: "from-[#7c3aed] via-[#a855f7] to-[#c084fc]",
        glow: "shadow-[0_8px_40px_rgba(168,85,247,0.35)]",
        hoverGlow: "hover:shadow-[0_12px_50px_rgba(168,85,247,0.5)]",
        ringColor: "ring-purple-300/40",
        bgAccent: "bg-purple-500/5",
        textColor: "text-purple-700",
        dotColor: "bg-purple-400",
    },
    {
        id: "active-outdoors",
        slug: "active-outdoors",
        title: "Active Outdoors",
        emoji: "🏕️",
        gradient: "from-[#ea580c] via-[#f97316] to-[#fb923c]",
        glow: "shadow-[0_8px_40px_rgba(249,115,22,0.35)]",
        hoverGlow: "hover:shadow-[0_12px_50px_rgba(249,115,22,0.5)]",
        ringColor: "ring-orange-300/40",
        bgAccent: "bg-orange-500/5",
        textColor: "text-orange-700",
        dotColor: "bg-orange-400",
    },
    {
        id: "building-blocks",
        slug: "building-blocks",
        title: "Building & Blocks",
        emoji: "🧱",
        gradient: "from-[#2563eb] via-[#3b82f6] to-[#60a5fa]",
        glow: "shadow-[0_8px_40px_rgba(59,130,246,0.35)]",
        hoverGlow: "hover:shadow-[0_12px_50px_rgba(59,130,246,0.5)]",
        ringColor: "ring-blue-300/40",
        bgAccent: "bg-blue-500/5",
        textColor: "text-blue-700",
        dotColor: "bg-blue-400",
    },
    {
        id: "creative-arts",
        slug: "creative-arts-crafts",
        title: "Creative Arts & Crafts",
        emoji: "🎨",
        gradient: "from-[#d97706] via-[#f59e0b] to-[#fbbf24]",
        glow: "shadow-[0_8px_40px_rgba(245,158,11,0.35)]",
        hoverGlow: "hover:shadow-[0_12px_50px_rgba(245,158,11,0.5)]",
        ringColor: "ring-amber-300/40",
        bgAccent: "bg-amber-500/5",
        textColor: "text-amber-700",
        dotColor: "bg-amber-400",
    },
    {
        id: "educational-stem",
        slug: "educational-stem",
        title: "Educational & STEM",
        emoji: "🔬",
        gradient: "from-[#059669] via-[#10b981] to-[#34d399]",
        glow: "shadow-[0_8px_40px_rgba(16,185,129,0.35)]",
        hoverGlow: "hover:shadow-[0_12px_50px_rgba(16,185,129,0.5)]",
        ringColor: "ring-emerald-300/40",
        bgAccent: "bg-emerald-500/5",
        textColor: "text-emerald-700",
        dotColor: "bg-emerald-400",
    },
];

export default function ExplorePlayWorlds() {
    return (
        <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 text-center select-none overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle, #a855f7 1px, transparent 1px), radial-gradient(circle, #f97316 1px, transparent 1px)`,
                backgroundSize: '40px 40px, 60px 60px',
                backgroundPosition: '0 0, 30px 30px',
            }} />
            {/* <div className="flex items-center justify-center min-h-screen bg-teal-600">
                <h1 className="text-6xl font-black text-teal-800 [text-shadow:_0_1px_0_rgba(255,255,255,0.3),_0_-1px_0_rgba(0,0,0,0.7)]">
                    Engraved
                </h1>
            </div> */}
            <div className="relative max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/50 mb-5">
                        <span className="text-sm">✨</span>
                        <span className="text-xs font-bold text-purple-600 tracking-wide uppercase">
                            Categories
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1e293b] tracking-tight mb-4 font-black [text-shadow:_0_1px_0_rgba(255,255,255,0.3),_0_-1px_0_rgba(0,0,0,0.7)]">
                        Explore Play Worlds
                    </h2>
                    <p className="text-base sm:text-lg text-zinc-500 font-medium max-w-lg mx-auto leading-relaxed">
                        Choose a theme and spark your child&apos;s creativity instantly!
                    </p>
                </div>

                {/* 3D Shelf Container */}
                <div className="relative">
                    {/* Shelf back wall */}
                    <div className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-6 sm:-inset-y-8 bg-gradient-to-b from-[#f5f0e8] via-[#efe8dc] to-[#e8dfd2] rounded-[2rem] sm:rounded-[2.5rem] border border-[#d4c9b8]/40" />
                    {/* Shelf inner shadow */}
                    <div className="absolute -inset-x-4 sm:-inset-x-8 -inset-y-6 sm:-inset-y-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-[inset_0_4px_20px_rgba(0,0,0,0.06),inset_0_-2px_10px_rgba(255,255,255,0.7)]" />
                    {/* Shelf top highlight */}
                    <div className="absolute -inset-x-4 sm:-inset-x-8 top-[-1.5rem] sm:top-[-2rem] h-4 bg-gradient-to-b from-white/60 to-transparent rounded-t-[2rem] sm:rounded-t-[2.5rem]" />

                    {/* Categories Grid */}
                    <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 p-2 sm:p-4">
                        {PLAY_WORLDS.map((world, idx) => (
                            <Link
                                key={world.id}
                                href={`/products?category=${world.slug}`}
                                className={`group relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-[1.25rem] sm:rounded-[1.5rem] bg-white/80 backdrop-blur-sm border border-white/60 ${world.glow} ${world.hoverGlow} ring-1 ${world.ringColor} transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.97]`}
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                {/* Glossy inner highlight */}
                                <div className="absolute inset-x-3 top-2 h-[45%] bg-gradient-to-b from-white/70 to-transparent rounded-t-[1rem] pointer-events-none" />

                                {/* Emoji Icon with gradient glow ring */}
                                <div className="relative mb-4">
                                    {/* Gradient circle behind emoji */}
                                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${world.gradient} p-[3px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        <div className="w-full h-full rounded-[13px] bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-inner">
                                            <span className="text-3xl sm:text-4xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110">
                                                {world.emoji}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Pulsing dot indicator */}
                                    <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 ${world.dotColor} rounded-full border-2 border-white shadow-sm`}>
                                        <div className={`absolute inset-0 ${world.dotColor} rounded-full animate-ping opacity-40`} />
                                    </div>
                                </div>

                                {/* Label */}
                                <span className={`text-xs sm:text-sm font-extrabold ${world.textColor} text-center leading-tight line-clamp-2 transition-colors`}>
                                    {world.title}
                                </span>

                                {/* Bottom gradient accent line */}
                                <div className={`absolute bottom-0 left-4 right-4 h-1 rounded-full bg-gradient-to-r ${world.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}