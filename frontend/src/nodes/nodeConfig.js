// nodes/nodeConfig.js
// Centralized configuration for all node types
// Each node is just configuration - no duplication!

export const nodeConfigs = {
  customInput: {
    title: 'Input',
    description: 'Pipeline input',
    icon: '↓',
    inputs: [],
    outputs: [
      { id: 'value', label: 'Output' },
    ],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        value: 'input_1',
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        value: 'Text',
        options: ['Text', 'File', 'Number'],
      },
    ],
  },

  customOutput: {
    title: 'Output',
    description: 'Pipeline output',
    icon: '↑',
    inputs: [
      { id: 'value', label: 'Input' },
    ],
    outputs: [],
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        value: 'output_1',
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        value: 'Text',
        options: ['Text', 'Image', 'JSON'],
      },
    ],
  },

  llm: {
    title: 'LLM',
    description: 'Language model',
    icon: '🤖',
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' },
    ],
    outputs: [
      { id: 'response', label: 'Response' },
    ],
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        value: 'GPT-4',
        options: ['GPT-4', 'GPT-3.5', 'Claude', 'Llama'],
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'number',
        value: '0.7',
      },
    ],
  },

  text: {
    title: 'Text',
    description: 'Static/dynamic text',
    icon: '📝',
    inputs: [],
    outputs: [
      { id: 'output', label: 'Output' },
    ],
    fields: [
      {
        name: 'text',
        label: 'Content',
        type: 'textarea',
        value: 'Enter text or use {{variables}}',
      },
    ],
  },

  // NEW SAMPLE NODES DEMONSTRATING FLEXIBILITY

  api: {
    title: 'API Call',
    description: 'HTTP request',
    icon: '🌐',
    inputs: [
      { id: 'trigger', label: 'Trigger' },
    ],
    outputs: [
      { id: 'response', label: 'Response' },
    ],
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        value: 'GET',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        value: 'https://api.example.com',
      },
      {
        name: 'timeout',
        label: 'Timeout (s)',
        type: 'number',
        value: '30',
      },
    ],
  },

  database: {
    title: 'Database',
    description: 'Query database',
    icon: '🗄️',
    inputs: [
      { id: 'trigger', label: 'Trigger' },
    ],
    outputs: [
      { id: 'results', label: 'Results' },
      { id: 'error', label: 'Error' },
    ],
    fields: [
      {
        name: 'dbType',
        label: 'Database',
        type: 'select',
        value: 'PostgreSQL',
        options: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
      },
      {
        name: 'query',
        label: 'Query',
        type: 'textarea',
        value: 'SELECT * FROM table',
      },
    ],
  },

  delay: {
    title: 'Delay',
    description: 'Wait/sleep',
    icon: '⏱️',
    inputs: [
      { id: 'trigger', label: 'Trigger' },
    ],
    outputs: [
      { id: 'done', label: 'Done' },
    ],
    fields: [
      {
        name: 'duration',
        label: 'Duration (seconds)',
        type: 'number',
        value: '5',
      },
    ],
  },

  filter: {
    title: 'Filter',
    description: 'Conditional logic',
    icon: '🔍',
    inputs: [
      { id: 'input', label: 'Input' },
    ],
    outputs: [
      { id: 'pass', label: 'Pass' },
      { id: 'fail', label: 'Fail' },
    ],
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'text',
        value: 'value > 10',
      },
    ],
  },

  email: {
    title: 'Email',
    description: 'Send email',
    icon: '📧',
    inputs: [
      { id: 'trigger', label: 'Trigger' },
    ],
    outputs: [
      { id: 'sent', label: 'Sent' },
    ],
    fields: [
      {
        name: 'recipient',
        label: 'To',
        type: 'text',
        value: 'recipient@example.com',
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        value: 'Subject line',
      },
      {
        name: 'body',
        label: 'Message',
        type: 'textarea',
        value: 'Email body',
      },
    ],
  },
};

/**
 * Get node configuration by type
 * @param {string} nodeType - The node type (e.g., 'llm', 'api', etc.)
 * @returns {object} Node configuration object
 */
export const getNodeConfig = (nodeType) => {
  return nodeConfigs[nodeType] || nodeConfigs.text;
};
