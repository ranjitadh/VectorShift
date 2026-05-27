// submit.js

export const SubmitButton = () => {

    return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
            <button 
              type="submit"
              style={{
                padding: '8px 20px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Submit
            </button>
            <span style={{
              fontSize: '12px',
              color: '#64748b',
            }}>
              Analyze pipeline
            </span>
        </div>
    );
}
