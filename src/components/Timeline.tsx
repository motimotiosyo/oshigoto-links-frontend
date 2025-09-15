'use client';
import { useState, useEffect } from 'react';
import ExperienceCard from './ExperienceCard';

interface Experience {
  id: number;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
}

interface ApiResponse {
  experiences: Experience[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}

interface TimelineProps {
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Timeline({ 
  page = 1, 
  perPage = 30, // 横3枚×縦10枚 = 30枚
  onPageChange 
}: TimelineProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 30
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';
        const params = new URLSearchParams({
          page: page.toString(),
          per_page: perPage.toString(),
          sort: '-created_at' // 新しい順
        });
        
        const response = await fetch(`${baseUrl}/experiences?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: ApiResponse = await response.json();
        setExperiences(data.experiences);
        setPagination(data.pagination);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setError(error instanceof Error ? error.message : 'API接続エラーが発生しました');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [page, perPage]);


  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          エラー: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      {experiences.length === 0 ? (
        <div>まだ投稿がありません</div>
      ) : (
        <>
          {/* PC：横3枚×縦10枚のグリッド */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {experiences.map(experience => (
              <ExperienceCard 
                key={experience.id}
                experience={experience}
              />
            ))}
          </div>

          {/* ページネーション */}
          {pagination.total_pages > 1 && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page <= 1}
              >
                前のページ
              </button>
              
              <span>
                {pagination.current_page} / {pagination.total_pages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page >= pagination.total_pages}
              >
                次のページ
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}