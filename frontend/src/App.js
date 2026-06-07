import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { useStore } from './store';

function App() {
  const { isModalOpen, modalData, setIsModalOpen } = useStore((state) => ({
    isModalOpen: state.isModalOpen,
    modalData: state.modalData,
    setIsModalOpen: state.setIsModalOpen,
  }));

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#fafafa',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Sidebar Panel (Left) */}
      <PipelineToolbar />

      {/* Main Workspace (Right) */}
      <div style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Floating Top Header */}
        <header style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          height: '52px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid #e4e4e7',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 10000,
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.02), 0 8px 24px rgba(15, 23, 42, 0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3b82f6',
              width: '20px',
              height: '20px',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 'bold',
            }}>
              V
            </span>
            <h1 style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#09090b',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              VectorShift <span style={{ fontWeight: '400', color: '#71717a' }}>/ Pipeline Canvas</span>
            </h1>
          </div>
          <SubmitButton />
        </header>

        {/* Canvas Area */}
        <div style={{ width: '100%', height: '100%' }}>
          <PipelineUI />
        </div>
      </div>

      {/* Viewport Centered Modal (Root Level Overlay) */}
      {isModalOpen && modalData && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(9, 9, 11, 0.4)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e4e7',
              borderRadius: '12px',
              padding: '24px',
              width: '360px',
              boxShadow: '0 20px 40px rgba(9, 9, 11, 0.08), 0 1px 3px rgba(9, 9, 11, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#09090b' }}>
                Pipeline Analysis
              </div>
              <div style={{ fontSize: '12px', color: '#71717a' }}>
                Topological verification result
              </div>
            </div>

            {/* Metrics List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderTop: '1px solid #f4f4f5',
              borderBottom: '1px solid #f4f4f5',
              padding: '16px 0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#71717a' }}>Nodes Count</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#09090b', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '4px' }}>
                  {modalData.num_nodes}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#71717a' }}>Edges Count</span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#09090b', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '4px' }}>
                  {modalData.num_edges}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#71717a' }}>Graph Structure</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: modalData.is_dag ? '#166534' : '#991b1b',
                  backgroundColor: modalData.is_dag ? '#f0fdf4' : '#fef2f2',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${modalData.is_dag ? '#bbf7d0' : '#fecaca'}`,
                }}>
                  {modalData.is_dag ? 'DAG (Acyclic)' : 'Contains Cycles'}
                </span>
              </div>
            </div>

            {/* Explanation / Description */}
            <div style={{
              fontSize: '12px',
              color: '#71717a',
              lineHeight: '1.5',
            }}>
              {modalData.is_dag 
                ? 'Your pipeline forms a valid Directed Acyclic Graph. There are no circular dependencies, making it ready for execution.'
                : 'A dependency loop was detected in the edge connections. Please remove circular references to make the pipeline executable.'}
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="custom-modal-close-btn"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#18181b',
                border: 'none',
                color: '#ffffff',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
            >
              Back to Canvas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
