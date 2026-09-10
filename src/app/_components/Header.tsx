import SearchBar from '@/shared/SearchBar'
import Image from 'next/image'
import React from 'react'

export default function Header() {
    return (
        <div className="w-full min-h-screen flex justify-center items-center px-4 py-12">
            <div className="flex flex-col items-center gap-8 md:gap-10 max-w-2xl w-full text-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="title text-4xl sm:text-6xl font-blacktracking-tight">
                        წიგნი
                    </span>
                    <span className="text-sm sm:text-base max-w-md leading-relaxed">
                        მრავალ თემასთან დაკავშირებული არტიკლები ქართულ და ინგლისურ ენაზე.
                    </span>
                </div>

                <div className="relative w-48 h-48 sm:w-64 sm:h-64 my-2">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>

                <div className="w-full">
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}