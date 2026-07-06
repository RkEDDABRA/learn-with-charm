import { defineMcp } from "@lovable.dev/mcp-js";
import listCoursesTool from "./tools/list-courses";
import getCourseUrlTool from "./tools/get-course-url";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "eddabra-portfolio-mcp",
  title: "Pr. Rkia EDDABRA — Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Pr. Rkia EDDABRA academic portfolio (ISPITS Agadir). Use `list_courses` to discover Sage-Femme S1 course pages, `get_course_url` to resolve a course id to its public URL, and `get_contact` for contact information.",
  tools: [listCoursesTool, getCourseUrlTool, getContactTool],
});
