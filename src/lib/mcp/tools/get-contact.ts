import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get contact",
  description: "Get contact information for Pr. Rkia EDDABRA (ISPITS Agadir).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Pr. Rkia EDDABRA",
      role: "MCH — ISPITS Agadir",
      email: "eddabrarkia@gmail.com",
      site: "https://reddabra.lovable.app",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
