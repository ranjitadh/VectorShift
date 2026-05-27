// nodes/Output.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const OutputNode = (props) => {
  const config = getNodeConfig('customOutput');
  return <BaseNode {...props} config={config} />;
};
