
export const AppConfig = () => ({
  environment: import.meta.env.VITE_ENV || 'dev',
  endpoints: {
    pwa: import.meta.env.VITE_PUBLIC_PWA_URL || '',
    api: import.meta.env.VITE_API_URL || ''
  }
});
