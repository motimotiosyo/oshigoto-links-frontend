'use client';
import { useState } from 'react';
import Timeline from '@/components/Timeline';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Timeline 
      page={currentPage}
      perPage={30}
      onPageChange={handlePageChange}
    />
  );
}
