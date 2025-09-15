import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-amber-50 border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-700">
            おしごとリンク
          </Link>
          <nav>
            <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
              ログイン
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}