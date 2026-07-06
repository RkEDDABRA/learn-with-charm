import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const COURSES = [
  { id: "modes-action-microorganismes", title: "Modes d'action des microorganismes", chapter: "Microbiologie", path: "/licence/sage-femme/s1/microbio/modes-action" },
  { id: "bacteries", title: "Bactéries", chapter: "Microbiologie", path: "/licence/sage-femme/s1/microbio/bacteries" },
  { id: "virus", title: "Virus", chapter: "Microbiologie", path: "/licence/sage-femme/s1/microbio/virus" },
  { id: "parasites", title: "Parasites", chapter: "Microbiologie", path: "/licence/sage-femme/s1/microbio/parasites" },
  { id: "mycetes", title: "Mycètes", chapter: "Microbiologie", path: "/licence/sage-femme/s1/microbio/mycetes" },
  { id: "hematologie", title: "Hématologie", chapter: "Hématologie", path: "/licence/sage-femme/s1/hematologie" },
  { id: "immunologie", title: "Immunologie", chapter: "Immunologie", path: "/licence/sage-femme/s1/immunologie" },
];

export { COURSES };

export default defineTool({
  name: "list_courses",
  title: "List courses",
  description: "List all available Sage-Femme S1 course pages on the portfolio (Microbiologie, Hématologie, Immunologie).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(COURSES, null, 2) }],
    structuredContent: { courses: COURSES },
  }),
});
