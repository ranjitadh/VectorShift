// theme/nodeTheme.js
// Centralized node styling and design tokens

export const nodeTheme = {
  // Base dimensions
  sizes: {
    defaultWidth: 240,
    minHeight: 100,
    padding: 12,
    handleSize: 10,
    borderRadius: 8,
  },

  // Typography
  typography: {
    title: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#ffffff',
    },
    description: {
      fontSize: '12px',
      fontWeight: '400',
      color: '#b0b8c1',
    },
    label: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#e0e6ed',
    },
  },

  // Handle styling
  handles: {
    width: 12,
    height: 12,
    borderRadius: 3,
    borderWidth: 2,
  },

  // Node color schemes - each node type has a color
  nodeColors: {
    customInput: { bg: '#1e293b', border: '#3b82f6', accent: '#60a5fa' },
    customOutput: { bg: '#1e293b', border: '#10b981', accent: '#34d399' },
    llm: { bg: '#1e293b', border: '#f59e0b', accent: '#fbbf24' },
    text: { bg: '#1e293b', border: '#8b5cf6', accent: '#a78bfa' },
    api: { bg: '#1e293b', border: '#ec4899', accent: '#f472b6' },
    database: { bg: '#1e293b', border: '#06b6d4', accent: '#22d3ee' },
    delay: { bg: '#1e293b', border: '#ef4444', accent: '#f87171' },
    filter: { bg: '#1e293b', border: '#14b8a6', accent: '#2dd4bf' },
    email: { bg: '#1e293b', border: '#6366f1', accent: '#818cf8' },
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  // Field styling
  fields: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    borderRadius: 4,
    padding: 8,
    gap: 8,
  },
};

// Helper to get node color scheme
export const getNodeColor = (nodeType) => {
  return nodeTheme.nodeColors[nodeType] || nodeTheme.nodeColors.text;
};
