import Link from 'next/link';
import { Search, MapPin, Tent, Trees, Waves, Mountain, ChevronRight } from 'lucide-react';
import CampCard from '@/components/CampCard';
import { mockCampsites, getRegions, getIndutyCounts } from '@/data/campsites';

// 테마 카테고리
const themes = [
  { icon: Mountain, label: '산', color: 'from-green-500 to-emerald-600' },
  { icon: Trees, label: '숲', color: 'from-emerald-500 to-teal-600' },
  { icon: Waves, label: '해변', color: 'from-blue-500 to-cyan-600' },
  { icon: Tent, label: '글램핑', color: 'from-purple-500 to-pink-600' },
];

export default function HomePage() {
  const regions = getRegions();
  const indutyCounts = getIndutyCounts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            자연 속에서 찾는
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              특별한 캠핑
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 animate-fade-in stagger-1">
            전국 {mockCampsites.length}개 이상의 캠핑장에서 당신만의 힐링 공간을 찾아보세요
          </p>

          {/* Search Box */}
          <div className="animate-slide-up stagger-2">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="캠핑장 이름 또는 지역 검색..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder:text-gray-400"
                  />
                </div>
                <Link
                  href="/camps"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  <Search className="w-5 h-5" />
                  검색하기
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-in stagger-3">
            {indutyCounts.slice(0, 4).map((item) => (
              <div key={item.induty} className="text-center">
                <div className="text-2xl font-bold text-white">{item.count}+</div>
                <div className="text-white/70 text-sm">{item.induty}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Theme Categories */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              테마별 캠핑장
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              원하는 분위기의 캠핑장을 찾아보세요
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <Link
                key={theme.label}
                href={`/camps?lct=${theme.label}`}
                className="group relative h-40 rounded-2xl overflow-hidden card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                <div className="relative h-full flex flex-col items-center justify-center text-white">
                  <theme.icon className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">{theme.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campsites */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                인기 캠핑장
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                가장 인기있는 캠핑장을 확인해보세요
              </p>
            </div>
            <Link
              href="/camps"
              className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              전체보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCampsites.slice(0, 3).map((camp, index) => (
              <CampCard key={camp.contentId} camp={camp} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Region Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              지역별 캠핑장
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              가고 싶은 지역의 캠핑장을 찾아보세요
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {regions.map((region) => (
              <Link
                key={region.doNm}
                href={`/camps?do=${region.doNm}`}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all card-hover"
              >
                <MapPin className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900 dark:text-white text-sm">
                  {region.doNm}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {region.count}개
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Campsites Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                추천 캠핑장
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                다양한 캠핑장을 둘러보세요
              </p>
            </div>
            <Link
              href="/camps"
              className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              더보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCampsites.slice(3).map((camp) => (
              <CampCard key={camp.contentId} camp={camp} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            지금 바로 캠핑을 시작하세요
          </h2>
          <p className="text-white/90 text-lg mb-8">
            CampKorea와 함께 특별한 자연 속 경험을 만들어 보세요
          </p>
          <Link
            href="/camps"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Tent className="w-5 h-5" />
            캠핑장 찾아보기
          </Link>
        </div>
      </section>
    </div>
  );
}
