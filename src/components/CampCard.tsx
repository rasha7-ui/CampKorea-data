import Link from 'next/link';
import Image from 'next/image';
import { Campsite } from '@/types/campsite';
import { MapPin, Users, Flame, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampCardProps {
    camp: Campsite;
    featured?: boolean;
}

export default function CampCard({ camp, featured = false }: CampCardProps) {
    return (
        <Link
            href={`/camps/${camp.contentId}`}
            className={cn(
                'group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1',
                featured && 'md:col-span-2 md:row-span-2'
            )}
        >
            {/* Image */}
            <div className={cn('relative overflow-hidden', featured ? 'h-72 md:h-96' : 'h-48')}>
                <Image
                    src={camp.firstImageUrl}
                    alt={camp.facltNm}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                        {camp.induty}
                    </span>
                    <span className="px-3 py-1 bg-white/90 text-gray-800 text-xs font-semibold rounded-full">
                        {camp.lctCl}
                    </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={cn(
                        'font-bold text-white drop-shadow-lg',
                        featured ? 'text-2xl md:text-3xl' : 'text-lg'
                    )}>
                        {camp.facltNm}
                    </h3>
                    <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{camp.doNm} {camp.sigunguNm}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                    {camp.lineIntro}
                </p>

                {/* Facilities */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {camp.brazierCl === '개별' && (
                        <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                            <Flame className="w-3 h-3" />
                            화로대
                        </span>
                    )}
                    {camp.animalCmgCl?.includes('가능') && (
                        <span className="flex items-center gap-1 text-xs text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-full">
                            <Users className="w-3 h-3" />
                            반려동물
                        </span>
                    )}
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-500" />
                        <span className="text-sm font-medium">4.5</span>
                    </div>
                    <span className="text-xs text-gray-500">
                        {camp.operPdCl}
                    </span>
                </div>
            </div>
        </Link>
    );
}
