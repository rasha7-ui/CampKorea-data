import Link from 'next/link';
import { MapPin, ExternalLink, Phone, Navigation } from 'lucide-react';
import { mockCampsites } from '@/data/campsites';

export const metadata = {
    title: '캠핑장 지도 - CampKorea',
    description: '전국 캠핑장을 지도에서 확인하세요. 위치 기반으로 주변 캠핑장을 찾아보세요.',
};

export default function MapPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">캠핑장 지도</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            전국 {mockCampsites.length}개 캠핑장 위치
                        </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        <Navigation className="w-4 h-4" />
                        내 위치
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)]">
                {/* Map Placeholder */}
                <div className="flex-1 relative bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-800 dark:to-gray-900">
                    {/* Map would go here - using placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md">
                            <MapPin className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                지도 영역
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                실제 서비스에서는 Kakao Maps 또는 Naver Maps API를 연동하여
                                전국 캠핑장 위치를 지도에 표시합니다.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {mockCampsites.slice(0, 3).map(camp => (
                                    <span
                                        key={camp.contentId}
                                        className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm rounded-full"
                                    >
                                        📍 {camp.facltNm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Fake Map Markers */}
                    {mockCampsites.map((camp, index) => (
                        <div
                            key={camp.contentId}
                            className="absolute w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform animate-pulse"
                            style={{
                                left: `${20 + (index * 12) % 60}%`,
                                top: `${15 + (index * 15) % 60}%`,
                                animationDelay: `${index * 0.2}s`,
                            }}
                        >
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                    ))}
                </div>

                {/* Sidebar List */}
                <div className="w-full lg:w-96 bg-white dark:bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <input
                            type="text"
                            placeholder="캠핑장 검색..."
                            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {mockCampsites.map((camp) => (
                            <Link
                                key={camp.contentId}
                                href={`/camps/${camp.contentId}`}
                                className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                            {camp.facltNm}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {camp.addr1}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                                                {camp.induty}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                {camp.lctCl}
                                            </span>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
