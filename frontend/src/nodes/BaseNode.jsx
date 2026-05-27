// nodes/BaseNode.jsx
// Core reusable node component - clean, simple design

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { nodeTheme, getNodeColor } from '../theme/nodeTheme';

export const BaseNode = ({ id, data, config }) => {
  const nodeType = data?.nodeType || 'text';
  const nodeColor = getNodeColor(nodeType);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [fields, setFields] = useState(
    config.fields.reduce((acc, field) => {
      acc[field.name] = data?.[field.name] ?? field.value ?? '';
      return acc;
    }, {})
  );

  const handleFieldChange = (fieldName, value) => {
    setFields((prev) => ({ ...prev, [fieldName]: value }));
    updateNodeField(id, fieldName, value);
  };

  const width = config.width || nodeTheme.sizes.defaultWidth;
  const { inputs = [], outputs = [] } = config;

  const getHandlePosition = (handleIndex, totalHandles) => {
    if (totalHandles === 1) return 50;
    return ((handleIndex + 1) / (totalHandles + 1)) * 100;
  };

  return (
    <div
      style={{
        width: `${width}px`,
        minHeight: `${nodeTheme.sizes.minHeight}px`,
        backgroundColor: nodeColor.bg,
        border: `1px solid ${nodeColor.border}`,
        borderRadius: `${nodeTheme.sizes.borderRadius}px`,
        padding: `${nodeTheme.sizes.padding}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${nodeTheme.spacing.sm}px`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      }}
    >
      {/* Input Handles */}
      {inputs.map((input, idx) => (
        <Handle
          key={`${id}-input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: `${getHandlePosition(idx, inputs.length)}%`,
            width: `${nodeTheme.handles.width}px`,
            height: `${nodeTheme.handles.height}px`,
            backgroundColor: nodeColor.accent,
            border: `${nodeTheme.handles.borderWidth}px solid ${nodeColor.border}`,
            borderRadius: `${nodeTheme.handles.borderRadius}px`,
          }}
          title={input.label}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, idx) => (
        <Handle
          key={`${id}-output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: `${getHandlePosition(idx, outputs.length)}%`,
            width: `${nodeTheme.handles.width}px`,
            height: `${nodeTheme.handles.height}px`,
            backgroundColor: nodeColor.accent,
            border: `${nodeTheme.handles.borderWidth}px solid ${nodeColor.border}`,
            borderRadius: `${nodeTheme.handles.borderRadius}px`,
          }}
          title={output.label}
        />
      ))}

      {/* Header: Title + Description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={nodeTheme.typography.title}>
          {config.title}
        </div>
        {config.description && (
          <div style={nodeTheme.typography.description}>
            {config.description}
          </div>
        )}
      </div>

      {/* Custom Content (if provided) */}
      {config.children && (
        <div style={{ marginBottom: `${nodeTheme.spacing.xs}px` }}>
          {typeof config.children === 'function'
            ? config.children({ fields, handleFieldChange })
            : config.children}
        </div>
      )}

      {/* Fields */}
      {config.fields && config.fields.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${nodeTheme.fields.gap}px`,
          }}
        >
          {config.fields.map((field) => (
            <div key={field.name}>
              <label
                style={{
                  display: 'block',
                  ...nodeTheme.typography.label,
                  marginBottom: '4px',
                }}
              >
                {field.label}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={fields[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#e0e6ed',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={fields[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#e0e6ed',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    minHeight: '60px',
                    resize: 'vertical',
                  }}
                />
              )}

              {field.type === 'select' && (
                <select
                  value={fields[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#e0e6ed',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                >
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'number' && (
                <input
                  type="number"
                  value={fields[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#e0e6ed',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
