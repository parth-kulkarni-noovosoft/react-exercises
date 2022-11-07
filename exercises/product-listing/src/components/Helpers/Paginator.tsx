import React, { useEffect, useState } from "react";

const Paginator = <T,>({ elements, children }: {
    elements: T[],
    children: (elements: T[]) => React.ReactNode
}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const maxPageNumber = Math.max(Math.ceil(elements.length/5), 1);
    const perPageCount = 5;

    useEffect(() => {
        if (maxPageNumber < pageNumber) {
            setPageNumber(maxPageNumber);
        } else if (pageNumber === 0) {
            setPageNumber(1);
        }
    }, [elements])

    return <>
        {/* slicing array with arguments 0-5, 5-10 etc */}
        {children(elements.slice((pageNumber - 1) * perPageCount, (pageNumber - 1) * perPageCount + perPageCount))}
        <div className="button-section bordered">
            <button
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(1)}
            >&lt;&lt;</button>
            <button
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(state => state - 1)}
            >&lt;</button>
            <span className="page-number">{pageNumber}</span>
            <button
                disabled={pageNumber === maxPageNumber}
                onClick={() => setPageNumber(state => state + 1)}
            >&gt;</button>
            <button
                disabled={pageNumber === maxPageNumber}
                onClick={() => setPageNumber(maxPageNumber)}
            >&gt;&gt;</button>
        </div>
    </>
}

export default Paginator;