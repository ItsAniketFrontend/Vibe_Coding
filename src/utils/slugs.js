// ─── Slug Utilities ───────────────────────────────────────
// Converts any string to a URL-safe slug
export const toSlug = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ─── Plot Type ↔ URL Slug Mapping ─────────────────────────
export const plotTypeSlugMap = {
  'Residential Plot': 'residential-plots',
  'Commercial Plot': 'commercial-plots',
  'Agricultural Land': 'agricultural-land',
  'Industrial Plot': 'industrial-plots',
  'Farm House': 'farm-houses',
  'Villa': 'villas',
  'Apartment': 'apartments',
  'House': 'houses',
};

// Reverse lookup: URL slug → display name
export const plotTypeFromSlug = Object.fromEntries(
  Object.entries(plotTypeSlugMap).map(([display, slug]) => [slug, display])
);

// Get all plot-type slugs (for validation)
export const allPlotTypeSlugs = Object.values(plotTypeSlugMap);

// ─── City slug helpers ────────────────────────────────────
export const cityToSlug = (city) => toSlug(city);

export const findCityBySlug = (slug, cities) =>
  cities.find((c) => toSlug(c) === slug) || null;

// ─── Location slug helpers ────────────────────────────────
export const locationToSlug = (location) => toSlug(location);

export const findLocationBySlug = (slug, locations) =>
  locations.find((l) => toSlug(l) === slug) || null;

// ─── Property slug (from title) ───────────────────────────
export const propertyToSlug = (property) => toSlug(property.title);

// ─── Build URLs ───────────────────────────────────────────
export const buildCityUrl = (city) => `/${toSlug(city)}`;

export const buildPlotTypeUrl = (city, plotType) =>
  `/${toSlug(city)}/${plotTypeSlugMap[plotType] || toSlug(plotType)}`;

export const buildLocationUrl = (city, plotType, location) =>
  `/${toSlug(city)}/${plotTypeSlugMap[plotType] || toSlug(plotType)}/${toSlug(location)}`;

export const buildPlotDetailUrl = (property) =>
  `/plot/${toSlug(property.city)}/${plotTypeSlugMap[property.type] || toSlug(property.type)}/${toSlug(property.location)}/${toSlug(property.title)}`;

// ─── Capitalize helper ────────────────────────────────────
export const capitalize = (str) =>
  str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
