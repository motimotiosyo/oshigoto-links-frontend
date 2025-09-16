'use client';
import { useAuth } from '@/contexts/AuthContext';

export default function Footer() {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="bg-orange-400 border-t border-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center text-white">
          {isLoggedIn && (
            <div className="mb-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200 text-lg">
                経験を投稿する
              </button>
            </div>
          )}
          <p className="mb-2">
            様々な「おしごと」の経験を共有して、新しいアイデアを発見しよう
          </p>
          <p className="text-sm text-orange-100">
            © 2024 おしごとリンク - あらゆる「おしごと」体験をつなぐプラットフォーム
          </p>
        </div>
      </div>
    </footer>
  );
}