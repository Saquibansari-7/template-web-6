/**
 * wedding-data.js
 * Single source of truth for Ahmad & Zara Nikah website.
 * Both index.html and admin.html load this file.
 * All data is persisted in localStorage under the key below.
 */

(function() {
  const STORAGE_KEY = 'ahmad_zara_wedding_data_v1';

  // ==================== DEFAULT DATA ====================
  const DEFAULT_DATA = {
    settings: {
      groom: "Ahmad",
      bride: "Zara",
      date: "2026-01-15T10:00:00",
      location: "Istanbul, Turkey",
      tagline: "Joined by faith, united by love",
      bismillah: "بسم الله الرحمن الرحيم",
      primaryColor: "#C9A84C"
    },

    story: [
      { year: "2019", title: "How We Met", description: "At a community iftar during Ramadan, introduced by mutual friends. A conversation about Islamic history turned into hours of shared laughter and discovery. Neither of us knew that Allah had already written our names together." },
      { year: "2020", title: "Istikhara", description: "After a year of friendship and deepening respect, we both prayed Salat al-Istikhara separately. The peace that followed was undeniable. When we shared our du'as with our families, every door opened with ease." },
      { year: "2021", title: "Family Meeting", description: "Our families gathered for the first time over a traditional Ottoman dinner. The warmth, the shared values, and the immediate connection between both households made it clear — this was more than a union of two hearts, but of two families." },
      { year: "2022", title: "The Proposal (Khitbah)", description: "Ahmad, with his father and the Imam, formally asked for Zara's hand in marriage. It was a moment of profound respect, tradition, and joy. The mahr was agreed upon with love and mutual understanding." },
      { year: "2023", title: "Engagement", description: "A beautiful engagement ceremony at the Blue Mosque gardens, surrounded by family and friends. We exchanged rings and made our intention clear before Allah and our loved ones." },
      { year: "2025", title: "The Nikah", description: "The day we become husband and wife in the sight of Allah. A sacred covenant, a new beginning, and the fulfillment of a prayer we both made years ago.", highlight: true }
    ],

    ceremony: {
      nikah: {
        venue: "Suleymaniye Mosque",
        address: "Istanbul, Turkey",
        date: "Friday, 10:00 AM",
        info: ""
      },
      walima: {
        venue: "Ciragan Palace Kempinski",
        address: "Besiktas, Istanbul",
        date: "Saturday, 6:00 PM",
        info: ""
      },
      quote: {
        english: "And among His signs is that He created for you from yourselves mates that you may find tranquility in them, and He placed between you love and mercy.",
        arabic: "وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
        reference: "— Surah Ar-Rum, 30:21"
      }
    },

    party: [
      { name: "Sheikh Yusuf Al-Khatib", role: "Imam & Officiant" },
      { name: "Dr. Farid Hassan", role: "Wali of the Bride" },
      { name: "Omar Khalil", role: "Witness" },
      { name: "Ibrahim Saeed", role: "Witness" },
      { name: "Hamza Tariq", role: "Best Man" },
      { name: "Amina Hassan", role: "Sahabiyyah" }
    ],

    guidelines: [
      { title: "Separate Seating", description: "Brothers and sisters will be seated in separate sections during the Walima, in accordance with Islamic etiquette." },
      { title: "Halal Only", description: "All food and beverages served will be 100% halal. No alcohol will be present at any point during the event." },
      { title: "Nasheed Only", description: "No musical instruments will be played. The ambiance will feature beautiful Islamic nasheeds and Quran recitation." },
      { title: "Photography", description: "A professional photographer will capture the event. Guests are welcome to take photos in designated areas only." }
    ],

    gallery: [],   // array of { url: string, caption?: string }

    duas: [],      // submitted by guests via public form

    // Section visibility toggles (admin controls which parts appear on the public site)
    sections: {
      story: true,
      ceremony: true,
      countdown: true,
      dua: true,
      party: true,
      guidelines: true,
      gallery: true,
      location: true
    },

    // Editable Location + Map (used in public #location section)
    location: {
      venue: "Ciragan Palace Kempinski",
      address: "Ciragan Caddesi No: 32",
      city: "Besiktas, 34349 Istanbul, Turkey",
      phone: "+90 212 326 46 46",
      // CSS decorative map pin position (percentages)
      pinTop: "40",
      pinLeft: "50",
      // Real coordinates (for future Google Maps / embed)
      lat: "41.045",
      lng: "29.015"
    }
  };

  // ==================== DATA ACCESS HELPERS ====================
  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
      }
      const parsed = JSON.parse(raw);
      // Merge with defaults for forward compatibility
      return {
        ...DEFAULT_DATA,
        ...parsed,
        settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
        sections: { ...DEFAULT_DATA.sections, ...(parsed.sections || {}) },
        location: { ...DEFAULT_DATA.location, ...(parsed.location || {}) }
      };
    } catch (e) {
      console.warn('Failed to load wedding data, using defaults', e);
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  }

  function saveData(newData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      // Notify any open tabs (public site + admin)
      window.dispatchEvent(new CustomEvent('wedding-data-updated', { detail: newData }));
    } catch (e) {
      console.error('Failed to save wedding data', e);
    }
  }

  function getData() {
    return loadData();
  }

  function resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    return loadData();
  }

  // Expose globally for both pages
  window.WEDDING_DATA = {
    STORAGE_KEY,
    DEFAULT_DATA,
    loadData,
    saveData,
    getData,
    resetToDefaults
  };

  // Auto-load on script include
  console.log('%c[wedding-data] Shared data layer loaded. Use window.WEDDING_DATA.getData()', 'color:#C9A84C');
})();
