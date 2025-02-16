import { useEffect, useState } from "react";

export function useQueryParams() {
    const [params, setQueryParams] = useState({});

    useEffect(() => {
        const query = window.location.search;
        if (!query) return;

        const queries = query.substring(1).split('&');

        const getObjectFromQuery = queries.reduce((acc, curr) => {
            const [key, value] = curr.split('=');
            if (key) {
                acc[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
            }
            return acc;
        }, {});

        setQueryParams(getObjectFromQuery);
    }, []);

    return params;
}
