// nodes/Email.jsx
import { BaseNode } from './BaseNode';
import { getNodeConfig } from './nodeConfig';

export const EmailNode = (props) => {
  const config = getNodeConfig('email');
  return <BaseNode {...props} config={config} />;
};
