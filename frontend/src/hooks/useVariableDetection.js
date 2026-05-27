import { useMemo } from 'react';

/**
 * Detects variables in format {{variableName}}
 * Returns array of unique variable names with valid JS identifiers
 */
export const useVariableDetection = (text) => {
  const variables = useMemo(() => {
    if (!text || typeof text !== 'string') return [];
    
    // Regex to match {{variableName}} where variableName is a valid JS identifier
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [];
    const seen = new Set();
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      const varName = match[1];
      if (!seen.has(varName)) {
        matches.push(varName);
        seen.add(varName);
      }
    }
    
    return matches;
  }, [text]);

  return variables;
};
