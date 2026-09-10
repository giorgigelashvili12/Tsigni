import React from 'react'

export default function Navigation() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div>
                <span className='font-black text-3xl'>ან მოძებნე კატეგორიების მიხედვით:</span>
            </div>

            <div className='flex justify-evenly w-full'>
                <div className='mt-20 w-80'>
                    <span className='title1 text-4xl font-bold'>რა?</span>
                    <p className='mt-1.5'>ეს კატეგორია ზოგადია და ბევრ არტიკლებს მოიცავს. კონკრეტულად:</p>

                    <div className='mt-1.5'>
                        <ul className='list list-inside ml-3'>
                            <li>ენა & კილო</li>
                            <li>ისოგლოსის ვექტორები</li>
                            <li>ეთნო-დემოგრაფია</li>
                            <li>ისტორიოგრაფია და იდეოლოგია</li>
                            <li>ტოპონიმიკა</li>
                        </ul>
                        <span className='mt-2'>და სხვა დანარჩენი...</span>
                    </div>
                </div>

                <div className='mt-20 w-80'>
                    <span className='title1 text-4xl font-bold'>სად?</span>
                    <p className='mt-1.5'>ტერიტორიული, ლინგუისტური და დემოგრაფიული არტიკლები:</p>

                    <div className='mt-1.5'>
                        <ul className='list list-inside ml-3'>
                            <li>მთიულური</li>
                            <li>ბარი</li>
                            <li>კოლხური და დასავლური</li>
                            <li>სვანეთი</li>
                            <li>სასაზღვრო ანკლავები და დიასპორა</li>
                        </ul>
                        <span className='mt-2'>და სხვა დანარჩენი...</span>
                    </div>
                </div>

                <div className='mt-20 w-80'>
                    <span className='title1 text-4xl font-bold'>როდის?</span>
                    <p className='mt-1.5'>ისტორიული არტიკლები:</p>

                    <div className='mt-1.5'>
                        <ul className='list list-inside ml-3'>
                            <li>ანტიკური ხანა</li>
                            <li>საქართველოს სამეფო</li>
                            <li>იმპერიისა და აღწერის ეპოქა</li>
                            <li>საბჭოთა პერიოდი</li>
                            <li>თანამედროვე</li>
                        </ul>
                        <span className='mt-2'>და სხვა დანარჩენი...</span>
                    </div>
                </div>
            </div>

            <div className='mt-30 w-full flex flex-col justify-center items-center gap-5'>
                <span className='text-3xl text-white/70'>თუ ამ კატეგორიებში არ ეძებდი:</span>

                <ul className='list flex gap-10'>
                    <li>ატლასი და რუკები</li>
                    <li>დიალექტური ქრონიკები</li>
                    <li>ტოპონიმები</li>
                    <li>ეთნო-ისტორიული არქივი</li>
                </ul>
            </div>
        </div>
    )
}
