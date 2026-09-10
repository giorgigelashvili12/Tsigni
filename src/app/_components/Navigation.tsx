import React from 'react';

export default function Navigation() {
    return (
        <div className='flex flex-col justify-center items-center px-4 py-8 md:py-12'>
            <div className='text-center'>
                <span className='font-black text-2xl sm:text-3xl text-zinc-100'>ან მოძებნე კატეგორიების მიხედვით:</span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 w-full max-w-6xl mt-10 md:mt-16'>
                <div className='w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm'>
                    <span className='title1 text-3xl sm:text-4xl font-bold text-rose-500 block'>რა?</span>
                    <p className='mt-2 text-sm sm:text-base text-zinc-400'>ეს კატეგორია ზოგადია და ბევრ არტიკლებს მოიცავს. კონკრეტულად:</p>

                    <div className='mt-4'>
                        <ul className='list-disc list-inside space-y-1.5 text-sm sm:text-base text-zinc-300'>
                            <li>ენა & კილო</li>
                            <li>ისოგლოსის ვექტორები</li>
                            <li>ეთნო-დემოგრაფია</li>
                            <li>ისტორიოგრაფია და იდეოლოგია</li>
                            <li>ტოპონიმიკა</li>
                        </ul>
                        <span className='mt-4 block text-xs sm:text-sm text-zinc-500 font-mono'>და სხვა დანარჩენი...</span>
                    </div>
                </div>

                <div className='w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm'>
                    <span className='title1 text-3xl sm:text-4xl font-bold text-rose-500 block'>სად?</span>
                    <p className='mt-2 text-sm sm:text-base text-zinc-400'>ტერიტორიული, ლინგუისტური და დემოგრაფიული არტიკლები:</p>

                    <div className='mt-4'>
                        <ul className='list-disc list-inside space-y-1.5 text-sm sm:text-base text-zinc-300'>
                            <li>მთიულური</li>
                            <li>ბარი</li>
                            <li>კოლხური და დასავლური</li>
                            <li>სვანეთი</li>
                            <li>სასაზღვრო ანკლავები და დიასპორა</li>
                        </ul>
                        <span className='mt-4 block text-xs sm:text-sm text-zinc-500 font-mono'>და სხვა დანარჩენი...</span>
                    </div>
                </div>

                <div className='w-full bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-sm'>
                    <span className='title1 text-3xl sm:text-4xl font-bold text-rose-500 block'>როდის?</span>
                    <p className='mt-2 text-sm sm:text-base text-zinc-400'>ისტორიული არტიკლები:</p>

                    <div className='mt-4'>
                        <ul className='list-disc list-inside space-y-1.5 text-sm sm:text-base text-zinc-300'>
                            <li>ანტიკური ხანა</li>
                            <li>საქართველოს სამეფო</li>
                            <li>იმპერიისა და აღწერის ეპოქა</li>
                            <li>საბჭოთა პერიოდი</li>
                            <li>თანამედროვე</li>
                        </ul>
                        <span className='mt-4 block text-xs sm:text-sm text-zinc-500 font-mono'>და სხვა დანარჩენი...</span>
                    </div>
                </div>
            </div>

            <div className='mt-16 sm:mt-24 w-full max-w-4xl flex flex-col justify-center items-center gap-6 text-center'>
                <span className='text-xl sm:text-2xl text-zinc-300 font-medium'>თუ ამ კატეგორიებში არ ეძებდი:</span>

                <ul className='flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 font-mono'>
                    <li className='bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl hover:border-zinc-700 transition-colors'>ატლასი და რუკები</li>
                    <li className='bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl hover:border-zinc-700 transition-colors'>დიალექტური ქრონიკები</li>
                    <li className='bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl hover:border-zinc-700 transition-colors'>ტოპონიმები</li>
                    <li className='bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl hover:border-zinc-700 transition-colors'>ეთნო-ისტორიული არქივი</li>
                </ul>
            </div>
        </div>
    );
}