import { mockCampsites, getRegions, getIndutyCounts } from '@/data/campsites';
import { BarChart3, MapPin, Tent, Trees, TrendingUp } from 'lucide-react';

export const metadata = {
    title: '캠핑장 통계 - CampKorea',
    description: '전국 캠핑장 분포 및 유형별 통계를 확인하세요.',
};

export default function StatsPage() {
    const regions = getRegions();
    const indutyCounts = getIndutyCounts();

    // 입지별 통계
    const lctCounts: Record<string, number> = {};
    mockCampsites.forEach(camp => {
        lctCounts[camp.lctCl] = (lctCounts[camp.lctCl] || 0) + 1;
    });

    // 총 사이트 수 계산
    const totalSites = mockCampsites.reduce((sum, camp) =>
        sum + camp.siteBottomCl1 + camp.siteBottomCl2 + camp.siteBottomCl3 + camp.siteBottomCl4 + camp.siteBottomCl5, 0
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        캠핑장 통계
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        전국 캠핑장 데이터 분석 및 통계
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <Tent className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {mockCampsites.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">전체 캠핑장</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {regions.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">등록 지역</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Trees className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {totalSites}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">총 사이트 수</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {indutyCounts.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">캠핑장 유형</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Region Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">지역별 분포</h2>
                        </div>
                        <div className="space-y-4">
                            {regions.map((region) => {
                                const percentage = (region.count / mockCampsites.length) * 100;
                                return (
                                    <div key={region.doNm}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {region.doNm}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {region.count}개 ({percentage.toFixed(0)}%)
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Type Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-6">
                            <Tent className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">유형별 분포</h2>
                        </div>
                        <div className="space-y-4">
                            {indutyCounts.map((item) => {
                                const percentage = (item.count / mockCampsites.length) * 100;
                                const colors: Record<string, string> = {
                                    '일반야영장': 'from-green-500 to-emerald-500',
                                    '자동차야영장': 'from-blue-500 to-cyan-500',
                                    '글램핑': 'from-purple-500 to-pink-500',
                                    '카라반': 'from-orange-500 to-amber-500',
                                };
                                return (
                                    <div key={item.induty}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {item.induty}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {item.count}개 ({percentage.toFixed(0)}%)
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${colors[item.induty] || 'from-gray-500 to-gray-600'} rounded-full transition-all duration-500`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Location Type Stats */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Trees className="w-5 h-5 text-emerald-600" />
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">입지별 분포</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {Object.entries(lctCounts).map(([lct, count]) => {
                                const icons: Record<string, string> = {
                                    '산': '⛰️',
                                    '숲': '🌲',
                                    '해변': '🏖️',
                                    '강': '🏞️',
                                    '호수': '🌊',
                                    '도심': '🏙️',
                                };
                                return (
                                    <div
                                        key={lct}
                                        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center"
                                    >
                                        <div className="text-3xl mb-2">{icons[lct] || '📍'}</div>
                                        <div className="font-semibold text-gray-900 dark:text-white">{lct}</div>
                                        <div className="text-sm text-emerald-600">{count}개</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
