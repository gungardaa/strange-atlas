"use client";

import dynamic from "next/dynamic";
import type { Exhibit } from "@/data/exhibits";

const AtlasMap = dynamic(() => import("@/components/atlas-map"), { ssr: false });

export default function DetailMap({ exhibit }: { exhibit: Exhibit }) {
  return (
    <AtlasMap
      items={[exhibit]}
      selectedId={exhibit.id}
      focus={{
        id: exhibit.id,
        lon: exhibit.coordinates[0],
        lat: exhibit.coordinates[1],
        zoom: exhibit.mapZoom ?? 6,
      }}
    />
  );
}
