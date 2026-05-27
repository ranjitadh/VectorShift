// nodes/Input.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const InputNode = (props) => {
  const config = getNodeConfig('customInput');
  return <BaseNode {...props} config={config} />;
};
