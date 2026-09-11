import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <footer className="w-full flex flex-col items-center justify-center py-8 sm:py-10 mt-12 sm:mt-20 border-t border-zinc-800/80 px-4">
            <p className="text-xs sm:text-sm text-center max-w-2xl leading-relaxed">
                ეს პროექტი შემუშავებულია ინდივიდუალური პირის მიერ. არტიკლები არის სუბიექტური, რაც ნიშნავს, რომ ყველას არ ექნება შესაძლებლობა ატვირთოს ინფორმაცია.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 mt-6">
                <span className="text-sm text-center">გამოიწერე ჩემი არხი</span>

                <Image
                    src="/images/profile.png"
                    alt="melanqoliuri_lobio"
                    width={400}
                    height={400}
                    className="rounded-full object-cover select-none"
                />
            </div>
        </footer>
    )
}