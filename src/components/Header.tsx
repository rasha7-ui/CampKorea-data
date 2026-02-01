'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Tent, MapPin, BarChart3, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: '홈', icon: Tent },
    { href: '/camps', label: '캠핑장 찾기', icon: Search },
    { href: '/map', label: '지도', icon: MapPin },
    { href: '/stats', label: '통계', icon: BarChart3 },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow">
                            <Tent className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            CampKorea
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-all"
                            >
                                <link.icon className="w-4 h-4" />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="메뉴 열기"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={cn(
                        'md:hidden overflow-hidden transition-all duration-300',
                        isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
                    )}
                >
                    <div className="flex flex-col gap-1 pt-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-300 dark:hover:text-emerald-400 dark:hover:bg-emerald-900/20 transition-all"
                            >
                                <link.icon className="w-5 h-5" />
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}
