'use client';
import { useState, useEffect } from 'react';

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

export default function ExperienceList() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';
        const response = await fetch(`${baseUrl}/experiences`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: ApiResponse = await response.json();
        setExperiences(data.experiences);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setError(error instanceof Error ? error.message : 'API接続エラーが発生しました');
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          エラー: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">おしごとリンク - Experience一覧</h1>
      <p className="text-gray-600 mb-8">
        みんなの知見や経験を共有して、新しい世界を知り、アプリ開発のヒントを得よう！
      </p>
      
      {experiences.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">まだExperienceが投稿されていません</p>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map(experience => (
            <div 
              key={experience.id} 
              className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {experience.title}
              </h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {experience.body}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {experience.tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="text-sm text-gray-500">
                投稿日: {new Date(experience.created_at).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}