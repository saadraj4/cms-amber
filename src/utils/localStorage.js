// Utility functions for localStorage persistence

export const storage = {
  // Generic get function
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  // Generic set function
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  // Remove item
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  // Clear all
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Specific storage keys
export const STORAGE_KEYS = {
  PAGES: 'cms_pages',
  PORTFOLIO: 'cms_portfolio',
  HERO_SECTION: 'cms_hero_section',
  SECTIONS: 'cms_sections'
};

// Pages specific functions
export const pagesStorage = {
  getAll: () => storage.get(STORAGE_KEYS.PAGES, []),
  save: (pages) => storage.set(STORAGE_KEYS.PAGES, pages),
  add: (page) => {
    const pages = pagesStorage.getAll();
    const newPage = { ...page, id: Date.now().toString() };
    pages.push(newPage);
    pagesStorage.save(pages);
    return newPage;
  },
  update: (id, updatedPage) => {
    const pages = pagesStorage.getAll();
    const index = pages.findIndex(p => p.id === id);
    if (index !== -1) {
      pages[index] = { ...pages[index], ...updatedPage };
      pagesStorage.save(pages);
      return pages[index];
    }
    return null;
  },
  delete: (id) => {
    const pages = pagesStorage.getAll();
    const filteredPages = pages.filter(p => p.id !== id);
    pagesStorage.save(filteredPages);
    return filteredPages;
  }
};

// Portfolio specific functions
export const portfolioStorage = {
  getAll: () => storage.get(STORAGE_KEYS.PORTFOLIO, []),
  save: (projects) => storage.set(STORAGE_KEYS.PORTFOLIO, projects),
  add: (project) => {
    const projects = portfolioStorage.getAll();
    const newProject = { ...project, id: Date.now().toString() };
    projects.push(newProject);
    portfolioStorage.save(projects);
    return newProject;
  },
  update: (id, updatedProject) => {
    const projects = portfolioStorage.getAll();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedProject };
      portfolioStorage.save(projects);
      return projects[index];
    }
    return null;
  },
  delete: (id) => {
    const projects = portfolioStorage.getAll();
    const filteredProjects = projects.filter(p => p.id !== id);
    portfolioStorage.save(filteredProjects);
    return filteredProjects;
  }
};

// Hero section functions
export const heroStorage = {
  get: () => storage.get(STORAGE_KEYS.HERO_SECTION, {
    heading: 'Welcome to Our Platform',
    subheading: 'Build amazing experiences with our tools',
    ctaEnabled: true,
    ctaText: 'Get Started',
    ctaLink: '#',
    backgroundImage: ''
  }),
  save: (heroData) => storage.set(STORAGE_KEYS.HERO_SECTION, heroData)
};

// Sections storage (About, Education, Experience, Skills, Contact, Testimonials)
const defaultSections = {
  about: {
    description: '',
    imageDataUrl: ''
  },
  education: {
    enabled: false,
    items: [] // { id, school, degree, field, from, to, description }
  },
  experience: {
    items: [] // { id, role, company, from, to, description }
  },
  skills: {
    list: [] // array of strings
  },
  contact: {
    socialEnabled: false,
    links: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      github: ''
    }
  },
  testimonials: {
    items: [] // { id, buyerName, source, imageDataUrl, type: 'text'|'video', reviewText, videoDataUrl }
  }
};

export const sectionsStorage = {
  getAll: () => storage.get(STORAGE_KEYS.SECTIONS, defaultSections),
  saveAll: (sections) => storage.set(STORAGE_KEYS.SECTIONS, sections),

  // About
  getAbout: () => sectionsStorage.getAll().about,
  saveAbout: (about) => {
    const all = sectionsStorage.getAll();
    all.about = { ...all.about, ...about };
    sectionsStorage.saveAll(all);
    return all.about;
  },

  // Education
  getEducation: () => sectionsStorage.getAll().education,
  setEducationEnabled: (enabled) => {
    const all = sectionsStorage.getAll();
    all.education.enabled = !!enabled;
    sectionsStorage.saveAll(all);
    return all.education;
  },
  addEducation: (item) => {
    const all = sectionsStorage.getAll();
    const newItem = { id: Date.now().toString(), ...item };
    all.education.items.push(newItem);
    sectionsStorage.saveAll(all);
    return newItem;
  },
  updateEducation: (id, update) => {
    const all = sectionsStorage.getAll();
    const idx = all.education.items.findIndex(i => i.id === id);
    if (idx !== -1) {
      all.education.items[idx] = { ...all.education.items[idx], ...update };
      sectionsStorage.saveAll(all);
      return all.education.items[idx];
    }
    return null;
  },
  deleteEducation: (id) => {
    const all = sectionsStorage.getAll();
    all.education.items = all.education.items.filter(i => i.id !== id);
    sectionsStorage.saveAll(all);
    return all.education.items;
  },

  // Experience
  getExperience: () => sectionsStorage.getAll().experience,
  addExperience: (item) => {
    const all = sectionsStorage.getAll();
    const newItem = { id: Date.now().toString(), ...item };
    all.experience.items.push(newItem);
    sectionsStorage.saveAll(all);
    return newItem;
  },
  updateExperience: (id, update) => {
    const all = sectionsStorage.getAll();
    const idx = all.experience.items.findIndex(i => i.id === id);
    if (idx !== -1) {
      all.experience.items[idx] = { ...all.experience.items[idx], ...update };
      sectionsStorage.saveAll(all);
      return all.experience.items[idx];
    }
    return null;
  },
  deleteExperience: (id) => {
    const all = sectionsStorage.getAll();
    all.experience.items = all.experience.items.filter(i => i.id !== id);
    sectionsStorage.saveAll(all);
    return all.experience.items;
  },

  // Skills
  getSkills: () => sectionsStorage.getAll().skills,
  saveSkills: (list) => {
    const all = sectionsStorage.getAll();
    all.skills.list = Array.isArray(list) ? list : [];
    sectionsStorage.saveAll(all);
    return all.skills.list;
  },

  // Contact
  getContact: () => sectionsStorage.getAll().contact,
  saveContact: (contact) => {
    const all = sectionsStorage.getAll();
    all.contact = { ...all.contact, ...contact };
    sectionsStorage.saveAll(all);
    return all.contact;
  },

  // Testimonials
  getTestimonials: () => sectionsStorage.getAll().testimonials,
  addTestimonial: (item) => {
    const all = sectionsStorage.getAll();
    const newItem = { id: Date.now().toString(), ...item };
    all.testimonials.items.push(newItem);
    sectionsStorage.saveAll(all);
    return newItem;
  },
  updateTestimonial: (id, update) => {
    const all = sectionsStorage.getAll();
    const idx = all.testimonials.items.findIndex(i => i.id === id);
    if (idx !== -1) {
      all.testimonials.items[idx] = { ...all.testimonials.items[idx], ...update };
      sectionsStorage.saveAll(all);
      return all.testimonials.items[idx];
    }
    return null;
  },
  deleteTestimonial: (id) => {
    const all = sectionsStorage.getAll();
    all.testimonials.items = all.testimonials.items.filter(i => i.id !== id);
    sectionsStorage.saveAll(all);
    return all.testimonials.items;
  }
};
