import Link from 'next/link';
import { Suspense } from 'react';
import { Filter, Grid3X3, List, Search } from 'lucide-react';
import CampCard from '@/components/CampCard';
import { mockCampsites } from '@/data/campsites';
import { INDUTY_OPTIONS, LCT_OPTIONS, SEASON_OPTIONS } from '@/types/campsite';

export const metadata = {
    title: '캠핑장 찾기 - CampKorea',
    description: '전국 캠핑장을 검색하고 필터링하세요. 지역별, 유형별, 테마별로 원하는 캠핑장을 찾아보세요.',
};

// 필터 컴포넌트
function FilterSection() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">필터</h2>
            </div>

            {/* Search */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    검색
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="캠핑장 이름 검색..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    캠핑장 유형
                </label>
                <div className="flex flex-wrap gap-2">
                    {INDUTY_OPTIONS.map((type) => (
                        <button
                            key={type}
                            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    입지
                </label>
                <div className="flex flex-wrap gap-2">
                    {LCT_OPTIONS.map((lct) => (
                        <button
                            key={lct}
                            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                            {lct}
                        </button>
                    ))}
                </div>
            </div>

            {/* Season Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    운영 시즌
                </label>
                <div className="flex flex-wrap gap-2">
                    {SEASON_OPTIONS.map((season) => (
                        <button
                            key={season}
                            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                        >
                            {season}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function CampsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        캠핑장 찾기
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        전국 {mockCampsites.length}개의 캠핑장 중에서 원하는 곳을 찾아보세요
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <FilterSection />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                검색 결과 <span className="font-semibold text-emerald-600">{mockCampsites.length}</span>개
                            </div>
                            <div className="flex items-center gap-2">
                                <select className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none">
                                    <option>최신순</option>
                                    <option>이름순</option>
                                    <option>인기순</option>
                                </select>
                                <div className="flex gap-1 ml-2">
                                    <button className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Campsite Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {mockCampsites.map((camp) => (
                                <CampCard key={camp.contentId} camp={camp} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-10 text-center">
                            <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/25">
                                더 많은 캠핑장 보기
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
