import { useEffect, useState } from "react";

const useIsLoggedIn = () => {
    const [isLoggedIn, setLoggedInStatus] = useState(false);

    useEffect(() => {
        setLoggedInStatus(
            document.cookie
            .split('; ')
            .find((row) => row.startsWith('is-logged-in='))
            ?.split('=')[1] === 'true'
        );
    }, [])

    return [isLoggedIn]
}

export default useIsLoggedIn;