// nodes/Delay.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const DelayNode = (props) => {
  const config = getNodeConfig('delay');
  return <BaseNode {...props} config={config} />;
};
