// Starts the site. Every photo and the résumé are files in this repository, so nothing runs on a server.

import site from "./site.js";

const FILES = {
  photo: "assets/photo.jpg",
  resume: { url: "assets/resume.pdf", name: "Wasay_Omair_Resume.pdf" },
  events: {
    mimecast: "assets/events/mimecast.png",
    ppit: "assets/events/ppit.png",
    "cloudflare-first-week": "assets/events/cloudflare-first-week.png",
    "austin-volunteering": "assets/events/austin-volunteering.png",
    utd: "assets/events/utd.png",
  },
};

// Same shape the page expects from its server, but answered from the files above.
const source = {
  async getAssets() {
    return { photo: FILES.photo, resume: FILES.resume };
  },
  async getEventPhoto(id) {
    return FILES.events[id] || null;
  },
  subscribe() {},
};

site.main(source).catch((error) => console.error("The site could not start:", error));
