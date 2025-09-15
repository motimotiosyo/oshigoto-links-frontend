'use client';
import { useState } from 'react';
import ExperienceList from '@/components/ExperienceList';
import ExperienceForm from '@/components/ExperienceForm';

export default function ExperiencesPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSuccess = () => {
    // フォーム投稿成功時に一覧を更新
    setRefreshKey(prev => prev + 1);
    setActiveTab('list'); // 一覧タブに切り替え
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              おしごとリンク
            </h1>
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Experience一覧
              </button>
              <button
                onClick={() => setActiveTab('form')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'form'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                新規投稿
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        {activeTab === 'list' ? (
          <ExperienceList key={refreshKey} />
        ) : (
          <ExperienceForm onSuccess={handleFormSuccess} />
        )}
      </div>
    </div>
  );
}