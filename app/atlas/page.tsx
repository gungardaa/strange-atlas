import AtlasClient from "./atlas-client";

export const metadata = {
  title: "Atlas",
  description: "Explore all 31 strange places on an interactive world map.",
};

export default function AtlasPage() {
  return <AtlasClient />;
}
