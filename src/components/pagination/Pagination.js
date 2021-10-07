import react from 'react';

const Pagination = ({handlePageChange, newArrivalsCount}) => {
    return (
        <div class="bg-white flex justify-center sm:px-6 px-4 py-3 rounded-lg">
            <button class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => handlePageChange("Previous")}>
                Previous
            </button>
            {(newArrivalsCount < 4) && (
                <button class="ml-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled cursor-not-allowed">
                    Next
                </button>
            )}
            {(newArrivalsCount == 4) && (
                <button class="ml-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => handlePageChange("Next")}>
                    Next
                </button>
            )}
        </div>
    )
};

export default Pagination;