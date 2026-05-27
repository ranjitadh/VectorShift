// nodes/Filter.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const FilterNode = (props) => {
  const config = getNodeConfig('filter');
  return <BaseNode {...props} config={config} />;
};
