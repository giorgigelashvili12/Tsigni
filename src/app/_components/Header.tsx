import SearchBar from '@/shared/SearchBar'
import Image from 'next/image'
import React from 'react'

export default function Header() {
    return (
        <div className=''>
            <div className='flex justify-center items-center h-screen'>
                <div className='flex flex-col items-center gap-15'>
                    <div className='flex flex-col items-center gap-4'>
                        <span className='title text-5xl'>წიგნი</span>
                        <span className=''>მრავალ თემასთან დაკავშირებული არტიკლები ქართულ და ინგლისურ ენაზე.</span>
                    </div>

                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        height={300}
                        width={300}
                    />

                    <SearchBar />
                </div>
            </div>
        </div>
    )
}
