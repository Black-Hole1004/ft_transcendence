import React from 'react'

function Header() {
    return (
        <header className='relative flex items-center text-primary font-medium 2xl:h-[116px] xl:h-[100px] sm:h-[80px]'>
            <nav className='absolute flex justify-between
                2xl:w-[190px] xl:w-[180px] lg:w-[160px] md:w-[150px] sm:w-[130px]
                2xl:right-[50px] xl:right-[40px] md:right-[30px] sm:right-[20px]'>
                <button className='responsive-button-text'>
                    Sign in
                </button>
                <button className='border border-primary rounded-lg responsive-button-text transition
                    hover:bg-primary hover:text-secondary duration-300
                    2xl:py-[12px] xl:py-[11px] lg:py-[10px] md:py-[9px] sm:py-[8px]
                    2xl:px-[23px] xl:px-[20px] lg:px-[16px] md:px-[14px] sm:px-[10px]'>
                    Sign up
                </button>
            </nav>
        </header>
    )
}

export default Header
