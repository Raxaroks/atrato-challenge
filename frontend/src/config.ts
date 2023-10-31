
export const AppConfig = () => ({
  endpoints: {
    api: import.meta.env.VITE_API_URL || ''
  }
});
