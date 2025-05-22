export const generatePagination = (
  currentPage: number,
  totalPages: number,
  visiblePages: number
) => {
  const pages: (number | string)[] = [];

  const half = Math.floor(visiblePages / 2);

  // Якщо загальна кількість сторінок маленька
  if (totalPages <= visiblePages + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Початок
  if (currentPage <= visiblePages) {
    for (let i = 1; i <= visiblePages; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  // Кінець
  if (currentPage >= totalPages - visiblePages + 1) {
    pages.push(1);
    pages.push('...');
    for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Середина
  if (visiblePages <= 2) {
    pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push('...');
  } else {
    pages.push(1);
    pages.push('...');
    const start = Math.max(currentPage - half, 2);
    const end = Math.min(currentPage + half, totalPages - 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
};
