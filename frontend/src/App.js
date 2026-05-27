import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0f172a',
    }}>
      {/* Header */}
      <header style={{
        padding: '10px 16px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#e0e6ed',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          VectorShift Pipeline
        </h1>
      </header>

      {/* Toolbar */}
      <PipelineToolbar />

      {/* Canvas */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PipelineUI />
      </div>

      {/* Footer with Submit */}
      <footer style={{
        padding: '12px 16px',
        backgroundColor: '#0f172a',
        borderTop: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <SubmitButton />
      </footer>
    </div>
  );
}

export default App;
