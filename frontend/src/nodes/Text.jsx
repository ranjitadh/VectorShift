// nodes/Text.jsx
import { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';
import { useVariableDetection } from '../hooks/useVariableDetection';

export const TextNode = (props) => {
  const config = getNodeConfig('text');
  const { data } = props;
  
  // Get current text value
  const textValue = data?.text || '';
  
  // Detect variables in the text
  const detectedVariables = useVariableDetection(textValue);
  
  // Create dynamic input handles for detected variables
  const dynamicInputs = useMemo(
    () =>
      detectedVariables.map((varName) => ({
        id: `var_${varName}`,
        label: varName,
      })),
    [detectedVariables]
  );
  
  // Create custom children component for enhanced textarea
  const CustomTextarea = ({ fields, handleFieldChange }) => {
    const textareaRef = useRef(null);
    const [height, setHeight] = useState('60px');
    
    // Safely get text value with fallback
    const textValue = fields.text !== undefined ? fields.text : (data?.text || '');
    
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
            color: '#cbd5e1',
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
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#0a0e18',
            border: '1px solid #334155',
            borderRadius: '6px',
            color: '#e0e6ed',
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
              color: '#64748b',
              padding: '4px 6px',
              backgroundColor: '#1e293b',
              borderRadius: '4px',
              borderLeft: '2px solid #3b82f6',
            }}
          >
            Variables detected: {detectedVariables.join(', ')}
          </div>
        )}
      </div>
    );
  };
  
  // Override config with custom children and dynamic handling
  const enhancedConfig = {
    ...config,
    inputs: [], // Don't show static inputs for text node
    children: CustomTextarea,
  };
  
  return (
    <BaseNode
      {...props}
      config={enhancedConfig}
      dynamicInputs={dynamicInputs}
    />
  );
};

