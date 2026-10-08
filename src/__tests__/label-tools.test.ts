import { allToolDefinitions } from '../tools/definitions/index.js';

describe('label MCP tools', () => {
  it('allows workspace labels, which belong to no team, in linear_getLabels output', () => {
    const getLabelsTool = allToolDefinitions.find((tool) => tool.name === 'linear_getLabels');

    expect(getLabelsTool?.output_schema.items.properties).toMatchObject({
      team: { type: ['object', 'null'] },
    });
  });
});
