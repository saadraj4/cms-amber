// Centralized color configuration for the CMS
export const colors = {
  primary: '#7af6ff',
  secondary: '#ffffff', 
  text: '#000000',
  cardBg: '#111827',
  button:"#5bb450",
  // Additional utility colors
  primaryHover: '#5ce6f0',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Tailwind class mappings for easy usage
export const themeClasses = {
  primary: 'bg-primary text-white',
  primaryHover: 'hover:bg-primary/90',
  secondary: 'bg-secondary text-textColor',
  // card: 'bg-cardBg text-white',
  text: 'text-textColor',
  textSecondary: 'text-gray-500',
  border: 'border-gray-200',
  button: 'bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors',
  input: 'border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
  card: 'bg-white rounded-lg shadow-md p-6 border border-gray-200',
  cardDark: 'bg-cardBg text-white rounded-lg shadow-md p-6',
};
