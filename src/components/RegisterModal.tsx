'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegisterFormData {
  account_name: string;
  password: string;
  password_confirmation: string;
}

interface ValidationErrors {
  account_name?: string;
  password?: string;
  password_confirmation?: string;
  general?: string;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState<RegisterFormData>({
    account_name: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.account_name.trim()) {
      newErrors.account_name = 'ユーザー名を入力してください';
    }

    if (!formData.password) {
      newErrors.password = 'パスワードを入力してください';
    } else if (formData.password.length < 6) {
      newErrors.password = 'パスワードは6文字以上で入力してください';
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'パスワード確認を入力してください';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'パスワードが一致しません';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';
      const requestBody = { user: formData };
      console.log('Registration request URL:', `${baseUrl}/users`);
      console.log('Registration request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        onClose();
        window.location.href = '/';
      } else {
        console.error('Registration error response:', data);
        console.error('Detailed errors:', data.errors);
        let errorMessage = data.message || `ユーザー登録に失敗しました (${response.status})`;
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors.join(', ');
        }
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'ネットワークエラーが発生しました' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 border border-orange-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-900">新規登録</h2>
          <button
            onClick={onClose}
            className="text-orange-600 hover:text-orange-800 text-2xl"
          >
            ×
          </button>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="account_name" className="block text-sm font-medium text-amber-900 mb-1">
              ユーザー名
            </label>
            <input
              type="text"
              id="account_name"
              name="account_name"
              value={formData.account_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              disabled={isLoading}
            />
            {errors.account_name && (
              <p className="text-red-600 text-sm mt-1">{errors.account_name}</p>
            )}
          </div>


          <div>
            <label htmlFor="password" className="block text-sm font-medium text-amber-900 mb-1">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-amber-900 mb-1">
              パスワード確認
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              disabled={isLoading}
            />
            {errors.password_confirmation && (
              <p className="text-red-600 text-sm mt-1">{errors.password_confirmation}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
              disabled={isLoading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? '登録中...' : '登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}