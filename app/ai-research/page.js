import AiResearchClient from "./AiResearchClient";
import storiesData from "../../data/ai-stories.json";
import capabilitiesData from "../../data/ai-capabilities.json";

export const metadata = {
  title: "AI Research Feed",
  description: "Daily-updated feed of AI research, model releases, and industry news, scored for factual accuracy and writing quality.",
};

export default function AiResearchPage() {
  const stories = [...storiesData.stories].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return (
    <AiResearchClient
      stories={stories}
      generatedAt={storiesData.generatedAt}
      capabilities={capabilitiesData.capabilities}
    />
  );
}
