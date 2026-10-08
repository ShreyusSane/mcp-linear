import { allToolDefinitions } from '../tools/definitions/index.js';
import { selectEnabledTools } from '../utils/tool-selection.js';

describe('selectEnabledTools', () => {
  it('exposes every tool when MCP_LINEAR_TOOLS is unset or blank', () => {
    expect(selectEnabledTools(allToolDefinitions, undefined)).toBe(allToolDefinitions);
    expect(selectEnabledTools(allToolDefinitions, ' , ')).toBe(allToolDefinitions);
  });

  it('exposes only the listed tools', () => {
    const tools = selectEnabledTools(allToolDefinitions, 'linear_getIssues, linear_createComment');

    expect(tools.map((tool) => tool.name).sort()).toEqual([
      'linear_createComment',
      'linear_getIssues',
    ]);
  });

  it('rejects names that are not tools', () => {
    expect(() =>
      selectEnabledTools(allToolDefinitions, 'linear_getIssues,linear_getIsues'),
    ).toThrow('MCP_LINEAR_TOOLS names unknown tools: linear_getIsues');
  });
});
