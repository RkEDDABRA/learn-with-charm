import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { COURSES } from "./list-courses";

const SITE = "https://reddabra.lovable.app";

export default defineTool({
  name: "get_course_url",
  title: "Get course URL",
  description: "Return the full public URL for a course by its id (see list_courses).",
  inputSchema: {
    id: z.string().min(1).describe("Course id from list_courses (e.g. 'virus', 'hematologie')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const course = COURSES.find((c) => c.id === id);
    if (!course) {
      return { content: [{ type: "text", text: `Unknown course id: ${id}` }], isError: true };
    }
    const url = `${SITE}${course.path}`;
    return {
      content: [{ type: "text", text: url }],
      structuredContent: { ...course, url },
    };
  },
});
