import { useEffect, useState } from 'react';

const useScrollY = () => {
    const [scrollY, setScrollY] = useState(window.scrollY);

    useEffect(() => {
        const handleWindowScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, []);

    return { scrollY };
};

export default useScrollY;
