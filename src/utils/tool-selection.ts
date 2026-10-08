import type { MCPToolDefinition } from '../types.js';

/**
 * Limit the exposed tools to the comma-separated names in MCP_LINEAR_TOOLS, for
 * example `linear_getIssues,linear_createComment`. Unset or blank exposes every
 * tool. An unknown name is an error, so a typo does not silently hide a tool.
 */
export function selectEnabledTools(
  tools: MCPToolDefinition[],
  value: string | undefined = process.env.MCP_LINEAR_TOOLS,
): MCPToolDefinition[] {
  const names = (value ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  if (names.length === 0) return tools;

  const known = new Set(tools.map((tool) => tool.name));
  const unknown = names.filter((name) => !known.has(name));
  if (unknown.length > 0) {
    throw new Error(`MCP_LINEAR_TOOLS names unknown tools: ${unknown.join(', ')}`);
  }
  const enabled = new Set(names);
  return tools.filter((tool) => enabled.has(tool.name));
}
