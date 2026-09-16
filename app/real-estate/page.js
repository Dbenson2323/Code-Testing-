import RealEstateClient from "./RealEstateClient";
import ratesData from "../../data/real-estate-rates.json";
import newsData from "../../data/real-estate-news.json";
import metricsData from "../../data/real-estate-metrics.json";
import modelsData from "../../data/real-estate-models.json";
import resourcesData from "../../data/real-estate-resources.json";

export const metadata = {
  title: "Real Estate",
  description: "Commercial real estate market news, interest rates, and deal-flow across four focus markets.",
};

export default function RealEstatePage() {
  return (
    <RealEstateClient
      rates={ratesData.rates}
      ratesGeneratedAt={ratesData.generatedAt}
      news={newsData.news}
      metrics={metricsData}
      models={modelsData.models}
      resources={resourcesData.resources}
    />
  );
}
