// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges, setModalData, setIsModalOpen } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    setModalData: state.setModalData,
    setIsModalOpen: state.setIsModalOpen,
  }));

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const payload = {
      nodes: nodes.map((node) => ({ id: node.id })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setModalData(result);
      setIsModalOpen(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      alert(`Pipeline analysis failed: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className="custom-submit-btn"
        style={{
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '500',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
          transition: 'all 0.2s ease-in-out',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Pipeline'}
      </button>
    </div>
  );
};
