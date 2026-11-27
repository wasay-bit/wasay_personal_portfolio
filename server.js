import { DurableObject } from "cloudflare:workers";

// The site's words live in data.js and projects.js. The only stored state is the files too large
// to live in code: the profile photo, the résumé PDF, and the event and university images. Each
// is kept as base64 chunks under "<kind>:meta" and "<kind>:<n>".

const CHUNK = 60000; // characters of base64 per stored value
const KINDS = {
  photo: /^image\/(jpeg|png|webp)$/,
  resume: /^application\/pdf$/,
};
// Photos for "Beyond the Day-to-Day" entries are stored under "event:<id>".
const EVENT_IMAGE = /^image\/(jpeg|png|webp)$/;
const EVENT_ID = /^[a-z0-9-]{1,40}$/;
function checkEventId(id) {
  if (!EVENT_ID.test(String(id))) throw new TypeError(`Invalid entry id: ${id}`);
  return String(id);
}

export class Gadget extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.subscribers = new Set();
    this.cache = new Map(); // kind -> { url, name } | null
  }

  // Everything the page needs in one call: { photo: dataUrl | null, resume: { url, name } | null }.
  async getAssets() {
    const [photo, resume] = await Promise.all([this.getPhoto(), this.getResume()]);
    return { photo, resume };
  }

  // The profile photo as a data: URL, or null when none has been set.
  async getPhoto() {
    const file = await this.#load("photo");
    return file ? file.url : null;
  }

  // Replace the profile photo. `bytes` is the image file's content.
  async setPhoto(bytes, type = "image/jpeg") {
    return this.#save("photo", bytes, type, null);
  }

  async removePhoto() {
    return this.#remove("photo");
  }

  // The résumé as { url (a data: URL), name (the download file name) }, or null.
  async getResume() {
    const file = await this.#load("resume");
    return file ? { url: file.url, name: file.name || "Resume.pdf" } : null;
  }

  // Replace the résumé PDF. `name` is the file name visitors get when they download it.
  async setResume(bytes, name = "Resume.pdf") {
    return this.#save("resume", bytes, "application/pdf", String(name));
  }

  async removeResume() {
    return this.#remove("resume");
  }

  // The photo for a "Beyond the Day-to-Day" entry (by its id, such as "mimecast") as a data: URL, or null.
  async getEventPhoto(id) {
    const file = await this.#load("event:" + checkEventId(id));
    return file ? file.url : null;
  }

  // Replace the photo for an entry. `bytes` is the image file's content.
  async setEventPhoto(id, bytes, type = "image/png") {
    return this.#save("event:" + checkEventId(id), bytes, type, null);
  }

  async removeEventPhoto(id) {
    return this.#remove("event:" + checkEventId(id));
  }

  // Calls `callback.update(assets)` (see getAssets) whenever the photo or résumé changes.
  async subscribe(callback) {
    const subscriber = callback.dup();
    this.subscribers.add(subscriber);
    subscriber.onRpcBroken(() => this.subscribers.delete(subscriber));
  }

  async #load(kind) {
    if (this.cache.has(kind)) return this.cache.get(kind);
    const meta = await this.ctx.storage.get(kind + ":meta");
    let file = null;
    if (meta) {
      const keys = Array.from({ length: meta.chunks }, (_, i) => `${kind}:${i}`);
      const parts = await this.ctx.storage.get(keys);
      const base64 = keys.map((key) => parts.get(key) || "").join("");
      file = { url: `data:${meta.type};base64,${base64}`, name: meta.name || null };
    }
    this.cache.set(kind, file);
    return file;
  }

  async #save(kind, bytes, type, name) {
    const allowed = KINDS[kind] || (kind.startsWith("event:") ? EVENT_IMAGE : null);
    if (!allowed || !allowed.test(type)) throw new TypeError(`Unsupported file type for ${kind}: ${type}`);
    const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    if (!data.length) throw new TypeError("The file is empty.");
    let binary = "";
    for (let i = 0; i < data.length; i += 0x8000) {
      binary += String.fromCharCode.apply(null, data.subarray(i, i + 0x8000));
    }
    const base64 = btoa(binary);

    await this.#clear(kind);
    let chunks = 0;
    for (let i = 0; i < base64.length; i += CHUNK) {
      await this.ctx.storage.put(`${kind}:${chunks++}`, base64.slice(i, i + CHUNK));
    }
    await this.ctx.storage.put(kind + ":meta", { type, name, chunks, bytes: data.length });

    this.cache.set(kind, { url: `data:${type};base64,${base64}`, name });
    await this.#notify();
    return { bytes: data.length, chunks };
  }

  async #remove(kind) {
    await this.#clear(kind);
    this.cache.set(kind, null);
    await this.#notify();
  }

  async #clear(kind) {
    const meta = await this.ctx.storage.get(kind + ":meta");
    if (!meta) return;
    for (let i = 0; i < meta.chunks; i++) await this.ctx.storage.delete(`${kind}:${i}`);
    await this.ctx.storage.delete(kind + ":meta");
  }

  async #notify() {
    if (!this.subscribers.size) return;
    const assets = await this.getAssets();
    for (const subscriber of this.subscribers) {
      Promise.resolve(subscriber.update(assets)).catch(() => this.subscribers.delete(subscriber));
    }
  }
}
