'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

export default function Header() {
  const { user, logout, isLoggedIn } = useAuth();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-orange-400 border-b border-orange-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              おしごとリンク
            </Link>
            <nav className="flex space-x-3">
              {isLoggedIn ? (
                <>
                  <span className="text-white font-semibold px-3 py-2">
                    {user?.account_name}さん
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200"
                  >
                    新規登録
                  </button>
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200"
                  >
                    ログイン
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}