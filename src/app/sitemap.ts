import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://invoice.nordible.co";
  const languages = ["en", "de", "fr", "es"];

  const landingAlternates = {
    languages: {
      "x-default": `${baseUrl}/en`,
      en: `${baseUrl}/en`,
      de: `${baseUrl}/de`,
      fr: `${baseUrl}/fr`,
      es: `${baseUrl}/es`,
    },
  };

  const generatorAlternates = {
    languages: {
      "x-default": `${baseUrl}/en/generator`,
      en: `${baseUrl}/en/generator`,
      de: `${baseUrl}/de/generator`,
      fr: `${baseUrl}/fr/generator`,
      es: `${baseUrl}/es/generator`,
    },
  };

  const routes: MetadataRoute.Sitemap = [
    // Landing pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: landingAlternates,
    },
    ...languages.map((lang) => ({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: landingAlternates,
    })),

    // Generator pages
    {
      url: `${baseUrl}/generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: generatorAlternates,
    },
    ...languages.map((lang) => ({
      url: `${baseUrl}/${lang}/generator`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: generatorAlternates,
    })),
  ];

  return routes;
}
