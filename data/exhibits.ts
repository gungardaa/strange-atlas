export type ExhibitCategory =
  | "border-puzzles"
  | "enclaves-exclaves"
  | "access-oddities"
  | "time-date"
  | "history-shaped-borders"
  | "geography-beyond-borders";

export type Source = {
  title: string;
  publisher: string;
  url: string;
  sourceType: "primary" | "official" | "institutional" | "reference";
  language?: string;
  supports: string[];
};

export type TimelineEvent = {
  dateLabel: string;
  title: string;
  description: string;
};

export type Exhibit = {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  category: ExhibitCategory;
  tags: string[];
  countries: string[];
  coordinates: [longitude: number, latitude: number];
  locationPrecision: "point-of-interest" | "approximate-area" | "historical-area";
  mapZoom?: number;
  teaser: string;
  leadFact: string;
  explanation: string[];
  historicalContext?: string[];
  whyItMatters?: string[];
  fieldNote?: string;
  timeline?: TimelineEvent[];
  sources: Source[];
  verificationStatus: "draft" | "verified" | "needs-review";
  lastVerified: string;
  featured?: boolean;
};

export const CATEGORIES: { id: ExhibitCategory; label: string; color: string }[] = [
  { id: "border-puzzles", label: "Border puzzles", color: "#0F9D9A" },
  { id: "enclaves-exclaves", label: "Enclaves and exclaves", color: "#4169E1" },
  { id: "access-oddities", label: "Access oddities", color: "#3F8F5F" },
  { id: "time-date", label: "Time and date", color: "#D58A13" },
  { id: "history-shaped-borders", label: "Borders shaped by history", color: "#8A63D2" },
  { id: "geography-beyond-borders", label: "Geography beyond borders", color: "#0077B6" },
];

export const categoryLabel = (c: ExhibitCategory) =>
  CATEGORIES.find((x) => x.id === c)?.label ?? c;

export const categoryColor = (c: ExhibitCategory) =>
  CATEGORIES.find((x) => x.id === c)?.color ?? "#087F8C";

// ponytail: single curated file, no CMS or DB. Split or add a loader if entries pass ~100.
export const exhibits: Exhibit[] = [
  {
    id: "baarle",
    slug: "baarle",
    number: 1,
    title: "Baarle-Hertog and Baarle-Nassau",
    subtitle: "Two municipalities sharing one village across two countries",
    category: "border-puzzles",
    tags: ["nested territory", "counter-enclave", "treaty history"],
    countries: ["Belgium", "Netherlands"],
    coordinates: [4.929, 51.443],
    locationPrecision: "approximate-area",
    mapZoom: 13,
    teaser: "One village where the border crosses streets and front doors.",
    leadFact:
      "The Belgian and Dutch municipalities together hold 30 enclaves. Seven Dutch sub-enclaves sit inside the two largest Belgian enclaves, and the boundary runs through streets and buildings.",
    explanation: [
      "Baarle is two local governments on the same ground. Baarle-Hertog belongs to Belgium and Baarle-Nassau belongs to the Netherlands. Parcels of each sit inside the other, so a short walk can cross an international boundary several times.",
      "Baarle-Hertog covers 748 hectares with about 3,100 residents while Baarle-Nassau spreads over 7,641 hectares with about 7,200. The hamlet of Castelré sits as a Dutch peninsula inside Belgium eleven kilometres from the village centre.",
      "The boundaries run through streets and houses, even bedrooms. Paving stones and metal plates in the road mark the line. Every house number plaque carries a small flag showing whether its front door stands in Belgium or the Netherlands.",
      "The enclave boundaries were formally finalized and numbered in 1995. Belgian pieces run H1 to H22 and Dutch pieces N1 to N8. Cycle or walk the enclave passport routes to visit all thirty.",
    ],
    historicalContext: [
      "The pattern grew from medieval land grants that split feudal dues between rival lords. Later border treaties kept the scattered parcels instead of tidying them into one line. The boundaries were formally finalized and numbered in 1995.",
    ],
    whyItMatters: [
      "In Baarle, the location of a building's front door can determine which municipality's rules apply to it. Police, planning, and shop opening rules can change from one door to the next. The flag on each plaque tells post carriers and patrols which country they stand in.",
    ],
    fieldNote:
      "Baarle calls itself the world capital of enclaves.",
    sources: [
      {
        title: "Enclaves visitor information",
        publisher: "Visit Baarle",
        url: "https://en.visitbaarle.com/locaties/enclaves-5e43f39e38374665355357fe",
        sourceType: "official",
        supports: ["30 enclaves", "boundary through streets and buildings", "numbered H1 to H22 and N1 to N8 in 1995", "enclave passport routes"],
      },
      {
        title: "About Baarle",
        publisher: "Visit Baarle",
        url: "https://m-en.visitbaarle.com/informatie/overbaarle",
        sourceType: "official",
        supports: ["748 hectares and 3,100 residents in Hertog", "7,641 hectares and 7,200 residents in Nassau", "Castelré peninsula 11 km out", "paving stones and plates mark the line", "flags on house number plates", "world capital of enclaves"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
    featured: true,
  },
  {
    id: "llivia",
    slug: "llivia",
    number: 2,
    title: "Llívia",
    subtitle: "A Spanish town entirely surrounded by France",
    category: "enclaves-exclaves",
    tags: ["separated territory", "treaty history"],
    countries: ["Spain", "France"],
    coordinates: [1.982, 42.466],
    locationPrecision: "point-of-interest",
    mapZoom: 12,
    teaser: "A piece of Spain sits inside France.",
    leadFact:
      "Llívia remained Spanish after the Treaty of the Pyrenees because the agreement transferred villages, not the town itself.",
    explanation: [
      "Llívia covers about 13 square kilometres in the eastern Pyrenees. French land surrounds it on every side.",
      "Its town hall, schools and local services are Spanish. A road runs from Llívia to Puigcerdà across French ground so residents can reach the rest of Spain. Daily trips for work, shopping or school can cross an international boundary without leaving the valley.",
      "People have lived on the hill above the town since the Bronze Age. Romans built a town called Iulia Lybica at its foot in the first century BC. Llívia later served as capital of the county of Cerdanya and its castle guarded the Segre route through the mountains until French forces destroyed it in 1479.",
      "The parish church was finished in 1617 and holds a baroque altarpiece dedicated to Our Lady of the Angels. The Toret cross outside dates to the sixteenth century.",
    ],
    historicalContext: [
      "The 1659 treaty ended fighting between France and Spain and moved a set of villages to France. Llívia counted as a town rather than a village, so it stayed Spanish while the land around it changed hands. A follow-up agreement in 1660 confirmed the outcome and the boundary was settled with Bayonne in the 1860s.",
      "Long before the treaty, Llívia had been the capital of Cerdanya and home to its counts. Puigcerdà later took over the administrative role but Llívia kept its strategic castle. Its destruction in 1479 left Llívia a royal town without a fortress, which is the status it held when the treaty negotiators drew their line.",
    ],
    whyItMatters: [
      "Residents vote in Spanish elections and use Spanish schools and services while living surrounded by France. Town or village was the wording that kept Llívia Spanish, so a single word in a treaty still shapes daily administration.",
    ],
    fieldNote:
      "The town hall traces settlement on the hill back to 1200 BC.",
    timeline: [
      {
        dateLabel: "1659",
        title: "Treaty of the Pyrenees",
        description: "France and Spain end their war. The treaty cedes villages of Cerdanya to France, but Llívia counts as a town rather than a village.",
      },
      {
        dateLabel: "1660",
        title: "Treaty of Llívia",
        description: "A follow-up agreement confirms Llívia stays Spanish while the surrounding land changes hands.",
      },
      {
        dateLabel: "1866-1868",
        title: "Boundaries ratified",
        description: "The Bayonne process fixes the border line, leaving Llívia a Spanish enclave inside France.",
      },
      {
        dateLabel: "Today",
        title: "Spanish town, French surroundings",
        description: "Llívia keeps its Spanish town hall and schools, reached by road across a short stretch of France.",
      },
    ],
    sources: [
      {
        title: "History of Llívia",
        publisher: "Llívia City Hall",
        url: "https://llivia.eu/en/council/history.html",
        sourceType: "primary",
        supports: ["12.9 sq km surrounded by French territory", "Roman Iulia Lybica and Bronze Age settlement", "capital of Cerdanya", "castle destroyed in 1479", "church finished in 1617 with baroque altarpiece", "1659 treaty and 1866 to 1868 settlement"],
      },
      {
        title: "Llívia",
        publisher: "Britannica",
        url: "https://www.britannica.com/place/Llivia",
        sourceType: "reference",
        supports: ["Spanish town surrounded by France", "treaty transferred villages only", "town status kept it Spanish", "neutral road to Puigcerdà"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "lesotho",
    slug: "lesotho",
    number: 3,
    title: "Lesotho",
    subtitle: "A country fully surrounded by one neighbour",
    category: "enclaves-exclaves",
    tags: ["separated territory", "land access"],
    countries: ["Lesotho", "South Africa"],
    coordinates: [28.25, -29.5],
    locationPrecision: "approximate-area",
    mapZoom: 6,
    teaser: "An entire country inside another country.",
    leadFact:
      "Lesotho is completely surrounded by South Africa. It is also strikingly mountainous, with the whole country lying above 1,000 metres according to the Central Bank of Lesotho.",
    explanation: [
      "Lesotho is one of very few sovereign states surrounded by a single other country. Every road out of Lesotho leads into South Africa. No other country touches it.",
      "Mountains shape daily life. Villages sit on high plateaus and winters bring snow. Peaks, valleys and rivers give the country its clear water and green pastures.",
      "Diamonds come from the mountains. Water royalties from sales to South Africa form an important income stream beside farming, herding and manufacturing. Visitors travel far for the rock trails and clean mountain water.",
      "The country calls itself the Mountain Kingdom and the Kingdom in the Sky. Herders graze livestock on green high pastures. Rivers carry clear water downhill, and selling that water brings royalties from South Africa.",
    ],
    historicalContext: [
      "Lesotho gained independence in 1966 as a kingdom fully surrounded by South Africa. The 1966 independence kept the mountain kingdom intact inside the new African map.",
    ],
    whyItMatters: [
      "Water royalties and customs union proceeds matter greatly to state income. Most overland routes and many supply chains connect through South Africa, so relations with the neighbour shape daily life. A traveller cannot leave without crossing South African passport control.",
    ],
    fieldNote:
      "The whole country lies above 1,000 metres.",
    sources: [
      {
        title: "Lesotho country brief",
        publisher: "Australian DFAT",
        url: "https://www.dfat.gov.au/geo/lesotho",
        sourceType: "official",
        supports: ["surrounded by South Africa"],
      },
      {
        title: "About the Kingdom of Lesotho",
        publisher: "Central Bank of Lesotho",
        url: "https://centralbank.org.ls/about-the-kingdom-of-lesotho/",
        sourceType: "official",
        supports: ["territory above 1,000 metres"],
      },
      {
        title: "Tourism",
        publisher: "Government of Lesotho",
        url: "https://www.gov.ls/about-lesotho/tourism",
        sourceType: "official",
        supports: ["Mountain Kingdom and Kingdom in the Sky", "mountains valleys and rivers scenery", "diamonds in the mountains", "clean water as major income", "tourists travel far for rocks and water", "green pastures for livestock"],
      },
      {
        title: "Economy",
        publisher: "Government of Lesotho",
        url: "https://www.gov.ls/about-lesotho/economy/",
        sourceType: "official",
        supports: ["water royalties as important income", "farming herding and manufacturing base", "customs union majority of revenues", "South Africa swings shape the economy"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
    featured: true,
  },
  {
    id: "buesingen",
    slug: "buesingen",
    number: 4,
    title: "Büsingen am Hochrhein",
    subtitle: "A German town inside Switzerland that uses Swiss francs",
    category: "enclaves-exclaves",
    tags: ["separated territory", "treaty history"],
    countries: ["Germany", "Switzerland"],
    coordinates: [8.69, 47.697],
    locationPrecision: "point-of-interest",
    mapZoom: 12,
    teaser: "German streets where shoppers pay in francs.",
    leadFact:
      "Büsingen is German territory surrounded by Switzerland, yet it belongs to the Swiss customs territory under a bilateral arrangement.",
    explanation: [
      "Büsingen covers about 7.6 square kilometres on the Rhine east of Schaffhausen and holds around 1,500 residents. A strip of Swiss ground about 750 metres wide separates it from the rest of Germany. Travellers from Germany pass through Switzerland to reach it.",
      "Daily life follows Swiss practice in many areas. Swiss francs are commonly used in everyday transactions and Swiss customs rules apply. Swiss law governs areas such as agriculture. Residents import goods bought in Germany into Switzerland even though they live in Germany.",
      "A treaty in place since 1967 governs which areas of Swiss law apply in the village. The arrangement removed the friction of a hard customs line without moving the boundary itself.",
      "The border runs through gardens and even a restaurant without bothering anyone. Many older residents feel closer to Switzerland while holding German citizenship and voting in German elections.",
    ],
    historicalContext: [
      "Büsingen became an exclave in the eighteenth century when the Habsburg Empire transferred the land rights of neighbouring Dörflingen to Zurich. The village suddenly found itself ringed by Swiss ground.",
      "It passed from Austrian hands to Baden and later to Baden-Württemberg in 1952. In 1918 nearly all voters backed joining Switzerland, but Bern refused. The 1967 treaty then settled its customs status and the village has lived with the double system ever since.",
    ],
    whyItMatters: [
      "German administration runs the town while Swiss customs rules and the franc shape shopping and farming. A short errand can mean importing goods across a customs boundary that has no checkpoint.",
    ],
    sources: [
      {
        title: "German island in Switzerland and state treaty",
        publisher: "Municipality of Büsingen",
        url: "https://www.buesingen.de/de/Unser-Buesingen/Deutsche-Insel-in-der-Schweiz/Staatsvertrag",
        sourceType: "primary",
        language: "German",
        supports: ["German territory in Switzerland", "Swiss customs arrangement", "Swiss francs in daily use"],
      },
      {
        title: "Büsingen, the German exclave in Switzerland",
        publisher: "deutschland.de",
        url: "https://www.deutschland.de/en/topic/life/german-exclave-in-switzerland",
        sourceType: "official",
        supports: ["7.62 sq km and 1,500 residents", "750 metre Swiss strip", "treaty in place since 1967", "Swiss customs and agriculture rules", "border through restaurant garden"],
      },
      {
        title: "The curious case of the German village surrounded by Switzerland",
        publisher: "SWI swissinfo.ch",
        url: "https://www.swissinfo.ch/eng/swiss-oddities/the-curious-case-of-the-german-village-surrounded-by-switzerland/90162513",
        sourceType: "reference",
        supports: ["Dörflingen land rights to Zurich in 1770", "1918 referendum nearly all for joining Switzerland", "Bern refused annexation"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "madha-nahwa",
    slug: "madha-nahwa",
    number: 5,
    title: "Madha and Nahwa",
    subtitle: "A counter-enclave inside an enclave",
    category: "enclaves-exclaves",
    tags: ["counter-enclave", "nested territory"],
    countries: ["Oman", "United Arab Emirates"],
    coordinates: [56.27, 25.28],
    locationPrecision: "approximate-area",
    mapZoom: 11,
    teaser: "Emirati land inside Omani land inside Emirati land.",
    leadFact:
      "Nahwa belongs to the United Arab Emirates but sits inside Madha, an Omani enclave surrounded by the UAE. This is a counter-enclave arrangement.",
    explanation: [
      "Madha is an Omani district set back from the coast and home to about 2,000 people. UAE territory surrounds it. Inside Madha sits Nahwa, a village that belongs to the Emirate of Sharjah.",
      "The nesting is administrative rather than fenced. Roads pass from UAE ground into Omani ground and back into UAE ground with modest signs marking each change. There is no formal border crossing between the territories.",
      "Crossing feels ordinary. Mobile phones greet travellers with a new network message as the ground changes hands. Families on both sides share daily life across lines that barely register on the ground.",
      "New Nahwa was built on a bend in Wadi Shis after the old village was abandoned in 1999. Date palm plantations, rocky peaks and freshwater pools now draw campers and trekkers. The enclave lies about 138 kilometres east of Sharjah city.",
    ],
    historicalContext: [
      "Before the UAE existed, the area belonged to sheikhdoms under British protection. British officials toured the villages around 1900 to record tribal loyalties ahead of mapping the borders.",
      "One commonly reported account says Madha declared for the Sultan of Muscat, partly to protect its wells. Madha was known for sweet water and residents feared a tribal ruler would take it. Nahwa stayed loyal to the Qawasim of Sharjah. The neighbouring rulers negotiated firm borders decades later.",
    ],
    whyItMatters: [
      "The arrangement shows how tribal allegiance hardened into international borders. The counter-enclave survives as the only one of its kind in the Middle East.",
    ],
    sources: [
      {
        title: "Nahwa enclave guide",
        publisher: "Visit Sharjah",
        url: "https://www.visitsharjah.com/en/regions/east-coast/nahwa-enclave/",
        sourceType: "official",
        supports: ["Nahwa inside Madha", "counter-enclave arrangement", "New Nahwa built in 1999 on Wadi Shis", "138 km east of Sharjah city", "camping and freshwater pools"],
      },
      {
        title: "A hidden piece of the Emirates",
        publisher: "The National",
        url: "https://www.thenationalnews.com/uae/a-hidden-piece-of-the-emirates-1.490500",
        sourceType: "reference",
        supports: ["tribal loyalties recorded around 1900", "sweet water motive", "no formal border crossing", "only counter-enclave in the Middle East", "about 2,000 residents"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "haskell",
    slug: "haskell",
    number: 6,
    title: "Haskell Free Library and Opera House",
    subtitle: "One building with its feet in two countries",
    category: "border-puzzles",
    tags: ["border through a building"],
    countries: ["United States", "Canada"],
    coordinates: [-72.13, 45.005],
    locationPrecision: "point-of-interest",
    mapZoom: 15,
    teaser: "The stage is in one country and much of the audience in another.",
    leadFact:
      "The building straddles the United States and Canada boundary, but it is not a border crossing. Visitors must use the entrance on their own side and leave through that same entrance.",
    explanation: [
      "The library stands on the line between Derby Line in Vermont and Stanstead in Quebec. The historic layout puts the front door in the United States while the books rest in Canada, and the reading room belongs to both. Since October 2025 the two street entrances work separately, with Americans entering on Caswell Avenue and Canadians on Church Street.",
      "Upstairs, most of the audience sits in the United States to watch a show on a stage in Canada. The opera house was meant to fund the library below under a 1908 charter.",
      "Entry rules are strict. Visitors enter from their own side and return to the same side, since stepping through the building does not count as a legal crossing. The sidewalk linking the two sides closed permanently except for visitors with reduced mobility.",
      "Both countries list the building as a historic site. Performers from William Jennings Bryan to the Vermont Symphony Orchestra have played upstairs, and signatures cover the dressing room walls.",
    ],
    historicalContext: [
      "Martha Stewart Haskell and her son Horace gave the building to the border towns and named it for her late husband Carlos. The cornerstone went down in 1901 and the doors opened in 1904.",
    ],
    whyItMatters: [
      "One building serves two towns that share streets but not laws. A visit never counts as a crossing, and carrying goods across the line or holding cross-border meetings inside stays prohibited.",
    ],
    fieldNote:
      "The opera house closed from 1993 to 1997 for wheelchair access and fire safety, then reopened with its historic look intact.",
    sources: [
      {
        title: "Our story",
        publisher: "Haskell Free Library and Opera House",
        url: "https://www.haskelloperahouse.org/our-story.html",
        sourceType: "primary",
        supports: ["built astride the boundary", "gift of the Haskell family for Carlos", "cornerstone 1901 and opening 1904", "front door in US and books in Canada", "stage in Canada and audience in US", "historic site in both countries", "1993 to 1997 closure and reopening"],
      },
      {
        title: "Visitor guidance",
        publisher: "Haskell Free Library and Opera House",
        url: "https://www.haskelloperahouse.org/visits.html",
        sourceType: "primary",
        supports: ["not a border crossing", "leave through same entrance", "October 2025 sidewalk closure", "Caswell Avenue US entrance", "Church Street Canada entrance", "reduced mobility exemption"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "point-roberts",
    slug: "point-roberts",
    number: 7,
    title: "Point Roberts",
    subtitle: "A Washington community reached by road only through Canada",
    category: "access-oddities",
    tags: ["land access", "separated territory"],
    countries: ["United States", "Canada"],
    coordinates: [-123.08, 48.99],
    locationPrecision: "point-of-interest",
    mapZoom: 11,
    teaser: "American school buses cross Canada to get home.",
    leadFact:
      "Point Roberts is part of the United States, but the usual road journey from the rest of Washington passes through Canada. Boat and air access are alternatives.",
    explanation: [
      "Point Roberts dangles below the 49th parallel at the tip of a Canadian peninsula. The boundary runs straight across the land, leaving this patch of Washington cut off by water and border.",
      "The drive from the Blaine crossings runs about 26 miles and forty minutes each way through Canada. Reaching the rest of Washington means crossing two international borders for one errand.",
      "Groceries, school travel, and medical trips often mean two border crossings in one errand. Private boats can clear customs at the marina dock, and chartered flights use the local airpark.",
      "The point covers under five square miles about twenty miles south of Vancouver. Fourteen miles of water separate it from Blaine, and a 2014 statement put NEXUS enrollment near 80 percent of residents.",
      "The full-service marina holds hundreds of guest boats and the private airpark takes charter flights. No scheduled ferry or airline serves the point, so residents drive, sail or fly themselves.",
    ],
    historicalContext: [
      "The boundary follows the 49th parallel to the sea while the peninsula dips south of it. Mapmakers drew a straight line and left the tip on the American side.",
    ],
    whyItMatters: [
      "Most ordinary road trips and many supply runs pass through Canada, so wait times at the crossing set the rhythm of daily life. In fiscal year 2013 nearly 400,000 NEXUS crossings showed how often residents shuttle through Canada.",
    ],
    fieldNote:
      "Drivers leave the Canadian highway at 56th Street and roll into the point on Tyee Drive.",
    sources: [
      {
        title: "Getting here",
        publisher: "Visit Point Roberts",
        url: "https://visitpointroberts.com/getting-here",
        sourceType: "official",
        supports: ["road route through Canada", "boat and air alternatives", "49th parallel straight line"],
      },
      {
        title: "Getting Here",
        publisher: "Point Roberts Chamber of Commerce",
        url: "https://www.pointrobertschamberofcommerce.com/getting-here",
        sourceType: "official",
        supports: ["26 mile 40 minute drive through Canada", "two international border crossings per trip", "marina guest moorage", "private airpark with charter flights", "no scheduled ferry or airline", "Tyee Drive border approach"],
      },
      {
        title: "DelBene Welcomes Extended NEXUS Lane Hours at Point Roberts Border Crossing",
        publisher: "U.S. House of Representatives",
        url: "https://delbene.house.gov/news/documentsingle.aspx?DocumentID=1868",
        sourceType: "primary",
        supports: ["4.9 square mile exclave", "20 miles south of Vancouver", "14 mile boat trip from Blaine", "2014 statement of 80 percent NEXUS enrollment", "fiscal year 2013 400,000 NEXUS crossings"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "northwest-angle",
    slug: "northwest-angle",
    number: 8,
    title: "Northwest Angle",
    subtitle: "The northern tip of Minnesota beyond the border line",
    category: "access-oddities",
    tags: ["land access", "treaty history"],
    countries: ["United States", "Canada"],
    coordinates: [-95.15, 49.35],
    locationPrecision: "approximate-area",
    mapZoom: 9,
    teaser: "Minnesota land you can only drive to through Canada.",
    leadFact:
      "This northern part of Minnesota is surrounded by Canada and Lake of the Woods. The road route runs through Canada, while water or seasonal ice routes offer alternatives.",
    explanation: [
      "The Angle sits at the top of the Lower 48 states, wrapped by Manitoba, Ontario and the Lake of the Woods. Lake water laps its eastern shore.",
      "The Angle exists because early mapmakers misjudged where the Mississippi began. The treaty line they drew left a small cap of United States land above the 49th parallel.",
      "The state forest covers more than 144,000 acres, and much of that ground is Red Lake tribal land. Roads are few, so fishing and boating lead the list of pastimes. Grant-in-aid snowmobile trails cross the forest for winter riders.",
      "Drivers reach Angle Inlet by motor vehicle through Manitoba with a passport in hand. From the south shores, boats cross in summer and ice roads and snowmobile trails take over in winter.",
    ],
    historicalContext: [
      "The 1783 Treaty of Paris drew a due-west line from the lake to the Mississippi that could never work, since the river source sits south of the lake. The 1818 convention redrew the line down to the 49th parallel and left the Angle above it. Much of the state forest is Red Lake tribal land today.",
    ],
    whyItMatters: [
      "Residents plan every southbound trip around a foreign country. A passport and a look at the ice decide whether the day runs by road, water or snow.",
    ],
    fieldNote:
      "Boating access runs limited because the shorelines sit shallow and exposed.",
    sources: [
      {
        title: "Northwest Angle state forest",
        publisher: "Minnesota DNR",
        url: "https://www.dnr.state.mn.us/state-forests/forest.html?id=sft00036",
        sourceType: "official",
        supports: ["location and geography", "top of the Lower 48", "144,412 acres much Red Lake tribal land", "motor vehicle route through Manitoba", "passport needed", "boat and ice road access", "fishing as primary activity", "snowmobile trails", "shallow exposed shorelines"],
      },
      {
        title: "Northwest Angle, Minnesota",
        publisher: "NASA Earth Observatory",
        url: "https://science.nasa.gov/earth/earth-observatory/northwest-angle-minnesota-6357",
        sourceType: "institutional",
        supports: ["1783 due-west line unworkable", "Mississippi source south of the lake", "1818 line down to the 49th parallel", "Red Lake Reservation across much of the area"],
      },
      {
        title: "Northwest Angle region guide",
        publisher: "Explore Minnesota",
        url: "https://www.exploreminnesota.com/regions/north-lakes/northwest-angle",
        sourceType: "official",
        supports: ["road route through Canada", "water access"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "kleinwalsertal",
    slug: "kleinwalsertal",
    number: 9,
    title: "Kleinwalsertal",
    subtitle: "An Austrian valley with roads only to Germany",
    category: "access-oddities",
    tags: ["land access"],
    countries: ["Austria", "Germany"],
    coordinates: [10.13, 47.35],
    locationPrecision: "approximate-area",
    mapZoom: 11,
    teaser: "Austrian postcodes at the end of German roads.",
    leadFact:
      "This Austrian valley is only accessible by road from Germany, despite being part of Austria.",
    explanation: [
      "The valley holds three villages, Riezlern, Hirschegg and Mittelberg, plus the hamlet of Baad. High peaks wall it off from the rest of Austria. Every car arrives through German roads before reaching Austrian houses, hotels and ski lifts.",
      "Walser settlers from present-day Switzerland arrived centuries ago and gave the valley its name. Their dialect recalls those Swiss roots and local customs still shape food and festivals.",
      "Skiers cross the border without noticing at the Kanzelwand and Fellhorn slopes shared with Oberstdorf in Germany. Hikers use a cross-border trail network between the two countries. The Breitach gorge cuts the entrance to the valley.",
      "The valley works around this with close cross border habits. Day trips treat the German approach as the ordinary way in, since no other road exists.",
    ],
    historicalContext: [
      "Walser settlers from present-day Switzerland arrived centuries ago and their dialect and customs survive in the valley. The community kept its Alpine way of life while the peaks kept it apart from the Austrian lowlands.",
    ],
    whyItMatters: [
      "The valley answers to the Austrian district of Bregenz while every road in starts in Germany. Ski lifts and hiking trails cross the boundary, so winter and summer holidays happen in both countries at once.",
    ],
    fieldNote:
      "The valley tourist office sells a cultural guide full of Walser history and customs.",
    sources: [
      {
        title: "Kleinwalsertal region guide",
        publisher: "Vorarlberg Tourism",
        url: "https://www.vorarlberg.travel/en/regions/kleinwalsertal/",
        sourceType: "official",
        supports: ["Austrian valley", "road access from Germany", "three villages plus Baad", "cross-border ski area with Oberstdorf", "Breitach gorge at the entrance", "district of Bregenz"],
      },
      {
        title: "Walser Culture",
        publisher: "Kleinwalsertal Tourismus",
        url: "https://www.kleinwalsertal.com/en/indulgence-wellbeing/walser-culture",
        sourceType: "official",
        supports: ["part of Austria reached via Germany", "Swiss roots and dialect", "Walser traditions", "cultural guide to Walser history"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "oecusse",
    slug: "oecusse",
    number: 10,
    title: "Oecusse-Ambeno",
    subtitle: "Timor-Leste land on the far side of Indonesian territory",
    category: "enclaves-exclaves",
    tags: ["separated territory"],
    countries: ["Timor-Leste", "Indonesia"],
    coordinates: [124.37, -9.2],
    locationPrecision: "approximate-area",
    mapZoom: 9,
    teaser: "The first Portuguese landing place, now cut off by land.",
    leadFact:
      "Oecusse is a coastal enclave of Timor-Leste surrounded by Indonesian territory. Its geography also shaped historical Portuguese contact with Timor.",
    explanation: [
      "Oecusse sits on the north coast of Timor island, separated from the rest of Timor-Leste by Indonesian West Timor. Sea and air links bridge the gap that roads cannot cross without a border.",
      "Jagged peaks rise behind fertile flats along the Tono River, and long beaches face the sea. The main town Pante Macassar lines grey sand backed by mountains.",
      "Portuguese sailors landed at nearby Lifau in 1515, the moment that began four and a half centuries of Portuguese influence. A memorial park marks the spot today.",
      "The Kutet jungle hides waterfalls and mountain views, and Pantai Mahata offers reef snorkelling with passing whales. Small mud volcanoes near Oesilo add a stranger stop.",
      "Ferries and small aircraft run from Dili, since no road reaches the rest of the country without crossing Indonesia. Overland travellers go through Indonesia instead.",
    ],
    historicalContext: [
      "Lifau gave Portugal its first foothold on Timor, and Catholic influence spread from these shores. The district kept its coastal identity through centuries of colonial rule.",
    ],
    whyItMatters: [
      "Dawan communities maintain distinct cultural traditions. Direct links to Dili run by sea or air, while overland travel requires transit through Indonesia.",
    ],
    fieldNote:
      "Whale migration passes Pantai Mahata in season.",
    sources: [
      {
        title: "Oecusse destination guide",
        publisher: "Timor-Leste Tourism",
        url: "https://timorleste.tl/destinations/oecusse",
        sourceType: "official",
        supports: ["coastal enclave", "historical Portuguese contact", "Tono River flats and peaks", "Pante Macassar grey sand", "Lifau 1515 landing and memorial", "Catholic influence from Lifau", "Kutet jungle and waterfalls", "Mahata reef and whales", "Oesilo mud volcanoes", "ferry and flight from Dili", "Dawan people"],
      },
      {
        title: "Official Government Website of Oe-Cusse",
        publisher: "RAEOA Timor-Leste",
        url: "https://raeoa.tl/",
        sourceType: "official",
        supports: ["Special Administrative Region status", "early Portuguese contact", "separation from the rest of the country"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "campione",
    slug: "campione",
    number: 11,
    title: "Campione d'Italia",
    subtitle: "An Italian town on a Swiss lake with a changed customs story",
    category: "enclaves-exclaves",
    tags: ["separated territory"],
    countries: ["Italy", "Switzerland"],
    coordinates: [8.97, 45.97],
    locationPrecision: "point-of-interest",
    mapZoom: 12,
    teaser: "Italian streets on Lake Lugano, once outside EU customs.",
    leadFact:
      "This Italian exclave lies within Switzerland. Its customs status changed on 1 January 2020 when it entered the EU customs territory, while its unusual geography remained.",
    explanation: [
      "Campione sits on the eastern shore of Lake Lugano with Swiss land between it and the rest of Italy. The lake water off its shore counts as Italian under the same directive that changed its customs status.",
      "For years the town sat outside EU customs, which shaped its casino economy and shopping habits. Since 1 January 2020 it sits inside the EU customs territory and the excise area, while VAT stays outside under a local tax regime aligned with the Swiss system.",
      "The switch came through a 2019 EU directive that named Campione and the Italian waters of the lake. Swiss authorities recorded the same date for the handover.",
      "The town hall lists the casino halls, a civic gallery and the lake boat timetable among local landmarks. Boats link Campione with Lugano and Melide across water that two states share.",
    ],
    historicalContext: [
      "The customs exception survived Italy's EU membership for decades. Brussels closed the gap with the 2019 directive and the change took effect on the first day of 2020.",
    ],
    whyItMatters: [
      "Customs checks in Campione now follow the EU regime like the rest of Italy, but VAT stays outside it. Shoppers and firms lost some quirks while the local tax gap with Switzerland remains.",
    ],
    fieldNote:
      "The municipal site still lists the casino halls first among town landmarks.",
    sources: [
      {
        title: "Directive 2019/475 on Campione customs status",
        publisher: "EUR-Lex",
        url: "https://eur-lex.europa.eu/eli/dir/2019/475",
        sourceType: "official",
        supports: ["entered EU customs territory on 1 January 2020", "names Campione and Italian lake waters", "excise duty included", "outside EU VAT area", "local tax aligned with Swiss VAT"],
      },
      {
        title: "Comune di Campione d'Italia",
        publisher: "Municipality of Campione d'Italia",
        url: "https://www.comune.campione-d-italia.co.it/",
        sourceType: "primary",
        language: "Italian",
        supports: ["casino gaming halls", "civic gallery", "lake boat links to Lugano and Melide"],
      },
      {
        title: "Campione customs communication",
        publisher: "Swiss Federal Council",
        url: "https://www.admin.ch/it/nsb?id=77687",
        sourceType: "official",
        language: "Italian",
        supports: ["Italian exclave within Switzerland"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "kaliningrad",
    slug: "kaliningrad",
    number: 12,
    title: "Kaliningrad region",
    subtitle: "A Russian region apart from Russia with a Baltic coast",
    category: "enclaves-exclaves",
    tags: ["separated territory"],
    countries: ["Russia", "Lithuania", "Poland"],
    coordinates: [20.51, 54.71],
    locationPrecision: "approximate-area",
    mapZoom: 7,
    teaser: "Russian land between Poland and Lithuania.",
    leadFact:
      "Kaliningrad is a Russian region separated from the rest of Russia by the territories of other countries, with a Baltic Sea coastline.",
    explanation: [
      "An exclave is territory of one country separated from the mainland. An enclave is that same land seen from the surrounding side. Kaliningrad is a Russian exclave, but it is not an enclave of any single neighbour since it touches the sea and two states.",
      "Nearly a million people live in the region between Poland and Lithuania on the Baltic coast. EU enlargement in 2004 left it ringed by member states.",
      "Trains, trucks, and planes link it to Moscow across other countries, so transit papers and Baltic shipping schedules matter more here than in most Russian cities.",
      "Brussels and Moscow built a special transit paper for the land route. The Facilitated Transit Document covers road and rail crossings of Lithuania on the way to and from the region.",
    ],
    historicalContext: [
      "The Soviet collapse left the region cut off from Moscow by newly independent Lithuania. EU enlargement in 2004 then surrounded it with member states, and the transit scheme followed.",
    ],
    whyItMatters: [
      "Every land journey to Moscow needs Lithuanian transit papers. A local border permit scheme ran from 2012 until Poland suspended it in July 2016, and Russia then suspended its side too.",
    ],
    fieldNote:
      "The whole oblast once counted as a border area for local permits. That arrangement ended in 2016.",
    sources: [
      {
        title: "Kaliningrad transit resolution",
        publisher: "European Parliament",
        url: "https://www.europarl.europa.eu/doceo/document/TA-5-2002-0240_EN.html",
        sourceType: "official",
        supports: ["Russian region separated from mainland", "transit resolution"],
      },
      {
        title: "Kaliningrad: Commission proposes set of measures to ease transit",
        publisher: "European Commission",
        url: "https://ec.europa.eu/commission/presscorner/detail/bg/ip_02_1331",
        sourceType: "official",
        supports: ["transit package after enlargement", "Facilitated Transit Document for road and rail", "non-stop train feasibility talks"],
      },
      {
        title: "Report on Kaliningrad local border traffic",
        publisher: "European Commission",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML?uri=CELEX%3A52014DC0074",
        sourceType: "official",
        supports: ["almost one million inhabitants", "only enclave within the EU after 2004", "whole oblast once a border area", "crossings recovered under permits before 2016"],
      },
      {
        title: "Local border traffic at external land borders",
        publisher: "EUR-Lex",
        url: "https://eur-lex.europa.eu/EN/legal-content/summary/local-border-traffic-at-external-land-borders.html",
        sourceType: "official",
        supports: ["Poland Russia LBT agreement suspended since 4 July 2016"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "hans-island",
    slug: "hans-island",
    number: 13,
    title: "Tartupaluk or Hans Island",
    subtitle: "The island that ended a long-running border dispute",
    category: "history-shaped-borders",
    tags: ["treaty history", "map changes"],
    countries: ["Canada", "Denmark"],
    coordinates: [-66.45, 80.83],
    locationPrecision: "point-of-interest",
    mapZoom: 6,
    teaser: "Canada and Denmark once left whisky on a disputed rock.",
    leadFact:
      "In 2022, Canada, Denmark, and Greenland reached an agreement that settled the sovereignty dispute and established a land boundary across the small island.",
    explanation: [
      "Tartupaluk is a barren knoll of about 1.2 square kilometres in the Kennedy Channel between Ellesmere Island and Greenland. No one lives there and almost nothing grows. Inuit from both sides have long travelled and hunted around it.",
      "For decades both sides claimed the rock while leaving bottles and flags behind. Visiting officials left whisky and schnapps for the other side to find. The press called it the Whisky War.",
      "The settlement splits the island along a natural ridge, with roughly six tenths going to Denmark and the rest to Canada. It creates a land border between Canada and the Kingdom of Denmark and settles the surrounding sea lines as well.",
    ],
    historicalContext: [
      "The gap dated to boundary talks in the 1970s that drew a sea line but left the island itself undecided. Inuit of Nunavut and Greenland took part in the later negotiations. The agreement protects their access to the whole island.",
    ],
    whyItMatters: [
      "The deal turned a long-running dispute into a surveyed line. Two allies settled sovereignty through talks while keeping local access open.",
    ],
    timeline: [
      {
        dateLabel: "1973",
        title: "Sea line without the island",
        description: "Talks drew a continental shelf line through the channel but left the island undecided.",
      },
      {
        dateLabel: "2012",
        title: "Tentative sea agreement",
        description: "Ministers announce a tentative deal on the Lincoln Sea boundary while the island itself stays undecided.",
      },
      {
        dateLabel: "2022",
        title: "Land boundary agreed",
        description: "Canada, Denmark, and Greenland settled sovereignty and split the island with a land boundary.",
      },
    ],
    sources: [
      {
        title: "Boundary dispute settlement announcement",
        publisher: "Global Affairs Canada",
        url: "https://www.canada.ca/en/global-affairs/news/2022/06/boundary-dispute.html",
        sourceType: "primary",
        supports: ["2022 agreement", "land boundary across the island", "1.2 sq km uninhabited", "Inuit access to the whole island"],
      },
      {
        title: "The Hans Island Peace Agreement between Canada, Denmark, and Greenland",
        publisher: "Library of Congress",
        url: "https://blogs.loc.gov/law/2022/06/the-hans-island-peace-agreement-between-canada-denmark-and-greenland",
        sourceType: "institutional",
        supports: ["1973 treaty left the island undecided", "bottle exchange ritual", "2022 split along natural ridge", "first Canada and Denmark land border"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "diomede",
    slug: "diomede",
    number: 14,
    title: "Big and Little Diomede Islands",
    subtitle: "Two islands four kilometres apart on different calendar days",
    category: "time-date",
    tags: ["international date line"],
    countries: ["Russia", "United States"],
    coordinates: [-168.95, 65.76],
    locationPrecision: "approximate-area",
    mapZoom: 8,
    teaser: "Yesterday and today sit within sight of each other.",
    leadFact:
      "The Russian and U.S. islands lie roughly 4 kilometres apart, with the international boundary and International Date Line between them.",
    explanation: [
      "The Bering Strait narrows to about 53 miles where Russia and Alaska face each other. The two Diomede islands sit in the middle and split the passage into a western Russian channel and an eastern American one.",
      "Big Diomede belongs to Russia and Little Diomede belongs to the United States. On a clear day, residents of Little Diomede can see Soviet era buildings across water that is also a calendar gap.",
      "The date line bends around both islands to keep each with its mainland calendar. Time zones add more offset on top, so clocks differ far more than the short boat ride suggests.",
      "Pacific water pushes north through the strait carrying nutrients to the Arctic. The flow melts ice and feeds the ecosystems of the Chukchi Sea. Moorings anchored to the floor have tracked the flow since 1990 and show it growing stronger.",
    ],
    historicalContext: [
      "Thousands of years ago much of this seafloor stood dry as a land bridge between Asia and North America. Rising seas drowned it and left the two islands facing each other across the new strait.",
    ],
    whyItMatters: [
      "Two calendar days face each other across four kilometres of water. The gap shows how the date line follows politics rather than the sun.",
    ],
    fieldNote:
      "Strong currents scour the strait floor clean of fine sediment.",
    sources: [
      {
        title: "Diomede Islands photojournal",
        publisher: "NASA",
        url: "https://science.nasa.gov/photojournal/diomede-islands-bering-straight/",
        sourceType: "institutional",
        supports: ["two islands split by boundary"],
      },
      {
        title: "Strait connecting Pacific and Arctic oceans",
        publisher: "NOAA",
        url: "https://www.fisheries.noaa.gov/feature-story/strait-connecting-pacific-and-arctic-oceans-larger-previously-measured",
        sourceType: "institutional",
        supports: ["roughly 4 kilometres apart", "international border between islands", "strait 53 miles at closest", "western and eastern channels", "nutrient flow to the Arctic", "ancient land bridge", "moorings tracking flow since 1990", "currents scour the seafloor"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
    featured: true,
  },
  {
    id: "india-bangladesh",
    slug: "india-bangladesh",
    number: 15,
    title: "India and Bangladesh enclave exchange",
    subtitle: "The night 162 enclaves changed countries",
    category: "history-shaped-borders",
    tags: ["former enclave", "counter-enclave", "map changes", "treaty history"],
    countries: ["India", "Bangladesh"],
    coordinates: [89.45, 26.33],
    locationPrecision: "historical-area",
    mapZoom: 8,
    teaser: "Dozens of islands of land swapped countries at midnight.",
    leadFact:
      "On 31 July 2015, 111 Indian enclaves in Bangladesh and 51 Bangladeshi enclaves in India were exchanged under the land boundary agreement.",
    explanation: [
      "For decades, residents of these pockets lived inside another country with weak access to schools, clinics, and courts. Some enclaves even held counter-enclaves of the other side.",
      "Seventy-five joint teams toured the enclaves in July 2015 to record each resident's options concerning citizenship and relocation. Thirty observers from both governments watched the survey. Officials in India and Bangladesh then verified the results together.",
      "From midnight on 31 July 2015 the enclaves changed hands. The exchange ended decades of territorial limbo for many residents, and most chose to remain where they already lived with new nationality papers. India later funded new infrastructure and housing for returnees in West Bengal.",
      "Old enclave names remain as place history rather than legal puzzles.",
    ],
    historicalContext: [
      "The pockets dated to princely state bargains before partition. The 1974 boundary agreement named the fix, but the full swap waited until both parliaments cleared the way in 2015.",
      "A 2011 protocol set the terms and ratification papers were exchanged during the 2015 prime ministerial visit to Dhaka. The midnight transfer followed weeks later.",
    ],
    whyItMatters: [
      "Most residents stayed where they lived with new nationality papers while a smaller group moved before the November deadline. The exchange ended decades of territorial limbo for people who had lived for generations with weak access to documents and services. New infrastructure followed in the former enclaves.",
    ],
    timeline: [
      {
        dateLabel: "1974",
        title: "Land boundary agreement signed",
        description: "India and Bangladesh agreed in principle to swap the enclaves.",
      },
      {
        dateLabel: "31 July 2015",
        title: "Midnight exchange",
        description: "111 Indian enclaves and 51 Bangladeshi enclaves changed hands and residents received options concerning citizenship.",
      },
    ],
    sources: [
      {
        title: "India Bangladesh Land Boundary Agreement",
        publisher: "Government of India Press Information Bureau",
        url: "https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=159233",
        sourceType: "primary",
        supports: ["exchange under the 1974 agreement", "rehabilitation package for returnees", "infrastructure in former enclaves"],
      },
      {
        title: "Exchange of enclaves between India and Bangladesh",
        publisher: "Ministry of External Affairs, Government of India",
        url: "https://www.mea.gov.in/press-releases.htm?dtl%2F25565%2FExchange%2Bof%2Benclaves%2Bbetween%2BIndia%2Band%2BBangladesh",
        sourceType: "primary",
        supports: ["midnight 31 July 2015 transfer", "111 and 51 enclaves", "75 survey teams and 30 observers", "nationality choice and civic services"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "nepal-time",
    slug: "nepal-time",
    number: 16,
    title: "Nepal Standard Time",
    subtitle: "The country on a 45 minute offset",
    category: "time-date",
    tags: ["unusual time offset"],
    countries: ["Nepal"],
    coordinates: [85.32, 27.7],
    locationPrecision: "approximate-area",
    mapZoom: 6,
    teaser: "When it is noon in London, it is quarter to six in Kathmandu.",
    leadFact:
      "Nepal uses UTC plus 5 hours 45 minutes, a 45 minute offset. Its clock is 15 minutes ahead of the Indian standard offset.",
    explanation: [
      "Most time zones sit on whole or half hours. Nepal keeps a quarter hour step that matches its solar position more closely than a rounded zone would.",
      "The 15 minute gap with India matters for timetables and broadcasts. A train time or TV slot copied across the border needs a small but constant correction. Flight boards at Kathmandu show departures 15 minutes off the Indian clocks many travellers carry.",
      "Nepal followed Indian time for decades. On the first day of 1986 clocks moved forward 15 minutes to the present offset.",
      "The change moved the country from Indian time to Nepal time. Daylight saving has never applied, so the figure holds all year.",
    ],
    historicalContext: [
      "Nepal kept local solar time until 1920, then adopted Indian time for decades before choosing its own offset in 1986. The shift gave the whole country a single figure tied to Kathmandu.",
    ],
    timeline: [
      {
        dateLabel: "1920",
        title: "Adopting Indian time",
        description: "Nepal drops local solar time for the Indian offset used across the border.",
      },
      {
        dateLabel: "1986",
        title: "Moving to the present figure",
        description: "Clocks jump forward 15 minutes to five hours and 45 minutes ahead of UTC.",
      },
    ],
    whyItMatters: [
      "The gap is small enough to miss and constant enough to matter. Schedules, broadcasts and flight times between Nepal and India carry a permanent 15 minute correction. The offset also marks independence in timekeeping from a much larger neighbour.",
    ],
    sources: [
      {
        title: "Daylight Saving Time 1986 in Nepal",
        publisher: "timeanddate.com",
        url: "https://www.timeanddate.com/time/change/nepal?year=1986",
        sourceType: "reference",
        supports: ["1 January 1986 forward 15 minutes", "IST to NPT change", "UTC+5:45", "15 minutes ahead of India", "no daylight saving"],
      },
      {
        title: "Where Time Is Always 15 Minutes Apart From Everywhere Else",
        publisher: "The New York Times",
        url: "https://www.nytimes.com/2026/05/27/world/asia/nepal-time-15-minutes.html",
        sourceType: "reference",
        supports: ["officially designated in 1986", "15 minutes ahead of India", "statement of national distinctiveness"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "chatham-time",
    slug: "chatham-time",
    number: 17,
    title: "Chatham Islands",
    subtitle: "New Zealand islands 45 minutes ahead of the mainland",
    category: "time-date",
    tags: ["unusual time offset"],
    countries: ["New Zealand"],
    coordinates: [176.55, -43.95],
    locationPrecision: "approximate-area",
    mapZoom: 6,
    teaser: "An island clock the mainland never shares.",
    leadFact:
      "Chatham Islands standard time is 45 minutes ahead of New Zealand standard time.",
    explanation: [
      "The islands lie about 860 kilometres east of Christchurch and hold New Zealand's easternmost territory. Around 600 people live there, most on the main island and a few dozen on Pitt Island.",
      "The Chathams sit east of the South Island with their own official offset. When mainland clocks read noon in winter, Chatham clocks read quarter to one.",
      "Daylight saving shifts both zones, so the 45 minute gap holds through the year.",
      "Kahuitara Point on Pitt Island is the first permanently inhabited place to see the sun rise on New Year Day, and every timetable carries the 45 minute correction.",
      "The original inhabitants, the Moriori, named the islands Rekohu. Descendants of Moriori, Māori and European settlers share the islands today.",
    ],
    historicalContext: [
      "Moriori voyagers arrived around 1400 and built their own culture in isolation. An English ship blown off course reached the main island in 1791. Sealers and whalers followed, then Māori groups seeking a new home.",
    ],
    whyItMatters: [
      "The offset puts the islands ahead of the mainland in every schedule. Fewer than a thousand residents keep island time while answering to Wellington.",
    ],
    fieldNote:
      "Rekohu means misty skies in Moriori.",
    sources: [
      {
        title: "Daylight saving legislation",
        publisher: "New Zealand Government",
        url: "https://www.govt.nz/browse/recreation-and-the-environment/daylight-saving/governing-legislation/",
        sourceType: "official",
        supports: ["45 minutes ahead of NZ standard time", "shared daylight saving dates"],
      },
      {
        title: "Chatham Islands",
        publisher: "Te Ara, the Encyclopedia of New Zealand",
        url: "https://teara.govt.nz/en/chatham-islands",
        sourceType: "official",
        supports: ["Moriori arrival around 1400", "European arrival 1791", "Māori arrival 1835", "islands east of New Zealand"],
      },
      {
        title: "Our Islands",
        publisher: "Tourism Chatham Islands",
        url: "https://chathamislands.co.nz/our-islands",
        sourceType: "official",
        supports: ["860 km east of Christchurch", "about 600 residents", "45 minutes ahead with shared daylight saving dates", "Moriori as original inhabitants"],
      },
      {
        title: "First Sunrise of the New Year",
        publisher: "U.S. Naval Observatory",
        url: "https://aa.usno.navy.mil/faq/first_sunrise.html",
        sourceType: "institutional",
        supports: ["Kahuitara Point Pitt Island first inhabited sunrise on January 1"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "lord-howe-time",
    slug: "lord-howe-time",
    number: 18,
    title: "Lord Howe Island",
    subtitle: "The island with a 30 minute daylight saving jump",
    category: "time-date",
    tags: ["unusual time offset"],
    countries: ["Australia"],
    coordinates: [159.08, -31.55],
    locationPrecision: "point-of-interest",
    mapZoom: 8,
    teaser: "Half the usual spring forward.",
    leadFact:
      "Lord Howe Island advances clocks by 30 minutes for daylight saving rather than the more familiar one hour shift used in several other Australian jurisdictions.",
    explanation: [
      "The island lies in the Tasman Sea between Australia and New Zealand and holds a small year round community. Unlike mainland New South Wales, it advances its clocks by 30 minutes for daylight saving.",
      "Since 1989 the island has moved clocks 30 minutes for daylight saving by special order. Mainland New South Wales moves a full hour on the same dates.",
      "Visitors from Sydney gain only half an hour in summer instead of the full hour they might expect. Phones usually handle it, but wall clocks need a manual nudge.",
      "Summer time starts on the first Sunday in October and ends on the first Sunday in April, matching the mainland calendar. State law sets the island apart from every other district in New South Wales.",
    ],
    historicalContext: [
      "Daylight saving on the island has followed the 30 minute order since 1989. Ministers set the island shift by a separate order under state law while the mainland follows the standard dates and the full hour.",
    ],
    whyItMatters: [
      "Timetables and booking systems must carry a special case for one small island. Travellers who assume Sydney time will find island clocks half an hour off in summer.",
    ],
    fieldNote:
      "Island clocks disagree with Sydney for half the year by exactly half an hour.",
    sources: [
      {
        title: "Daylight saving",
        publisher: "New South Wales Government",
        url: "https://dcj.nsw.gov.au/about-us/daylight-saving.html",
        sourceType: "official",
        supports: ["island exception with 30 minute moves", "first Sunday in October to first Sunday in April"],
      },
      {
        title: "NSW Legislative Assembly Hansard",
        publisher: "Parliament of New South Wales",
        url: "https://www.parliament.nsw.gov.au/bill/files/1132/A7105.pdf",
        sourceType: "primary",
        supports: ["30 minute daylight saving fixed by order since 1989"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "china-time",
    slug: "china-time",
    number: 19,
    title: "China Standard Time",
    subtitle: "One clock across a continent sized country",
    category: "time-date",
    tags: ["unusual time offset"],
    countries: ["China"],
    coordinates: [75.99, 39.47],
    locationPrecision: "approximate-area",
    mapZoom: 5,
    teaser: "Sunrise in Beijing, still dark in Kashgar, same official time.",
    leadFact:
      "China uses one official time zone across a large east to west span. In western areas, solar noon can occur well after 12 on the clock.",
    explanation: [
      "The single zone keeps railways, broadcasts, and offices on one rhythm from the Pacific coast to Central Asia. It trades solar accuracy for administrative simplicity.",
      "Daily life adapts by the sun rather than the dial in the far west. Schools and markets may start later by the clock while following daylight as usual. In Urumqi in winter the stars can still be out at seven in the morning by the official clock.",
      "The span covers more than sixty degrees of longitude and five ideal zones. Clocks everywhere show Beijing time, eight hours ahead of UTC.",
      "In Kashgar solar noon can fall near three in the afternoon. In the east it comes before twelve. Some people and institutions in Xinjiang use an unofficial local time, often called Xinjiang Time, about two hours behind Beijing Time.",
    ],
    historicalContext: [
      "China used five zones from 1912 until 1949, each named for its region. The new government then placed the whole country on Beijing time and the single zone has held ever since.",
    ],
    whyItMatters: [
      "One clock simplifies railways and national broadcasts across a continent-sized state. Western residents live with dark mornings and late sunsets by the clock.",
    ],
    fieldNote:
      "Hong Kong and Macau keep the same offset as the mainland.",
    sources: [
      {
        title: "One time zone in China",
        publisher: "timeanddate.com",
        url: "https://www.timeanddate.com/time/china/one-time-zone.html",
        sourceType: "reference",
        supports: ["one official time zone", "late solar noon in the west", "five zones before 1949", "unofficial Xinjiang time two hours behind"],
      },
      {
        title: "Does China have multiple time zones like the United States?",
        publisher: "China Daily",
        url: "https://govt.chinadaily.com.cn/s/202508/13/WS689c3056498edec913ce09c6/does-china-have-multiple-time-zones-like-the-united-states.html",
        sourceType: "reference",
        supports: ["single official time zone", "spans five geographical zones", "UTC+8 across the country", "official schedules follow Beijing Time"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "france-time-zones",
    slug: "france-time-zones",
    number: 20,
    title: "France and its overseas territories",
    subtitle: "Twelve time zones under one flag",
    category: "time-date",
    tags: ["unusual time offset"],
    countries: ["France"],
    coordinates: [2.35, 48.86],
    locationPrecision: "point-of-interest",
    mapZoom: 3,
    teaser: "One flag flies in twelve different hours at once.",
    leadFact:
      "Overseas territories give the French Republic 12 standard time zones under the common count. This counts land far beyond mainland France, and summer shifts can briefly add a thirteenth local offset.",
    explanation: [
      "Departments and communities from the Caribbean to the Pacific keep their local solar time. Paris shares a flag with places where the date and hour differ wildly.",
      "The count rests on present arrangements rather than mainland geography. It shows how empire era ties still shape a modern clock map.",
      "Mainland France keeps Central European Time with summer shifts like its neighbours. The other eleven zones stretch from Tahiti at ten hours behind UTC to Wallis and Futuna at twelve hours ahead.",
      "Russia and the United States follow with eleven zones each. France stays ahead by one because its territories scatter across every ocean.",
      "Saint Pierre and Miquelon near Canada shifts its clocks in summer, which briefly adds a thirteenth local time to the French count.",
    ],
    historicalContext: [
      "The zones come from former colonies that stayed French as overseas departments and collectivities. Each keeps the offset that fits its local sun. Metropolitan France spans a single zone while eleven further offsets sit overseas.",
    ],
    whyItMatters: [
      "The record belongs to history rather than size. Russia covers far more land with fewer zones because its territory runs in one block. France is commonly credited with the most standard time zones when overseas territories are counted.",
    ],
    fieldNote:
      "When it is noon in Paris, the working day in Wallis and Futuna ended hours ago.",
    sources: [
      {
        title: "Country with the most time zones",
        publisher: "timeanddate.com",
        url: "https://www.timeanddate.com/time/country-with-the-most-time-zones.html",
        sourceType: "reference",
        supports: ["12 standard time zones including overseas territories", "mainland keeps Central European Time", "offsets from UTC-10 to UTC+12"],
      },
      {
        title: "Country with the most time zones",
        publisher: "Guinness World Records",
        url: "https://www.guinnessworldrecords.com/world-records/584626-country-with-the-most-time-zones",
        sourceType: "reference",
        supports: ["12 time zones with overseas territories", "most of any country", "USA and Russia have 11 each"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "vennbahn",
    slug: "vennbahn",
    number: 21,
    title: "Vennbahn",
    subtitle: "A railway line that created German exclaves inside Belgium",
    category: "enclaves-exclaves",
    tags: ["railway border", "enclaves", "treaty history"],
    countries: ["Belgium", "Germany"],
    coordinates: [6.2, 50.6],
    locationPrecision: "approximate-area",
    mapZoom: 10,
    teaser: "A railway line became Belgian territory and left pieces of Germany on the other side.",
    leadFact:
      "After the Vennbahn railway was transferred to Belgium after World War I, parts of the railway corridor became Belgian territory and created several German exclaves along the route.",
    explanation: [
      "The Vennbahn was a railway connecting Aachen with Troisvierges in Luxembourg. After the territorial changes following World War I, the railway line became Belgian territory even where it passed through areas otherwise surrounded by Germany.",
      "In several places, this narrow Belgian corridor separated pieces of German territory from the rest of Germany. The result was a series of small German exclaves along one railway line.",
      "Five small pieces of German ground still lie east of the line, cut off by the Belgian corridor. Residents cross the old boundary without noticing while maps still show the kinks the railway left behind.",
      "The former railway route is now largely a cycle path, but the unusual border it helped create can still be seen on maps and in the landscape.",
    ],
    historicalContext: [
      "The railway became Belgian territory as part of the post-World War I territorial settlement. The peace settlement gave the railway to Belgium, and the corridor became Belgian ground even where it ran through German villages. The unusual arrangement survived later border changes and left several German exclaves along the former railway route.",
    ],
    whyItMatters: [
      "The Vennbahn shows how infrastructure can become part of an international boundary and reshape the geography around it. Cyclists cross the old boundary without noticing while maps still show the kinks the railway left behind.",
    ],
    fieldNote:
      "The former railway is now a 125 kilometre cycle route crossing the Belgian-German border region.",
    sources: [
      {
        title: "The story behind the Vennbahn",
        publisher: "Vennbahn",
        url: "https://www.vennbahn.eu/en/about-the-project/",
        sourceType: "official",
        supports: ["historic railway", "Belgian territory", "border history", "Aachen Troisvierges line", "125 kilometre cycle route"],
      },
      {
        title: "Vennbahn Stories: Roetgen",
        publisher: "Vennbahn",
        url: "https://www.vennbahn.eu/wp-content/uploads/2019/09/Vennbahn-Stories_4_Roetgen_EN.pdf",
        sourceType: "official",
        supports: ["five German exclaves", "border changes along the railway"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "saint-martin-sint-maarten",
    slug: "saint-martin-sint-maarten",
    number: 22,
    title: "Saint-Martin and Sint Maarten",
    subtitle: "One Caribbean island shared by France and the Kingdom of the Netherlands",
    category: "border-puzzles",
    tags: ["island border", "open border", "treaty history"],
    countries: ["France", "Kingdom of the Netherlands"],
    coordinates: [-63.05, 18.07],
    locationPrecision: "approximate-area",
    mapZoom: 11,
    teaser: "One island, two countries, and a border that is unusually open.",
    leadFact:
      "The island of Saint Martin is divided between French Saint-Martin and Dutch Sint Maarten, with the two sides sharing an international land border.",
    explanation: [
      "The northern part of the island is the French overseas collectivity of Saint-Martin. The southern part is Sint Maarten, a constituent country within the Kingdom of the Netherlands.",
      "The border dates back to the 1648 Treaty of Concordia. For centuries, the boundary has existed without the kind of hard division normally associated with an international border.",
      "France and the Kingdom of the Netherlands signed a new border treaty in 2023 that clarified the boundary. Movement of people and goods stays free under principles reaching back to the 1648 agreements, so daily life continues across an open boundary.",
    ],
    historicalContext: [
      "The division of the island was established through the 1648 agreements between France and the Netherlands. The 2023 treaty renewed the deal three and a half centuries later. The unusual arrangement has survived despite the island becoming a major tourist destination.",
    ],
    whyItMatters: [
      "Saint-Martin and Sint Maarten show how an international border can divide one small island while remaining closely integrated in everyday life. The island shows that a precise boundary and an open way of life can exist together.",
    ],
    timeline: [
      {
        dateLabel: "1648",
        title: "Treaty of Concordia",
        description: "French and Dutch settlers divide the island and agree on free movement between the two sides.",
      },
      {
        dateLabel: "2023",
        title: "New border treaty",
        description: "France and the Netherlands clarify the boundary while preserving free movement of people and goods.",
      },
    ],
    sources: [
      {
        title: "Agreement between France and the Netherlands on the common border at Saint-Martin",
        publisher: "French Ministry of the Interior",
        url: "https://www.interieur.gouv.fr/actualites/communiques-de-presse/signature-dun-accord-entre-france-et-pays-bas-relatif-a-frontiere",
        sourceType: "official",
        language: "French",
        supports: ["2023 border treaty", "1648 free movement arrangements"],
      },
      {
        title: "Joint Declaration after the Fifth Quadripartite meeting",
        publisher: "Government of the Netherlands",
        url: "https://www.government.nl/documents/2023/06/15/joint-declaration-fifth-quadripartite-meeting-15-june-2023",
        sourceType: "official",
        supports: ["Saint-Martin and Sint Maarten border agreement"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "musandam",
    slug: "musandam",
    number: 23,
    title: "Musandam",
    subtitle: "An Omani governorate separated from Oman by the United Arab Emirates",
    category: "enclaves-exclaves",
    tags: ["exclave", "separated territory", "Strait of Hormuz"],
    countries: ["Oman", "United Arab Emirates"],
    coordinates: [56.3, 26.2],
    locationPrecision: "approximate-area",
    mapZoom: 8,
    teaser: "Part of Oman sits apart from the country's main territory at the Strait of Hormuz.",
    leadFact:
      "Musandam is an Omani governorate separated from the rest of Oman by a strip of United Arab Emirates territory.",
    explanation: [
      "Musandam occupies the northern tip of the Arabian Peninsula and overlooks the Strait of Hormuz.",
      "The governorate covers about 1,800 square kilometres with some 56,000 residents in the 2020 census, the smallest region in Oman by both measures. Khasab serves as its main town.",
      "Dramatic inlets cut the coast, which earns the peninsula the name Norway of Arabia. Bukha and Dibba join Khasab on the shore while Madha sits inland as its own enclave story.",
      "The governorate is separated from the rest of Oman by territory belonging to the United Arab Emirates. This makes it one of the most geographically distinctive parts of Oman.",
      "Its position also gives Musandam an important strategic role because the Strait of Hormuz connects the Persian Gulf with the Gulf of Oman. The strait ranks among the busiest shipping lanes in the world. Tankers bound for ports around the world pass through the strait.",
    ],
    whyItMatters: [
      "Musandam demonstrates how historical borders can leave a country with a separated region in one of the world's most strategically important waterways. Separation also means every land journey to Muscat passes through another country.",
    ],
    fieldNote:
      "Maps show Oman in two pieces with the Emirates between them.",
    sources: [
      {
        title: "Oman by region",
        publisher: "Oman Ministry of Foreign Affairs",
        url: "https://www.fm.gov.om/en/about-oman/state/oman-by-region/",
        sourceType: "official",
        supports: ["Musandam separated from Oman by UAE territory", "location", "area", "1,800 sq km and 56,279 residents", "smallest region", "main town Khasab", "Norway of Arabia fjords", "four wilayats including Madha", "busiest shipping lanes"],
      },
      {
        title: "Musandam Governorate",
        publisher: "Government of Oman",
        url: "https://gov.om/en/musandam-governorate",
        sourceType: "official",
        supports: ["Musandam Governorate administration"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "nakhchivan",
    slug: "nakhchivan",
    number: 24,
    title: "Nakhchivan",
    subtitle: "An autonomous Azerbaijani territory separated from the rest of Azerbaijan",
    category: "enclaves-exclaves",
    tags: ["exclave", "autonomous territory", "separated territory"],
    countries: ["Azerbaijan", "Armenia", "Iran", "Turkey"],
    coordinates: [45.41, 39.2],
    locationPrecision: "approximate-area",
    mapZoom: 7,
    teaser: "Azerbaijan has a territory separated from the rest of the country by Armenia.",
    leadFact:
      "The Nakhchivan Autonomous Republic is an autonomous territory of Azerbaijan separated from the country's main territory and bordered by Armenia, Iran, and Turkey.",
    explanation: [
      "Nakhchivan lies southwest of mainland Azerbaijan. Armenia lies between Nakhchivan and the rest of Azerbaijan.",
      "The republic spans about 5,500 square kilometres with some 469,000 residents in 2024 figures. Seven districts share the ground and the capital holds about 97,000.",
      "Armenia borders it for 246 kilometres to the north and east, Iran for 204 to the south and west, and Turkey for 11 along a short western section. The Araz river draws much of the southern line.",
      "Its position gives Azerbaijan a small territorial connection to Turkey while leaving Nakhchivan geographically separated from the rest of Azerbaijan.",
    ],
    historicalContext: [
      "Nakhchivan has had several different administrative statuses during the twentieth century and has been an autonomous republic within Azerbaijan since 1990. It carried the Soviet republic name from 1920, then autonomous region and autonomous Soviet republic titles, before taking its present name in 1990.",
    ],
    whyItMatters: [
      "Nakhchivan is a clear example of how a country's political territory can be divided into separated pieces while retaining a common sovereign state. The separated republic itself holds an 11 kilometre strip of border with Turkey, a short land link westward that the mainland lacks.",
    ],
    fieldNote:
      "The land runs 158 kilometres from northwest to southeast and only 75 from north to south.",
    sources: [
      {
        title: "Nakhchivan Autonomous Republic: Territorial and administrative units",
        publisher: "Presidential Library of Azerbaijan",
        url: "https://nakhchivan.preslib.az/en_a3-0.html",
        sourceType: "official",
        supports: ["autonomous status", "borders with Armenia, Iran and Turkey", "246 km Armenia 11 km Turkey 204 km Iran", "Araz river line", "5,500 sq km and 468,600 residents", "seven districts and five towns", "capital 97,200", "status names 1920 to 1990", "158 km by 75 km extent"],
      },
      {
        title: "Nakhchivan",
        publisher: "Azerbaijan Travel",
        url: "https://nakhchivan.azerbaijan.travel/trip-to-nakhchivan",
        sourceType: "official",
        supports: ["Nakhchivan as an autonomous Azerbaijani republic"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "ceuta",
    slug: "ceuta",
    number: 25,
    title: "Ceuta",
    subtitle: "A Spanish autonomous city on the North African coast",
    category: "access-oddities",
    tags: ["North Africa", "border controls", "Spanish territory"],
    countries: ["Spain", "Morocco"],
    coordinates: [-5.35, 35.88],
    locationPrecision: "point-of-interest",
    mapZoom: 11,
    teaser: "A Spanish city sits on the African mainland, bordered by Morocco.",
    leadFact:
      "Ceuta is a Spanish autonomous city on the North African coast with a land border with Morocco.",
    explanation: [
      "Ceuta sits on the northern coast of Africa across from mainland Spain. Its land border with Morocco runs through the El Tarajal crossing.",
      "Because Spain belongs to the Schengen Area, the city has a specific border-control arrangement, with controls at the Moroccan border and further Schengen checks for sea and air travel to mainland Spain.",
      "Spain applies two filters. Guards check the land border with Morocco first, then police check travellers again at the port and airport before any sailing to the mainland.",
      "The setup dates to Spain joining Schengen in 1991 with controls in force from 1995. A declaration on the two cities sits annexed to the accession papers and survives in article 41 of the border code.",
      "The sea and the sky are the only routes onward to mainland Spain, so the port and the airport carry every exit check.",
    ],
    historicalContext: [
      "Both cities entered the Schengen setup with Spain in the 1990s and kept a special regime. The double filter was designed so that an entry at the Moroccan fence could never become an entry into the rest of Schengen. Morocco claims both cities while Spain treats them as integral parts of its territory.",
    ],
    whyItMatters: [
      "Ceuta shows how geography and sovereignty can place a European city on the African mainland. An irregular entry into the city gives no right to stay in Spain or travel onward.",
    ],
    fieldNote:
      "Nobody sails to the mainland without showing papers to the national police.",
    sources: [
      {
        title: "Ceuta, Melilla and the integrity of the Schengen Area",
        publisher: "Spanish Ministry of Foreign Affairs",
        url: "https://www.exteriores.gob.es/es/Comunicacion/Exteriores-Explica/Paginas/2026_Articulos/Ceuta%2C-Melilla.aspx?hl=es-ES",
        sourceType: "official",
        language: "Spanish",
        supports: ["Spanish autonomous city of Ceuta", "Schengen border arrangement", "exit control by sea and air", "double filter Morocco plus exit", "Spain joined Schengen 1991 in force 1995", "declaration annexed to accession", "article 41 border code"],
      },
      {
        title: "Ceuta: Migrant crossings and European reaction",
        publisher: "House of Commons Library",
        url: "https://commonslibrary.parliament.uk/research-briefings/cbp-10987",
        sourceType: "reference",
        supports: ["Morocco claims since 1956", "autonomous cities since 1995 with elected assemblies", "part of EU but outside customs and Schengen", "police ID checks to mainland"],
      },
      {
        title: "Ceuta and Melilla border crossings with Morocco",
        publisher: "Spanish Ministry of the Interior",
        url: "https://www.interior.gob.es/opencms/es/detalle/articulo/El-Gobierno-reabrira-las-fronteras-terrestres-con-Marruecos-el-proximo-17-de-mayo/",
        sourceType: "official",
        language: "Spanish",
        supports: ["land border crossing with Morocco at El Tarajal"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "melilla",
    slug: "melilla",
    number: 26,
    title: "Melilla",
    subtitle: "A Spanish autonomous city on the North African coast",
    category: "access-oddities",
    tags: ["North Africa", "border controls", "Spanish territory"],
    countries: ["Spain", "Morocco"],
    coordinates: [-2.93, 35.29],
    locationPrecision: "point-of-interest",
    mapZoom: 11,
    teaser: "A Spanish city sits on the African mainland, bordered by Morocco.",
    leadFact:
      "Melilla is a Spanish autonomous city on the North African coast with a land border with Morocco.",
    explanation: [
      "Melilla sits on the northern coast of Africa east of Ceuta. Its land border with Morocco runs through the Beni Enzar crossing.",
      "Because Spain belongs to the Schengen Area, the city has a specific border-control arrangement, with controls at the Moroccan border and further Schengen checks for sea and air travel to mainland Spain.",
      "Spain applies two filters. Guards check the land border with Morocco first, then police check travellers again at the port and airport before any sailing to the mainland.",
      "The setup dates to Spain joining Schengen in 1991 with controls in force from 1995. A declaration on the two cities sits annexed to the accession papers and survives in article 41 of the border code.",
      "The sea and the sky are the only routes onward to mainland Spain, so the port and the airport carry every exit check.",
    ],
    historicalContext: [
      "Both cities entered the Schengen setup with Spain in the 1990s and kept a special regime. The double filter was designed so that an entry at the Moroccan fence could never become an entry into the rest of Schengen. Morocco claims both cities while Spain treats them as integral parts of its territory.",
    ],
    whyItMatters: [
      "Melilla shows how geography and sovereignty can place a European city on the African mainland. An irregular entry into the city gives no right to stay in Spain or travel onward.",
    ],
    fieldNote:
      "Nobody sails to the mainland without showing papers to the national police.",
    sources: [
      {
        title: "Ceuta, Melilla and the integrity of the Schengen Area",
        publisher: "Spanish Ministry of Foreign Affairs",
        url: "https://www.exteriores.gob.es/es/Comunicacion/Exteriores-Explica/Paginas/2026_Articulos/Ceuta%2C-Melilla.aspx?hl=es-ES",
        sourceType: "official",
        language: "Spanish",
        supports: ["Spanish autonomous city of Melilla", "Schengen border arrangement", "exit control by sea and air", "double filter Morocco plus exit", "Spain joined Schengen 1991 in force 1995", "declaration annexed to accession", "article 41 border code"],
      },
      {
        title: "Ceuta: Migrant crossings and European reaction",
        publisher: "House of Commons Library",
        url: "https://commonslibrary.parliament.uk/research-briefings/cbp-10987",
        sourceType: "reference",
        supports: ["Morocco claims since 1956", "autonomous cities since 1995 with elected assemblies", "part of EU but outside customs and Schengen", "police ID checks to mainland"],
      },
      {
        title: "Ceuta and Melilla border crossings with Morocco",
        publisher: "Spanish Ministry of the Interior",
        url: "https://www.interior.gob.es/opencms/es/detalle/articulo/El-Gobierno-reabrira-las-fronteras-terrestres-con-Marruecos-el-proximo-17-de-mayo/",
        sourceType: "official",
        language: "Spanish",
        supports: ["land border crossing with Morocco at Beni Enzar"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "darien-gap",
    slug: "darien-gap",
    number: 27,
    title: "Darién Gap",
    subtitle: "The roadless break in the Pan-American Highway",
    category: "access-oddities",
    tags: ["roadless region", "Pan-American Highway", "natural barrier"],
    countries: ["Panama", "Colombia"],
    coordinates: [-77.4, 7.8],
    locationPrecision: "approximate-area",
    mapZoom: 7,
    teaser: "The Pan-American Highway stops before reaching Colombia.",
    leadFact:
      "There is still no road connecting Panama and Colombia through the Darién Gap, leaving a roadless break in the Pan-American Highway.",
    explanation: [
      "The Darién Gap is a difficult-to-access region spanning the border area between Panama and Colombia. Although the Pan-American Highway links most of North, Central, and South America, it has never been completed through this section. The absence of a road is closely connected to the region's difficult terrain, environmental concerns, and the challenges of building major infrastructure through protected areas.",
      "The park covers about 575,000 hectares, the largest protected area in Panama and among the largest in Central America. It runs from Pacific beaches and mangroves up to Cerro Tacarcuna at 1,875 metres. Rivers such as the Tuira and the Balsas form major routes through much of the roadless interior.",
      "Jaguars, tapirs and harpy eagles live in forests that hold 169 mammals and more than 530 bird species. Embera, Wounaan and Kuna peoples live inside the park alongside Afro-descendant communities. Protection dates to 1972 with the park decree following in 1980 and world heritage status in 1981.",
    ],
    historicalContext: [
      "The park borders Los Katios across the Colombian line, forming one shared ecosystem in two countries. Managers on both sides coordinate patrols and research.",
    ],
    whyItMatters: [
      "The Darién Gap is a reminder that a map can show two connected continents without there being a continuous road between them. UNESCO warns that finishing the highway would change the area fundamentally. The roadless gap has also acted as a barrier to the spread of livestock diseases, so completing a highway would raise animal-health as well as environmental concerns.",
    ],
    fieldNote:
      "Jaguars still roam forests large enough to hold them.",
    timeline: [
      {
        dateLabel: "1972",
        title: "Protection forest declared",
        description: "Panama places the Alto Darien forests under formal protection.",
      },
      {
        dateLabel: "1980",
        title: "National park decreed",
        description: "The protection forest becomes Darien National Park by presidential decree.",
      },
      {
        dateLabel: "1981",
        title: "World heritage status",
        description: "UNESCO lists the park for its forests, wildlife and living cultures.",
      },
    ],
    sources: [
      {
        title: "Darién National Park",
        publisher: "UNESCO World Heritage Centre",
        url: "https://whc.unesco.org/en/list/159",
        sourceType: "institutional",
        supports: ["Darién Gap", "Pan-American Highway uncompleted", "difficult access", "575,000 hectares largest in Panama", "Pacific coast to Cerro Tacarcuna 1,875 m", "Tuira and Balsas major routes", "jaguar tapir harpy eagle", "Embera Wounaan Kuna peoples", "protection 1972 1980 1981", "highway would change area fundamentally", "roadless gap as livestock disease barrier", "shared border with Los Katios"],
      },
      {
        title: "Reactive Monitoring Mission Los Katios National Park",
        publisher: "UNESCO World Heritage Centre",
        url: "https://whc.unesco.org/document/117027",
        sourceType: "institutional",
        supports: ["Darién border region", "no road infrastructure between Panama and Colombia"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "kazungula-quadripoint",
    slug: "kazungula-quadripoint",
    number: 28,
    title: "Four Countries Near Kazungula",
    subtitle: "Where four countries meet near the Zambezi River",
    category: "border-puzzles",
    tags: ["double tripoint", "river border", "four countries"],
    countries: ["Botswana", "Namibia", "Zambia", "Zimbabwe"],
    coordinates: [25.26, -17.79],
    locationPrecision: "approximate-area",
    mapZoom: 10,
    teaser: "Four countries meet in a tiny area around the Zambezi River.",
    leadFact:
      "Botswana, Namibia, Zambia, and Zimbabwe meet in the Kazungula area near the Zambezi River.",
    explanation: [
      "The Kazungula area sits at the meeting point of four southern African countries. Botswana, Namibia, Zambia and Zimbabwe converge in the Zambezi River.",
      "Technically the corner is a double tripoint, not one shared point. Namibia, Botswana and Zambia meet at a westerly point in the river, while Zambia, Zimbabwe and Botswana meet about 150 metres east. A short Zambia Botswana line joins the two.",
      "The geography is shaped by the Zambezi and Chobe rivers and by the very short distances between the national territories. The lines follow rivers rather than survey markers, so water draws each boundary.",
      "The Kazungula Bridge links Zambia and Botswana for trucks and travellers, cutting travel time and boosting trade. Ministers call the bridge a symbol of friendship between the two countries and a step toward an integrated southern Africa. A joint authority launched by both presidents runs the bridge.",
      "Zimbabwe and Namibia meet the same water without sharing the bridge. Their travellers cross by other routes. Travellers reach the corner through Kasane, which has its own airport.",
    ],
    whyItMatters: [
      "Kazungula is one of the clearest places to see how several international borders can converge within a very small geographic area. Zambia calls the bridge a step toward economic emancipation through trade with its neighbours.",
    ],
    fieldNote:
      "Botswana still calls it a single meeting point while NASA maps two.",
    sources: [
      {
        title: "About Our Country",
        publisher: "Government of Botswana",
        url: "https://gov.bw/about-our-country",
        sourceType: "official",
        supports: ["four countries meet in the Kazungula area", "Botswana description of a single meeting point", "rivers draw each boundary", "Kasane airport"],
      },
      {
        title: "Double Tripoint in Southern Africa",
        publisher: "NASA Earth Observatory",
        url: "https://science.nasa.gov/earth/earth-observatory/double-tripoint-in-southern-africa-85867/",
        sourceType: "institutional",
        supports: ["double tripoint about 150 metres apart", "westerly Namibia Botswana Zambia point", "easterly Zambia Zimbabwe Botswana point"],
      },
      {
        title: "Kazungula Bridge to enhance trade and regional integration",
        publisher: "Zambia Ministry of Infrastructure, Housing and Urban Development",
        url: "https://www.mihud.gov.zm/?p=6483",
        sourceType: "official",
        supports: ["four-country meeting area", "Kazungula Bridge", "minister quote on four countries meeting", "trade and travel time", "symbol of friendship", "joint bridge authority"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "lake-constance",
    slug: "lake-constance",
    number: 29,
    title: "Lake Constance",
    subtitle: "A European lake without a fully defined legal border",
    category: "border-puzzles",
    tags: ["lake border", "undefined boundary", "condominium"],
    countries: ["Germany", "Austria", "Switzerland"],
    coordinates: [9.35, 47.6],
    locationPrecision: "approximate-area",
    mapZoom: 9,
    teaser: "Three countries share the lake, but most of its legal border was never formally defined.",
    leadFact:
      "For the largest part of Lake Constance, Germany, Austria, and Switzerland have no legally defined international boundary within the lake.",
    explanation: [
      "Lake Constance lies between Germany, Austria, and Switzerland and forms part of a heavily interconnected border region.",
      "Switzerland counts 7,132 boundary stones on land, but water needs none. In lakes the line usually runs through the middle, as with Lake Geneva and France.",
      "Lake Constance breaks the rule. The three states never defined a legal boundary across most of the lake. According to Switzerland's Federal Office of Topography, surveyors use a technical line for maps instead.",
      "The lake counts as a condominium under the shared sovereignty of all three countries, according to Switzerland's federal mapping authority. Written agreements handle each border matter as it comes.",
      "The unusual situation means that a major European lake can be shared by three countries without a conventional legal border dividing most of its waters.",
    ],
    historicalContext: [
      "Switzerland marks land borders with thousands of numbered stones tied to old treaties. The lake never received the same treatment.",
    ],
    whyItMatters: [
      "Lake Constance is a rare example of modern states cooperating around a shared space without agreeing on a conventional legal boundary through most of it. Everyday cooperation fills the space where a boundary would sit.",
    ],
    fieldNote:
      "Lake Constance is an exception to the usual practice of defining lake borders.",
    sources: [
      {
        title: "Artificial and natural boundaries",
        publisher: "swisstopo",
        url: "https://www.swisstopo.admin.ch/en/artificial-and-natural-boundaries",
        sourceType: "official",
        supports: ["Lake Constance has no legally defined boundary", "technical boundary", "condominium per Swiss mapping authority", "written agreements", "7132 land markers", "lakes usually split through the middle", "Lake Geneva France middle line"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "neum-corridor",
    slug: "neum-corridor",
    number: 30,
    title: "Neum Corridor",
    subtitle: "A strip of Bosnia and Herzegovina that separates Dubrovnik from Croatia",
    category: "access-oddities",
    tags: ["corridor", "coastal border", "transport route"],
    countries: ["Bosnia and Herzegovina", "Croatia"],
    coordinates: [17.62, 42.92],
    locationPrecision: "approximate-area",
    mapZoom: 10,
    teaser: "A narrow piece of Bosnia and Herzegovina reaches the Adriatic and divides Croatia in two.",
    leadFact:
      "The Neum Corridor is a section of Bosnia and Herzegovina's territory that reaches the Adriatic coast and separates the Dubrovnik area from mainland Croatia.",
    explanation: [
      "The corridor gives Bosnia and Herzegovina a short stretch of Adriatic coastline around the town of Neum.",
      "The Adriatic Highway runs 9.25 kilometres through the corridor with a crossing at each end. Ten to fifteen minutes of driving separate Klek on one side from Zaton Doli on the other.",
      "Before the Pelješac Bridge opened, the main road connection between Dubrovnik and the rest of Croatia passed through the corridor and crossed the international border twice.",
      "Dubrovnik lives on tourism from small firms that truck supplies from the mainland. For qualifying consignments worth no more than fifteen thousand euro, EU rules waive certain entry and exit summary declarations once invoices and checks are satisfied. Cargo paperwork is a separate issue from passenger road access, which the Pelješac Bridge now carries.",
      "The corridor remains a striking example of how a relatively narrow piece of territory can change the shape and movement of a neighbouring country.",
    ],
    historicalContext: [
      "The present-day arrangement comes from the historical division of the Adriatic coast and the territorial settlement that left Bosnia and Herzegovina with access to the sea at Neum. Croatia joined the EU in 2013, which turned the corridor into a break inside Union customs ground. Brussels wrote a special waiver for goods crossing it.",
    ],
    whyItMatters: [
      "Neum demonstrates how a narrow coastal corridor can interrupt the territorial continuity of a much larger neighbouring country. Croatian officers stamp papers on exit and check seals on re-entry, keeping Union goods tracked across foreign tarmac.",
    ],
    fieldNote:
      "Two Croatian checkpoints face each other across nine kilometres of Bosnia.",
    sources: [
      {
        title: "Regulation concerning the Neum Corridor",
        publisher: "EUR-Lex, European Union",
        url: "https://eur-lex.europa.eu/eli/reg/2013/479/2017-05-23/eng",
        sourceType: "official",
        supports: ["Neum Corridor separates Dubrovnik from mainland Croatia", "waiver for qualifying consignments up to 15,000 euro"],
      },
      {
        title: "Amending Regulation 2017/762 on the Neum Corridor",
        publisher: "EUR-Lex, European Union",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017R0762",
        sourceType: "official",
        supports: ["10,000 euro figure replaced by 15,000 euro in 2017"],
      },
      {
        title: "The Neum Corridor",
        publisher: "European Commission",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1762716619652&uri=CELEX%3A52013PC0001",
        sourceType: "official",
        supports: ["9.25 km road section", "historical land connection between Dubrovnik and Croatia", "D8 only land link", "Klek and Zaton Doli crossings", "10 to 15 minute drive", "tourism small firms supply from mainland", "2013 proposal with 10,000 euro threshold", "paper waiver regime", "2013 accession context"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "pheasant-island",
    slug: "pheasant-island",
    number: 31,
    title: "Pheasant Island",
    subtitle: "A tiny island whose administration changes every six months",
    category: "history-shaped-borders",
    tags: ["condominium", "alternating administration", "treaty history"],
    countries: ["France", "Spain"],
    coordinates: [-1.704, 43.34],
    locationPrecision: "point-of-interest",
    mapZoom: 13,
    teaser: "France and Spain take turns administering the same tiny island.",
    leadFact:
      "Pheasant Island is a Franco-Spanish condominium whose administration alternates between France and Spain every six months.",
    explanation: [
      "The island lies in the Bidassoa River on the France-Spain border, between Irun on the Spanish bank and Hendaye on the French bank.",
      "France and Spain fought until 1659, when Louis XIV and Philip IV made peace. Envoys met on the island to shape the treaty, including a marriage pact between the two crowns. The marriage joined Louis to Marie-Thérèse, daughter of Philip, with a dowry that never arrived. The treaty also moved Roussillon and Artois to France while returning French gains in Catalonia.",
      "Today the island retains its unusual condominium status. Spain administers it for six months, followed by France for six months, creating a repeating transfer of administration without changing the underlying shared sovereignty.",
    ],
    historicalContext: [
      "The island served as a neutral meeting place during negotiations that produced the Treaty of the Pyrenees in 1659. Its diplomatic role continued long after the treaty was signed. The peace also arranged a royal wedding meant to bind the two kingdoms.",
    ],
    timeline: [
      {
        dateLabel: "1659",
        title: "Treaty of the Pyrenees",
        description: "France and Spain sign the treaty on Pheasant Island, ending their long conflict and reshaping parts of their border.",
      },
      {
        dateLabel: "Today",
        title: "Alternating administration",
        description: "The island remains a Franco-Spanish condominium, with administration alternating every six months.",
      },
    ],
    whyItMatters: [
      "Pheasant Island is a rare surviving example of two states sharing sovereignty over the same small piece of territory. The same treaty that drew the Pyrenees line left this island to both sides at once.",
    ],
    fieldNote:
      "Treaty ground in 1659, shared ground ever since.",
    sources: [
      {
        title: "Île des Faisans, sur la Bidassoa",
        publisher: "French Ministry for Europe and Foreign Affairs",
        url: "https://www.diplomatie.gouv.fr/files/files/le-ministere/lieux-emblematiques/13_notice_hendaye-faisans_complete_v2.pdf",
        sourceType: "official",
        language: "French",
        supports: ["Treaty of the Pyrenees", "Franco-Spanish condominium", "six-month alternating administration"],
      },
      {
        title: "La gran aventura de la diplomacia española",
        publisher: "Spanish Ministry of Foreign Affairs",
        url: "https://www.exteriores.gob.es/es/ServiciosAlCiudadano/PublicacionesOficiales/Historias%20del%20Mundo%20La%20gran%20aventura%20de%20la%20diplomacia%20espa%C3%B1ola.pdf",
        sourceType: "official",
        language: "Spanish",
        supports: ["Treaty of the Pyrenees negotiations", "island shared by France and Spain"],
      },
      {
        title: "Peace of the Pyrenees",
        publisher: "Britannica",
        url: "https://www.britannica.com/event/Peace-of-the-Pyrenees",
        sourceType: "reference",
        supports: ["signed 7 November 1659", "ended the Franco-Spanish War", "Louis XIV and Philip IV", "marriage compact", "dowry never paid", "Roussillon and Artois ceded", "Catalonia restored", "negotiated on Pheasant Island", "Irun and Hendaye banks"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-13",
  },
  {
    id: "bir-tawil",
    slug: "bir-tawil",
    number: 32,
    title: "Bir Tawil",
    subtitle: "A desert pocket claimed by neither Egypt nor Sudan",
    category: "border-puzzles",
    tags: ["unclaimed land", "treaty history", "boundary puzzle"],
    countries: ["Egypt", "Sudan"],
    coordinates: [33.9, 21.87],
    locationPrecision: "approximate-area",
    mapZoom: 8,
    teaser: "Two border lines leave one desert pocket owned by no one.",
    leadFact:
      "Egypt holds the 1899 political boundary and Sudan holds the 1902 administrative boundary, so the Halaib Triangle is claimed by both states while Bir Tawil is claimed by neither.",
    explanation: [
      "Bir Tawil covers about 2,060 square kilometres of desert south of the 22nd parallel. Britain drew a straight political boundary there in 1899, then an administrative boundary in 1902 that followed tribal grazing ground. The two lines disagree, and the disagreement created two leftover pockets.",
      "Egypt claims the 1899 line, which puts the Halaib Triangle in Egypt and Bir Tawil in Sudan. Sudan claims the 1902 line, which reverses both assignments. Each state therefore claims Halaib while neither claims Bir Tawil, since claiming it would weaken its own case for the richer ground.",
      "The pocket has no permanent settlements and no sea access. Egypt administers the ground in practice without marking it as Egyptian on official maps. Outside Antarctica it stands as the only piece of land claimed by no nation, though the terra nullius label fits only with that qualification.",
    ],
    historicalContext: [
      "Britain ran Egypt and Sudan together when both lines were drawn. Sudan kept the 1902 line at independence while Egypt held to 1899. The dispute over Halaib has lingered ever since, and Bir Tawil stays caught in the middle.",
    ],
    whyItMatters: [
      "The pocket shows how two boundary definitions can leave a hole in the map. Neither neighbour can take it without undermining its own claim to Halaib.",
    ],
    timeline: [
      {
        dateLabel: "1899",
        title: "Political boundary drawn",
        description: "Britain sets a straight boundary at the 22nd parallel between Egypt and Sudan.",
      },
      {
        dateLabel: "1902",
        title: "Administrative boundary drawn",
        description: "Britain draws a second line following tribal ground, creating the two mismatched pockets.",
      },
    ],
    sources: [
      {
        title: "Parliamentary question on Bir Tawil",
        publisher: "European Parliament",
        url: "https://www.europarl.europa.eu/doceo/document/E-8-2016-000502_EN.html",
        sourceType: "official",
        supports: ["1899 political and 1902 administrative lines", "Halaib claimed by both states", "Bir Tawil claimed by neither", "de facto Egyptian administration"],
      },
      {
        title: "Letter on the Egypt-Sudan boundary",
        publisher: "United Nations Digital Library",
        url: "https://digitallibrary.un.org/nanna/record/168919/files/S_25978-EN.pdf?withWatermark=0&withMetadata=0&registerDownload=1&version=1",
        sourceType: "official",
        supports: ["1899 agreement at the 22nd parallel", "1902 administrative adjustments", "Sudan position on the boundary"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "four-corners",
    slug: "four-corners",
    number: 33,
    title: "Four Corners",
    subtitle: "The only place where four American states meet",
    category: "border-puzzles",
    tags: ["survey history", "state boundary", "marker"],
    countries: ["United States"],
    coordinates: [-109.045, 36.999],
    locationPrecision: "point-of-interest",
    mapZoom: 15,
    teaser: "Stand in four states at once on a bronze disk.",
    leadFact:
      "A surveyor set the marker in 1875, and all four states accept it as the legal meeting point of Arizona, Colorado, New Mexico and Utah.",
    explanation: [
      "The disk sits in high desert on Navajo and Ute tribal land, run as a tribal park that draws about a quarter million visitors a year. Visitors line up to place hands and feet in four states at once. Congress calls it the only place in the country where four state boundaries meet.",
      "Chandler Robbins set the point in 1875 at what his orders described as 109 degrees 3 minutes west of Greenwich and 37 degrees north. Modern GPS puts the disk about 1,800 feet east of that target. The error came from the tools of the day, and a later myth wrongly claimed two and a half miles.",
      "The numbers stopped mattering once the states adopted the marker. In surveying law the monument controls, so the disk itself defines the boundary even where the math drifts.",
    ],
    historicalContext: [
      "Congress drew the territorial lines between 1868 and 1875, and a monument went up in 1899. The site sits on tribal ground that two Native nations share through the park.",
    ],
    whyItMatters: [
      "The site teaches a surveying rule most maps hide. Boundaries live where markers stand, not where coordinates say they should.",
    ],
    sources: [
      {
        title: "Why the Four Corners Monument is in Exactly the Right Place",
        publisher: "NOAA National Geodetic Survey",
        url: "https://www.ngs.noaa.gov/INFO/fourcorners.shtml",
        sourceType: "institutional",
        supports: ["Robbins 1875 survey", "109 degrees 3 minutes target", "about 1,800 feet offset", "monument legally controls"],
      },
      {
        title: "Four Corners Monument findings",
        publisher: "U.S. Congress",
        url: "https://www.govinfo.gov/content/pkg/PLAW-106publ143/html/PLAW-106publ143.htm",
        sourceType: "official",
        supports: ["only place where four state boundaries meet", "lines drawn 1868 to 1875", "monument erected 1899", "tribal park setting"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "cabinda",
    slug: "cabinda",
    number: 34,
    title: "Cabinda",
    subtitle: "An Angolan province cut off by Congolese ground",
    category: "enclaves-exclaves",
    tags: ["exclave", "separated territory", "oil"],
    countries: ["Angola", "Democratic Republic of the Congo"],
    coordinates: [-12.35, 5.35],
    locationPrecision: "approximate-area",
    mapZoom: 8,
    teaser: "Angola's oil province sits apart from Angola.",
    leadFact:
      "Cabinda is a province of Angola separated from the rest of the country by a strip of the Democratic Republic of the Congo.",
    explanation: [
      "The province holds the Atlantic coast north of the Congo River mouth with its capital at Cabinda city. A narrow strip of Congolese ground bounds it south and east, cutting it from Luanda by land.",
      "Offshore oil made crude the dominant export while timber and cocoa faded. The revenue matters greatly to Luanda, which treats the province as integral Angolan ground.",
      "Separatist groups fought for independence from the 1960s, and a 2006 peace accord largely ended the conflict though skirmishes continued. The dispute shapes how outsiders describe the exclave, so careful wording calls it a province, never a country.",
    ],
    historicalContext: [
      "Portugal administered the area as a separate protectorate before Angolan independence in 1975 brought Luanda's rule. Separatist groups call that takeover an occupation, a claim Luanda rejects.",
    ],
    whyItMatters: [
      "Oil money and a land cut-off pull in opposite directions. The province funds the state while its roads stop at a foreign border.",
    ],
    sources: [
      {
        title: "Cabinda province facts",
        publisher: "Britannica",
        url: "https://www.britannica.com/place/Cabinda-province-Angola",
        sourceType: "reference",
        supports: ["northern exclave of Angola", "separated by DRC strip", "offshore oil dominant export", "FLEC conflict and 2006 accord"],
      },
      {
        title: "Angola: Between War and Peace in Cabinda",
        publisher: "Human Rights Watch",
        url: "https://www.hrw.org/legacy/backgrounder/africa/angola/2004/1204/1.htm",
        sourceType: "institutional",
        supports: ["oil-rich enclave separated by DRC", "FLEC fight since 1975", "conflict history"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "temburong",
    slug: "temburong",
    number: 35,
    title: "Temburong District",
    subtitle: "Brunei's eastern district across Malaysian ground",
    category: "enclaves-exclaves",
    tags: ["exclave", "bridge", "separated territory"],
    countries: ["Brunei", "Malaysia"],
    coordinates: [115.07, 4.71],
    locationPrecision: "approximate-area",
    mapZoom: 10,
    teaser: "Half of Brunei sat across another country until a sea bridge arrived.",
    leadFact:
      "Temburong belongs to Brunei but sits apart from the mainland across the Malaysian district of Limbang, until a 2020 bridge joined the two shores by road.",
    explanation: [
      "Temburong sits east of Brunei Bay while the rest of the country sits west. The Malaysian district of Limbang fills the land between them.",
      "Before 2020 travellers took a 45 minute boat across the bay or drove two hours through Limbang with four border checks. The Sultan Haji Omar Ali Saifuddien Bridge opened on 17 March 2020 and cut the capital run to under half an hour.",
      "Tourism Brunei calls the 30 kilometre crossing among the longest bridges in Southeast Asia. Geographic separation remains while practical isolation ended.",
    ],
    whyItMatters: [
      "The bridge lets commuters reach the capital without entering Malaysia, ending four checkpoints per trip.",
    ],
    sources: [
      {
        title: "Sultan Haji Omar Ali Saifuddien Bridge",
        publisher: "ASEAN Connectivity",
        url: "https://connectivity.asean.org/resource/sultan-haji-omar-ali-saifuddien-bridge-brunei-darussalam",
        sourceType: "institutional",
        supports: ["26.3 km across Brunei Bay", "opened 17 March 2020", "under 30 minutes to capital", "before 45 minute boat or 2 hours via Limbang", "four border checkpoints"],
      },
      {
        title: "Sultan Haji Omar Ali Saifuddien Bridge",
        publisher: "Brunei Tourism",
        url: "https://www.bruneitourism.com/places/sultan-haji-omar-ali-saifuddien-bridge-shoas-bridge",
        sourceType: "official",
        supports: ["30 km crossing", "longest bridges in Southeast Asia", "opened March 2020", "connects Temburong to mainland"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "mount-athos",
    slug: "mount-athos",
    number: 36,
    title: "Mount Athos",
    subtitle: "A self-governed monastic peninsula inside Greece",
    category: "access-oddities",
    tags: ["autonomous territory", "entry permit", "monastic"],
    countries: ["Greece"],
    coordinates: [24.33, 40.16],
    locationPrecision: "approximate-area",
    mapZoom: 10,
    teaser: "Twenty monasteries run a peninsula under Greek sovereignty.",
    leadFact:
      "Greece's constitution keeps Mount Athos as a self-governed part of the state under twenty monasteries, with entry permits and no admission for women.",
    explanation: [
      "The peninsula rises on the Chalkidiki coast with Karyes as its capital. Twenty ruling monasteries divide the whole ground between them, and the land cannot be taken or sold outside the community.",
      "Every male visitor needs a diamonitirion permit from the Pilgrims Bureau, collected at Ouranoupoli. Only men past eighteen may enter, and Orthodox pilgrims come first in line.",
      "The Avaton bars women from the peninsula under monastic law going back centuries. Monks defend it as religious practice rather than ordinary border control.",
    ],
    historicalContext: [
      "The 1924 charter ratified in 1926 still frames the regime, and the current constitution repeats protections carried through every charter since 1925.",
    ],
    whyItMatters: [
      "The peninsula shows autonomy pushed to its limit inside a modern state. Its own administration, courts and tax privileges run beside a state governor.",
    ],
    sources: [
      {
        title: "The Avaton debate and the monastic community of Mount Athos",
        publisher: "University of Modena and Reggio Emilia",
        url: "https://www.orfect.unimore.it/the-avaton-debate-human-rights-and-the-monastic-community-of-mount-athos/",
        sourceType: "institutional",
        supports: ["Article 105 self-governed part of Greece", "twenty monasteries divide the peninsula", "exempt from expropriation", "diamonitirion permit system", "Avaton ban on women"],
      },
      {
        title: "How to Get a Diamonitirion",
        publisher: "Mount Athos Pilgrim Guide",
        url: "https://mount-athos.org/en/travel-guide/getting-started/diamonitirion",
        sourceType: "reference",
        supports: ["mandatory permit for male visitors", "Pilgrims Bureau Thessaloniki", "collected at Ouranoupoli", "18 and above", "Orthodox precedence"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "euroairport-basel-mulhouse",
    slug: "euroairport-basel-mulhouse",
    number: 37,
    title: "EuroAirport Basel-Mulhouse",
    subtitle: "A binational airport on French soil",
    category: "access-oddities",
    tags: ["binational", "customs sector", "airport"],
    countries: ["France", "Switzerland"],
    coordinates: [7.53, 47.59],
    locationPrecision: "point-of-interest",
    mapZoom: 12,
    teaser: "One airport, two sectors, and a customs line indoors.",
    leadFact:
      "The airport stands entirely on French ground under a 1949 Franco-Swiss convention, with a delimited Swiss customs sector inside it.",
    explanation: [
      "Runways and terminals sit in Saint-Louis near Basel, all within France. A joint French-Swiss public body runs the platform under the 1949 convention, with eight directors from each side.",
      "Inside the terminal a Swiss customs sector lets Swiss officers check goods and passengers bound for Switzerland. Passengers bound for Switzerland clear Swiss controls before leaving the airport grounds.",
      "Tax fights lasted years until a 2015 joint statement and a 2017 deal fixed which firms pay what where. The Swiss sector now counts as Swiss ground for VAT under an EU-approved derogation.",
    ],
    historicalContext: [
      "The two states signed the convention on 4 July 1949 and the airport opened after the war. It now serves the French, Swiss and German border region as one platform.",
    ],
    whyItMatters: [
      "The setup keeps one runway serving three countries while tax and customs lines run indoors.",
    ],
    sources: [
      {
        title: "EuroAirport: Switzerland and France adopt a joint statement",
        publisher: "Swiss Federal Council",
        url: "https://www.admin.ch/en/nsb?id=55984",
        sourceType: "official",
        supports: ["located on French soil", "1949 convention", "Swiss customs sector", "2015 joint statement"],
      },
      {
        title: "Council Implementing Decision 2017/320 on Basel-Mulhouse Airport",
        publisher: "EUR-Lex",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32017D0320",
        sourceType: "official",
        supports: ["airport situated entirely within the Union", "Swiss sector VAT derogation", "Swiss controls on goods and passengers"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "samoa-missing-day",
    slug: "samoa-missing-day",
    number: 38,
    title: "Samoa's Missing Day",
    subtitle: "The Friday that never happened",
    category: "time-date",
    tags: ["date line", "time zone change"],
    countries: ["Samoa"],
    coordinates: [-171.76, -13.83],
    locationPrecision: "approximate-area",
    mapZoom: 6,
    teaser: "An entire country skipped Friday, 30 December 2011.",
    leadFact:
      "At midnight ending 29 December 2011 Samoa jumped from UTC minus 11 to UTC plus 13, so Friday the 30th never happened there.",
    explanation: [
      "The International Dateline Act moved the line from Samoa's western border to its eastern one. Clocks struck midnight Thursday and showed Saturday morning, a full day forward.",
      "Ministers framed the move around trade with Australia and New Zealand, whose working days Samoa now shares. Tokelau made the same jump the same night.",
      "Samoa long sat east of the line as one of the last places to greet each day. Parliament moved it west in 2011 and the country became one of the first.",
    ],
    whyItMatters: [
      "The jump shows the date line follows legislatures, not geography. A parliament redrew the world's calendar edge with one act.",
    ],
    timeline: [
      {
        dateLabel: "May 2011",
        title: "Jump announced",
        description: "Samoa announces the dateline move to align with Australia and New Zealand.",
      },
      {
        dateLabel: "29 December 2011",
        title: "Friday skipped",
        description: "Midnight Thursday becomes Saturday morning as the country moves from UTC minus 11 to UTC plus 13.",
      },
    ],
    sources: [
      {
        title: "Samoa and Tokelau skip a day for dateline change",
        publisher: "BBC News",
        url: "https://www.bbc.com/news/world-asia-16351377",
        sourceType: "reference",
        supports: ["skipped 30 December 2011", "midnight 29 to 31 December", "trade with Australia and New Zealand", "Tokelau jumped too"],
      },
      {
        title: "International Dateline Act discussion",
        publisher: "IANA Time Zone Database",
        url: "http://lists.iana.org/hyperkitty/list/tz@iana.org/message/ERROZWGO6INJHOFBYSHVCBZAK25TWV52/",
        sourceType: "institutional",
        supports: ["International Dateline Act 2011", "UTC minus 11 to UTC plus 13", "midnight 29 December"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "korean-dmz",
    slug: "korean-dmz",
    number: 39,
    title: "Korean Demilitarized Zone",
    subtitle: "A four kilometre buffer drawn by armistice",
    category: "history-shaped-borders",
    tags: ["armistice", "buffer zone", "demarcation line"],
    countries: ["North Korea", "South Korea"],
    coordinates: [126.99, 38.32],
    locationPrecision: "approximate-area",
    mapZoom: 7,
    teaser: "Two armies stopped but never made peace.",
    leadFact:
      "The 27 July 1953 armistice drew a demarcation line and pulled both sides back two kilometres, leaving a four kilometre buffer with no peace treaty behind it.",
    explanation: [
      "The line crosses the peninsula with two kilometres of buffer on each side. No one may cross the line without specific authorization.",
      "Commanders signed at Panmunjom after 158 meetings over two years. The text is purely military, and no nation signed it. South Korea itself stayed off the signature page.",
      "The guns stopped that night at ten, and the truce has held without becoming peace. The line is a military demarcation, not an international boundary in the traditional sense.",
    ],
    historicalContext: [
      "North Korea crossed the 38th parallel in June 1950 and three years of war moved the front back near its start. Talks began a year in but prisoner disputes dragged them out.",
    ],
    whyItMatters: [
      "Maps draw it like a border, but its force comes from soldiers, not treaties between states. The buffer froze a war in place for over seventy years.",
    ],
    timeline: [
      {
        dateLabel: "1950",
        title: "War begins",
        description: "Northern forces cross the 38th parallel and the Korean War starts.",
      },
      {
        dateLabel: "1953",
        title: "Armistice signed",
        description: "Commanders sign at Panmunjom and the guns stop that night.",
      },
    ],
    sources: [
      {
        title: "Korean War Armistice Agreement",
        publisher: "U.S. Forces Korea",
        url: "https://www.usfk.mil/Portals/105/Documents/SOFA/G_Armistice_Agreement.pdf",
        sourceType: "primary",
        supports: ["27 July 1953 Panmunjom", "demarcation line plus two kilometres each side", "buffer against resumed hostilities", "no crossing without authorization"],
      },
      {
        title: "Korean War Armistice Agreement, 1953",
        publisher: "U.S. National Archives",
        url: "https://www.archives.gov/milestone-documents/armistice-agreement-restoration-south-korean-state",
        sourceType: "institutional",
        supports: ["158 meetings over two years", "purely military document", "no nation a signatory", "not a permanent peace treaty", "truce in effect at night"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
  {
    id: "bernauer-strasse",
    slug: "bernauer-strasse",
    number: 40,
    title: "Bernauer Straße",
    subtitle: "A street split between buildings and sidewalk",
    category: "history-shaped-borders",
    tags: ["Berlin Wall", "divided street", "memorial"],
    countries: ["Germany"],
    coordinates: [13.39, 52.535],
    locationPrecision: "point-of-interest",
    mapZoom: 14,
    teaser: "One side of the street woke up in another country.",
    leadFact:
      "On Bernauer Strasse the border ran directly in front of East Berlin buildings while the sidewalk belonged to the West, so the Wall divided a living street.",
    explanation: [
      "The street marks the old line between Wedding in the west and Mitte in the east. Houses on the southern side stood in the Soviet sector while the pavement outside stood in the French sector.",
      "After the barriers went up, residents of the border buildings fled through windows, and many succeeded on camera before the world. The tenants were later evicted and the houses torn down in 1965, leaving only ground-floor facades as part of the wall into the 1980s.",
      "The memorial now runs 1.4 kilometres along the old strip with the last full-depth Wall section, a documentation center and a chapel. The first Wall segments fell here on the night of 10 November 1989.",
    ],
    historicalContext: [
      "The sector border hardened on 13 August 1961 and neighbours became separated overnight. Demolition of the fortifications began at Bernauer and Ackerstrasse in June 1990.",
    ],
    whyItMatters: [
      "The street shows how a drawn line remade ordinary addresses. Pavement and doorway fell under different states.",
    ],
    timeline: [
      {
        dateLabel: "1961",
        title: "Wall goes up",
        description: "Barriers divide the street and residents flee through windows.",
      },
      {
        dateLabel: "1989",
        title: "First segments fall",
        description: "Segments between Bernauer Strasse and Eberswalder Strasse open a new crossing.",
      },
    ],
    sources: [
      {
        title: "Bernauer Strasse",
        publisher: "Berlin Wall Foundation",
        url: "https://www.stiftung-berliner-mauer.de/en/berlin-wall-memorial/historical-site/bernauer-strasse",
        sourceType: "official",
        supports: ["border directly in front of East buildings", "residents fled", "1.4 km memorial", "10 November 1989 first segments", "demolition June 1990"],
      },
      {
        title: "Bernauer Strasse memorial site",
        publisher: "Berlin City Monuments Office",
        url: "https://www.berlin.de/landesdenkmalamt/denkmale/highlight-berliner-mauer/mauer-denkmale/bernauer-strasse-649692.en.php",
        sourceType: "official",
        supports: ["houses Soviet sector sidewalks French sector", "evicted and torn down 1965", "facades as wall into the 1980s", "13 August 1961 sealing"],
      },
    ],
    verificationStatus: "verified",
    lastVerified: "2026-10-14",
  },
];

export const verifiedExhibits = exhibits.filter((e) => e.verificationStatus === "verified");

export const exhibitBySlug = (slug: string) => verifiedExhibits.find((e) => e.slug === slug);
