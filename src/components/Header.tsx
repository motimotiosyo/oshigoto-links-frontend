import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-orange-400 border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            おしごとリンク
          </Link>
          <nav className="flex space-x-3">
            <button className="bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200">
              新規登録
            </button>
            <button className="bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold border border-orange-200 hover:bg-orange-50 transition-colors duration-200">
              ログイン
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}