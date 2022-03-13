import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export const ThemeButton:FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return(
        <button
    aria-label="DarkModeToggle"
    type="button"
    className="p-3 h-12 w-12 order-2 md:order-3 absolute left-2/4 transform -translate-x-2/4 md:relative md:left-0"
    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
    {mounted && (
        <>
        {theme === 'dark' ? (
            <FontAwesomeIcon className="px-1 w-5 md:w-8 z-0" icon={faSun} size={'lg'} color={'#EFA9E0'}/>
        ) : (
            <FontAwesomeIcon className="px-1 w-5 md:w-8 z-0" icon={faMoon} size={'lg'} color={'#8E477F'}/>
        )}
        </>
    )}
    </button>
    )
}