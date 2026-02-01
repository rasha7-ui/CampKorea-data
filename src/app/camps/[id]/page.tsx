import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MapPin, Phone, Globe, Flame, Users, Calendar,
    Trees, ChevronLeft, Star, Share2, Heart,
    Wifi, Droplets, ShowerHead, Car
} from 'lucide-react';
import { mockCampsites } from '@/data/campsites';

interface CampDetailPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return mockCampsites.map((camp) => ({
        id: camp.contentId,
    }));
}

export async function generateMetadata({ params }: CampDetailPageProps) {
    const { id } = await params;
    const camp = mockCampsites.find((c) => c.contentId === id);
    if (!camp) return { title: '캠핑장을 찾을 수 없습니다' };

    return {
        title: `${camp.facltNm} - CampKorea`,
        description: camp.lineIntro,
    };
}

export default async function CampDetailPage({ params }: CampDetailPageProps) {
    const { id } = await params;
    const camp = mockCampsites.find((c) => c.contentId === id);

    if (!camp) {
        notFound();
    }

    // 바닥재질 데이터
    const siteBottoms = [
        { label: '잔디', count: camp.siteBottomCl1, color: 'bg-green-500' },
        { label: '파쇄석', count: camp.siteBottomCl2, color: 'bg-gray-500' },
        { label: '데크', count: camp.siteBottomCl3, color: 'bg-amber-600' },
        { label: '자갈', count: camp.siteBottomCl4, color: 'bg-slate-500' },
        { label: '맨흙', count: camp.siteBottomCl5, color: 'bg-orange-700' },
    ].filter(item => item.count > 0);

    // 부대시설 파싱
    const facilities = camp.sbrsCl?.split(',').map(f => f.trim()) || [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Image */}
            <div className="relative h-[50vh] md:h-[60vh]">
                <Image
                    src={camp.firstImageUrl}
                    alt={camp.facltNm}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <Link
                    href="/camps"
                    className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                    목록으로
                </Link>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <button className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
                        <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>
                    <button className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
                        <Heart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                    </button>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                                {camp.induty}
                            </span>
                            <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-semibold rounded-full">
                                {camp.lctCl}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                            {camp.facltNm}
                        </h1>
                        <div className="flex items-center gap-4 text-white/90">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{camp.doNm} {camp.sigunguNm}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">4.5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Introduction */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">소개</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                {camp.lineIntro}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {camp.intro}
                            </p>
                            {camp.featureNm && (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">특징: </span>
                                    <span className="text-emerald-600">{camp.featureNm}</span>
                                </div>
                            )}
                        </section>

                        {/* Facilities */}
                        <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">부대시설</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {facilities.map((facility) => {
                                    let Icon = Trees;
                                    if (facility.includes('전기')) Icon = Wifi;
                                    if (facility.includes('온수') || facility.includes('샤워')) Icon = ShowerHead;
                                    if (facility.includes('화장실')) Icon = Droplets;

                                    return (
                                        <div
                                            key={facility}
                                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {facility}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Site Types */}
                        {siteBottoms.length > 0 && (
                            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">사이트 바닥재질</h2>
                                <div className="space-y-3">
                                    {siteBottoms.map((site) => (
                                        <div key={site.label} className="flex items-center gap-4">
                                            <span className="w-16 text-sm text-gray-600 dark:text-gray-400">{site.label}</span>
                                            <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${site.color} rounded-full`}
                                                    style={{ width: `${Math.min(site.count, 100)}%` }}
                                                />
                                            </div>
                                            <span className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
                                                {site.count}면
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">연락처 정보</h3>

                            <div className="space-y-4">
                                {/* Address */}
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {camp.addr1}
                                        </div>
                                        {camp.addr2 && (
                                            <div className="text-sm text-gray-500">{camp.addr2}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-emerald-600" />
                                    <a href={`tel:${camp.tel}`} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">
                                        {camp.tel}
                                    </a>
                                </div>

                                {/* Homepage */}
                                {camp.homepage && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="w-5 h-5 text-emerald-600" />
                                        <a
                                            href={camp.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-emerald-600 hover:underline"
                                        >
                                            홈페이지 방문
                                        </a>
                                    </div>
                                )}
                            </div>

                            <hr className="my-5 border-gray-100 dark:border-gray-700" />

                            {/* Quick Info */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">화로대</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <Flame className="w-4 h-4 text-orange-500" />
                                        {camp.brazierCl}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">반려동물</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        {camp.animalCmgCl}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">운영기간</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        {camp.operPdCl}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">사업주체</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        {camp.facltDivNm}
                                    </span>
                                </div>
                            </div>

                            <hr className="my-5 border-gray-100 dark:border-gray-700" />

                            {/* Directions */}
                            {camp.direction && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Car className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">오시는 길</span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {camp.direction}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
