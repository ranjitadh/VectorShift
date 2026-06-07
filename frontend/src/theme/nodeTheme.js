// theme/nodeTheme.js
// Centralized node styling and design tokens

export const nodeTheme = {
  // Base dimensions
  sizes: {
    defaultWidth: 240,
    minHeight: 100,
    padding: 16,
    handleSize: 10,
    borderRadius: 10,
  },

  // Typography
  typography: {
    title: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#09090b',
    },
    description: {
      fontSize: '11px',
      fontWeight: '400',
      color: '#71717a',
    },
    label: {
      fontSize: '11px',
      fontWeight: '500',
      color: '#52525b',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
  },

  // Handle styling
  handles: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },

  // Figma SaaS Palette: Clean white cards, neutral borders, vibrant ports/badges
  nodeColors: {
    customInput: { bg: '#ffffff', border: '#e4e4e7', accent: '#3b82f6' },
    customOutput: { bg: '#ffffff', border: '#e4e4e7', accent: '#10b981' },
    llm: { bg: '#ffffff', border: '#e4e4e7', accent: '#f59e0b' },
    text: { bg: '#ffffff', border: '#e4e4e7', accent: '#8b5cf6' },
    api: { bg: '#ffffff', border: '#e4e4e7', accent: '#ec4899' },
    database: { bg: '#ffffff', border: '#e4e4e7', accent: '#06b6d4' },
    delay: { bg: '#ffffff', border: '#e4e4e7', accent: '#ef4444' },
    filter: { bg: '#ffffff', border: '#e4e4e7', accent: '#14b8a6' },
    email: { bg: '#ffffff', border: '#e4e4e7', accent: '#6366f1' },
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
    backgroundColor: '#ffffff',
    borderColor: '#e4e4e7',
    borderRadius: 6,
    padding: 8,
    gap: 10,
  },
};

// Helper to get node color scheme
export const getNodeColor = (nodeType) => {
  return nodeTheme.nodeColors[nodeType] || nodeTheme.nodeColors.text;
};
