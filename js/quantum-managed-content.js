(function () {
  'use strict';

  const collections = [
    { manifest: '../content/research/manifest.json', key: 'notes', global: 'quantumResearchNotes', slug: 'slug' },
    { manifest: '../content/papers/manifest.json', key: 'papers', global: 'quantumPapers', slug: 'slug' }
  ];

  async function fetchJson(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load ${url} (${response.status})`);
    return response.json();
  }

  async function mergeCollection(config) {
    if (!Array.isArray(window[config.global])) return;
    try {
      const manifest = await fetchJson(config.manifest);
      const entries = Array.isArray(manifest[config.key]) ? manifest[config.key] : [];
      const documents = await Promise.all(entries.map(async (entry) => {
        if (!entry?.path) return null;
        try { return await fetchJson(`../${entry.path}`); }
        catch (error) {
          console.warn(`Managed content skipped: ${entry.path}`, error);
          return null;
        }
      }));

      const merged = new Map(window[config.global].map((document) => [document[config.slug], document]));
      documents.filter(Boolean).forEach((document) => {
        if (document[config.slug]) merged.set(document[config.slug], document);
      });
      window[config.global].splice(0, window[config.global].length, ...merged.values());
    } catch (error) {
      // The built-in content remains fully usable if a manifest is unavailable.
      console.warn(`Managed ${config.key} could not be loaded.`, error);
    }
  }

  window.quantumManagedContentReady = Promise.all(collections.map(mergeCollection));
})();
