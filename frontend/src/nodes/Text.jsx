// nodes/Text.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const TextNode = (props) => {
  const config = getNodeConfig('text');
  return <BaseNode {...props} config={config} />;
};
