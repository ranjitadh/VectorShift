// nodes/API.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const APINode = (props) => {
  const config = getNodeConfig('api');
  return <BaseNode {...props} config={config} />;
};
