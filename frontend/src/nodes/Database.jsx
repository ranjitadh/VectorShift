// nodes/Database.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const DatabaseNode = (props) => {
  const config = getNodeConfig('database');
  return <BaseNode {...props} config={config} />;
};
