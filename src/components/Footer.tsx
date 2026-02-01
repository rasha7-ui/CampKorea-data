import Link from 'next/link';
import { Tent, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                <Tent className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">CampKorea</span>
                        </Link>
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            전국의 아름다운 캠핑장을 한눈에! CampKorea와 함께 특별한 캠핑 경험을 시작하세요.
                            자연 속에서 힐링하는 시간을 만들어 드립니다.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">바로가기</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/camps" className="hover:text-emerald-400 transition-colors">
                                    캠핑장 찾기
                                </Link>
                            </li>
                            <li>
                                <Link href="/map" className="hover:text-emerald-400 transition-colors">
                                    지도로 보기
                                </Link>
                            </li>
                            <li>
                                <Link href="/stats" className="hover:text-emerald-400 transition-colors">
                                    통계
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">문의하기</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                <span>info@campkorea.kr</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-emerald-500" />
                                <span>02-1234-5678</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-500" />
                                <span>서울특별시 강남구</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
                    <p>© 2024 CampKorea. All rights reserved.</p>
                    <p className="mt-1">
                        데이터 출처: 한국문화정보원, 한국관광공사
                    </p>
                </div>
            </div>
        </footer>
    );
}
