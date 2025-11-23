function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: Function;
}) {
  const totalNumberOfPages = Math.ceil(totalItems / pageSize);
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        onClick={onPageChange.bind(null, false)}
        disabled = {page === 1}
        >
        Previous
      </button>
      <span className="mx-2">
        {`page ${page} of ${totalNumberOfPages}`}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        onClick={onPageChange.bind(null, true)}
        disabled = {page === totalNumberOfPages}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
