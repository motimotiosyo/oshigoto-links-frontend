'use client';
import { useState } from 'react';

interface ExperienceFormProps {
  onSuccess?: () => void;
}

export default function ExperienceForm({ onSuccess }: ExperienceFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${baseUrl}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience: {
            title: title.trim(),
            body: body.trim(),
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('作成成功:', data);
        
        // フォームリセット
        setTitle('');
        setBody('');
        setTags('');
        setSuccess(true);
        
        // 成功コールバック
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error?.message || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setError(
        error instanceof Error ? error.message : 'Experience作成に失敗しました'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">新しいExperience投稿</h2>
      <p className="text-gray-600 mb-6">
        あなたの「おしごと」の知見や経験を共有してください。職業だけでなく、家事や育児なども立派な「おしごと」です！
      </p>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Experience投稿が完了しました！
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          エラー: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="例: 保育士として学んだチームワークの重要性"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
            内容 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={6}
            placeholder="あなたの経験や学んだことを詳しく教えてください。どのような場面で、どのような工夫や発見があったか、それがアプリ開発にどう活かせそうかなど..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            タグ（カンマ区切り）
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="例: 保育士, チームワーク, コミュニケーション, 子育て"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            関連するキーワードをカンマで区切って入力してください
          </p>
        </div>

        <button 
          type="submit" 
          disabled={submitting || !title.trim() || !body.trim()}
          className={`w-full py-3 px-4 rounded-md font-medium ${
            submitting || !title.trim() || !body.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          } transition-colors`}
        >
          {submitting ? '投稿中...' : 'Experience投稿'}
        </button>
      </form>
    </div>
  );
}