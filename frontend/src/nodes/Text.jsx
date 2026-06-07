// nodes/Text.jsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';
import { nodeTheme } from '../theme/nodeTheme';

/**
 * CustomTextarea - Defined at MODULE LEVEL to prevent React from
 * unmounting/remounting on every parent re-render. When defined inside
 * TextNode, React sees a new component type each render → focus loss.
 * 
 * Receives `detectedVariables` from BaseNode (passed through config.children).
 */
const CustomTextarea = ({ fields, handleFieldChange, detectedVariables = [] }) => {
  const textareaRef = useRef(null);
  const [height, setHeight] = useState('60px');

  // Safely get text value with fallback
  const textValue = fields.text !== undefined ? fields.text : '';

  // Auto-resize textarea
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(60, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      setHeight(`${newHeight}px`);
    }
  };

  // Handle text change with auto-resize
  const handleTextChange = (e) => {
    const newText = e.target.value;
    handleFieldChange('text', newText);
    autoResize();
  };

  // Initialize height on mount and when text changes
  useEffect(() => {
    autoResize();
  }, [textValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          color: '#475569',
          fontWeight: '500',
          marginBottom: '2px',
        }}
      >
        Content
      </label>
      <textarea
        ref={textareaRef}
        value={textValue}
        onChange={handleTextChange}
        placeholder="Enter text or use {{variables}}"
        className="custom-node-input"
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#f8fafc',
          border: '1.5px solid #cbd5e1',
          borderRadius: '6px',
          color: '#0f172a',
          fontSize: '12px',
          fontFamily: 'monospace',
          boxSizing: 'border-box',
          minHeight: '60px',
          height: height,
          maxHeight: '200px',
          resize: 'none',
          fontVariantLigatures: 'none',
        }}
      />
      {detectedVariables.length > 0 && (
        <div
          style={{
            fontSize: '11px',
            color: '#475569',
            padding: '6px 8px',
            backgroundColor: '#f1f5f9',
            borderRadius: '4px',
            borderLeft: '2.5px solid #8b5cf6',
          }}
        >
          Variables detected: {detectedVariables.join(', ')}
        </div>
      )}
    </div>
  );
};

export const TextNode = (props) => {
  const config = getNodeConfig('text');
  const { data } = props;

  // Compute dynamic width based on text content
  const textValue = data?.text || '';
  const dynamicWidth = useMemo(() => {
    const normalizedText = typeof textValue === 'string' ? textValue : '';
    const lines = normalizedText.split('\n');
    const longestLineLength = lines.reduce(
      (max, line) => Math.max(max, line.length),
      0
    );

    const minWidth = nodeTheme.sizes.defaultWidth;
    const maxWidth = 440;
    const basePadding = 120;
    const charWidth = 7;

    return Math.min(
      maxWidth,
      Math.max(minWidth, basePadding + longestLineLength * charWidth)
    );
  }, [textValue]);

  // Override config with custom children and dynamic handling
  // NOTE: We do NOT pass dynamicInputs here — BaseNode's own internal
  // variable detection handles creating input handles for {{variables}}.
  // Previously this caused DUPLICATE handles.
  const enhancedConfig = useMemo(() => ({
    ...config,
    inputs: [], // Don't show static inputs for text node
    children: CustomTextarea,
    width: dynamicWidth,
  }), [config, dynamicWidth]);

  return (
    <BaseNode
      {...props}
      config={enhancedConfig}
    />
  );
};
