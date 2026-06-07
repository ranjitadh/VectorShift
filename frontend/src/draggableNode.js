// draggableNode.js

import * as Lucide from 'lucide-react';
import { getNodeConfig } from './nodes/nodeConfig';
import { getNodeColor } from './theme/nodeTheme';

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

export const DraggableNode = ({ type, label }) => {
    const config = getNodeConfig(type);
    const nodeColor = getNodeColor(type);
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const renderIcon = () => {
      if (!config?.icon) return null;
      const IconComponent = IconMap[config.icon];
      if (IconComponent) {
        return <IconComponent size={13} color={nodeColor.accent} strokeWidth={2.5} />;
      }
      return <span style={{ fontSize: '13px' }}>{config.icon}</span>;
    };
  
    return (
      <div
        className={`toolbar-draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          border: '1px solid #e4e4e7',
          color: '#27272a',
          fontWeight: '500',
          fontSize: '12px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          userSelect: 'none',
          gap: '10px',
          padding: '8px 10px',
          boxSizing: 'border-box',
          width: '100%',
          height: '38px',
        }} 
        draggable
      >
          <span style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${nodeColor.accent}12`,
            border: `1px solid ${nodeColor.accent}22`,
            width: '24px',
            height: '24px',
            borderRadius: '6px',
          }}>
            {renderIcon()}
          </span>
          <span>{label}</span>
      </div>
    );
  };
  