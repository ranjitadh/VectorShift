// nodes/BaseNode.jsx
// Core reusable node component - clean, simple design

import { useState, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import * as Lucide from 'lucide-react';
import { useStore } from '../store';
import { nodeTheme, getNodeColor } from '../theme/nodeTheme';

const IconMap = {
  Download: Lucide.Download,
  Upload: Lucide.Upload,
  Brain: Lucide.Brain,
  FileText: Lucide.FileText,
  Globe: Lucide.Globe,
  Database: Lucide.Database,
  Clock: Lucide.Clock,
  Filter: Lucide.Filter,
  Mail: Lucide.Mail,
};

export const BaseNode = ({ id, data, config, dynamicInputs = [] }) => {
  const nodeType = data?.nodeType || 'text';
  const nodeColor = getNodeColor(nodeType);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);

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

  // Dynamic Variable Detection across all fields in the node
  const detectedVariables = useMemo(() => {
    const vars = new Set();
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    
    Object.values(fields).forEach((value) => {
      if (typeof value === 'string') {
        let match;
        regex.lastIndex = 0;
        while ((match = regex.exec(value)) !== null) {
          vars.add(match[1]);
        }
      }
    });
    
    return Array.from(vars);
  }, [fields]);

  const localDynamicInputs = useMemo(
    () =>
      detectedVariables.map((varName) => ({
        id: `var_${varName}`,
        label: varName,
      })),
    [detectedVariables]
  );

  const width = config.width || nodeTheme.sizes.defaultWidth;
  const staticInputs = config.inputs || [];
  // Combine static inputs, local dynamic variable inputs, and custom dynamic inputs
  const allInputs = [...staticInputs, ...localDynamicInputs, ...dynamicInputs];
  const { outputs = [] } = config;
  const inputs = allInputs;
  const Children = config.children;

  const getHandlePosition = (handleIndex, totalHandles) => {
    if (totalHandles === 1) return 50;
    return ((handleIndex + 1) / (totalHandles + 1)) * 100;
  };

  const renderIcon = () => {
    if (!config.icon) return null;
    const IconComponent = IconMap[config.icon];
    if (IconComponent) {
      return <IconComponent size={14} color={nodeColor.accent} strokeWidth={2.5} />;
    }
    return <span style={{ fontSize: '14px' }}>{config.icon}</span>;
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.max(60, e.target.scrollHeight)}px`;
  };

  return (
    <div
      style={{
        width: `${width}px`,
        minHeight: `${nodeTheme.sizes.minHeight}px`,
        backgroundColor: nodeColor.bg,
        border: `1.5px solid ${nodeColor.border}`,
        borderRadius: `${nodeTheme.sizes.borderRadius}px`,
        padding: `${nodeTheme.sizes.padding}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: `${nodeTheme.spacing.sm}px`,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04)',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {/* Input Handles */}
      {inputs.map((input, idx) => (
        <Handle
          key={`${id}-input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="custom-node-handle"
          style={{
            top: `${getHandlePosition(idx, inputs.length)}%`,
            width: `${nodeTheme.handles.width}px`,
            height: `${nodeTheme.handles.height}px`,
            backgroundColor: '#ffffff',
            border: `2px solid ${nodeColor.accent}`,
            borderRadius: '50%',
            color: nodeColor.accent,
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
          className="custom-node-handle"
          style={{
            top: `${getHandlePosition(idx, outputs.length)}%`,
            width: `${nodeTheme.handles.width}px`,
            height: `${nodeTheme.handles.height}px`,
            backgroundColor: '#ffffff',
            border: `2px solid ${nodeColor.accent}`,
            borderRadius: '50%',
            color: nodeColor.accent,
          }}
          title={output.label}
        />
      ))}

      {/* Header: Icon + Title + Description + Delete Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${nodeColor.border}22`,
        paddingBottom: '8px',
        marginBottom: '2px',
        width: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {config.icon && (
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${nodeColor.accent}12`,
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: `1.5px solid ${nodeColor.accent}22`
            }}>
              {renderIcon()}
            </span>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <div style={nodeTheme.typography.title}>
              {config.title}
            </div>
            {config.description && (
              <div style={nodeTheme.typography.description}>
                {config.description}
              </div>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => deleteNode(id)}
          className="custom-node-delete-btn"
          style={{
            background: 'none',
            border: 'none',
            color: '#a1a1aa',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'all 0.15s ease',
          }}
          title="Delete node"
        >
          <Lucide.X size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* Custom Content (if provided) */}
      {Children && (
        <div style={{ marginBottom: `${nodeTheme.spacing.xs}px` }}>
          {typeof Children === 'function' ? (
            <Children fields={fields} handleFieldChange={handleFieldChange} detectedVariables={detectedVariables} />
          ) : (
            Children
          )}
        </div>
      )}

      {/* Fields - skip if custom children is present */}
      {!config.children && config.fields && config.fields.length > 0 && (
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
                  className="custom-node-input"
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1.5px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#0f172a',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={fields[field.name]}
                  onChange={(e) => {
                    handleFieldChange(field.name, e.target.value);
                    adjustTextareaHeight(e);
                  }}
                  onInput={adjustTextareaHeight}
                  className="custom-node-input"
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1.5px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#0f172a',
                    fontSize: '12px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    minHeight: '60px',
                    resize: 'none',
                  }}
                />
              )}

              {field.type === 'select' && (
                <select
                  value={fields[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  className="custom-node-input"
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1.5px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#0f172a',
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
                  className="custom-node-input"
                  style={{
                    width: '100%',
                    padding: `${nodeTheme.fields.padding}px`,
                    backgroundColor: nodeTheme.fields.backgroundColor,
                    border: `1.5px solid ${nodeTheme.fields.borderColor}`,
                    borderRadius: `${nodeTheme.fields.borderRadius}px`,
                    color: '#0f172a',
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
