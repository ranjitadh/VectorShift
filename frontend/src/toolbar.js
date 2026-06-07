// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{
          width: '280px',
          height: '100%',
          backgroundColor: '#ffffff',
          borderRight: '1.5px solid #e4e4e7',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
          gap: '24px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
            {/* Title / Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#09090b',
              }}>
                Node Components
              </div>
              <div style={{
                fontSize: '11px',
                color: '#71717a',
              }}>
                Drag and drop nodes to assemble your AI pipeline.
              </div>
            </div>

            {/* Category: Core Nodes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#a1a1aa',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Core
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                  <DraggableNode type='customInput' label='Input' />
                  <DraggableNode type='customOutput' label='Output' />
                  <DraggableNode type='text' label='Text' />
              </div>
            </div>

            {/* Category: AI & Logic */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#a1a1aa',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                AI & Logic
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                  <DraggableNode type='llm' label='LLM' />
                  <DraggableNode type='filter' label='Filter' />
                  <DraggableNode type='delay' label='Delay' />
              </div>
            </div>

            {/* Category: Integrations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: '700',
                color: '#a1a1aa',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Integrations
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}>
                  <DraggableNode type='api' label='API Call' />
                  <DraggableNode type='database' label='Database' />
                  <DraggableNode type='email' label='Email' />
              </div>
            </div>
        </div>
    );
};
