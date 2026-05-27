// nodes/LLM.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const LLMNode = (props) => {
  const config = getNodeConfig('llm');
  return <BaseNode {...props} config={config} />;
};
