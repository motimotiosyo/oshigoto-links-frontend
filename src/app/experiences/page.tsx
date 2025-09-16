'use client';
import { useState } from 'react';
import Timeline from '@/components/Timeline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ExperiencesPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <Timeline 
          page={currentPage}
          perPage={30}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
}