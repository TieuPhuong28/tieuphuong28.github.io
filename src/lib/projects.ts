import { getCollection } from "astro:content";

// Published projects, sorted by the "order" field (1 = first).
export async function getProjects() {
  const all = await getCollection("projects", ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}
