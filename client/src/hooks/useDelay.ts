import React, { useState, useEffect } from "react";

type Props = {
    children: React.ReactNode;
    waitBeforeShow?: number;
};

const useDelay = ({ children, waitBeforeShow = 500 }: Props) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShown(true);
        }, waitBeforeShow);
    }, [waitBeforeShow]);

    return isShown ? children : null;
};

export default useDelay;