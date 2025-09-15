type ErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    request_id?: string;
  };
};

type FetchOptions = RequestInit & {
  idempotencyKey?: string;
};

export const customFetch = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  
  // デフォルトヘッダーの設定
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // 認証トークンがある場合は追加
  const token = typeof window !== 'undefined' 
    ? localStorage.getItem('authToken') 
    : null;
  
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  // Idempotency-Keyの追加
  if (options.idempotencyKey) {
    defaultHeaders['Idempotency-Key'] = options.idempotencyKey;
  }

  // オプションのマージ
  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  try {
    const response = await fetch(fullUrl, mergedOptions);
    
    // レスポンスが成功の場合
    if (response.ok) {
      // No Contentの場合
      if (response.status === 204) {
        return {} as T;
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as unknown as T;
      }
    }
    
    // エラーレスポンスの処理
    let errorData: ErrorResponse;
    
    try {
      errorData = await response.json();
    } catch {
      // JSONパースに失敗した場合のフォールバック
      errorData = {
        error: {
          code: 'UNKNOWN_ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
        },
      };
    }
    
    // APIエラーの標準化
    const error = new Error(errorData.error.message || 'API Error');
    (error as any).code = errorData.error.code;
    (error as any).status = response.status;
    (error as any).details = errorData.error.details;
    (error as any).requestId = errorData.error.request_id;
    
    throw error;
    
  } catch (error) {
    // ネットワークエラーなどのハンドリング
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Network or unknown error occurred');
  }
};