// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#0f172a',
          borderBottom: '1px solid #334155',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}>
              Drag nodes to canvas
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='email' label='Email' />
            </div>
        </div>
    );
};
