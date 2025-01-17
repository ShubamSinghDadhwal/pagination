import React, { useEffect } from "react";
import { useRouter } from "../../hooks/useRouter";
import { getRange } from "../../utils";
import "./styles.css";

const Pagination = ({ totalItems, filteredItems, afterPaginationApply, pageSizeOptions = [5, 10, 20, 50] }) => {
    const { searchParams } = useRouter();
    const pageNumber = Number(searchParams.get("pageNumber") || "1");
    const pageSize = Number(searchParams.get("pageSize") || "5");
    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        if (totalItems === 0) return;
        handlePageClick(pageNumber, pageSize);
    }, [totalItems]);

    const handlePageClick = (page, size) => {
        if (page < 1 || page > totalPages) return;

        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set("pageNumber", page);
        updatedSearchParams.set("pageSize", size);

        const query = updatedSearchParams.toString();
        afterPaginationApply(query);
    };

    const renderPrevious = () => (
        <button
            disabled={pageNumber === 1}
            className={`btn prevBtn ${pageNumber === 1 ? "disabled" : ""}`}
            onClick={() => handlePageClick(pageNumber - 1, pageSize)}
        >
            Previous
        </button>
    );

    const getVisiblePages = () => {
        const pageWindowSize = 5;
        const halfWindow = Math.floor(pageWindowSize / 2);

        let startPage = Math.max(1, pageNumber - halfWindow);
        let endPage = Math.min(totalPages, pageNumber + halfWindow);
        let visiblePages = endPage - startPage + 1;
        if (visiblePages < pageWindowSize) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + pageWindowSize - 1);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, endPage - pageWindowSize + 1);
            }
            };

        const pages = getRange(startPage, endPage);
        return pages;
    };

    const renderDynamicPages = () => {
        const visiblePages = getVisiblePages();
        return visiblePages.map((page) => (
            <button
                key={page}
                onClick={() => handlePageClick(page, pageSize)}
                className={`pages ${pageNumber === page ? "activePage" : ""}`}
            >
                {page}
            </button>
        ));
    };

    const renderNext = () => (
        <button
            className={`btn nextBtn ${pageNumber === totalPages ? "disabled" : ""}`}
            onClick={() => handlePageClick(pageNumber + 1, pageSize)}
            disabled={pageNumber === totalPages}
        >
            Next
        </button>
    );

    const pageSizeSelector = () => (
        <div>
            <label htmlFor="pageSizeSelector" className="pageSizeLabel">
                Items per page:
            </label>
            <select
                id="pageSizeSelector"
                value={pageSize}
                onChange={(e) => handlePageClick(1, Number(e.target.value))}
            >
                {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderShowingText = () => (
        <div className="showingText">
            Showing <strong>{((pageNumber - 1) * pageSize) + 1} to {Math.min(pageNumber * pageSize, totalItems)}</strong> of {totalItems} entries
        </div>
    );

    return (
        filteredItems === 0
            ? null
            : (
                <div className="paginationContainer">
                    <div>
                        {renderPrevious()}
                        {renderDynamicPages()}
                        {renderNext()}
                    </div>
                    <div className="pageSelectorWithMetaContainer">
                        {renderShowingText()}
                        {pageSizeSelector()}
                    </div>
                </div>
            )
    );
};

export { Pagination };
