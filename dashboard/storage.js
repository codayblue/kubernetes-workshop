/**
 * This is the key for storage that we keep the state in
 */
const storageKey = "Talks:Frames";

/**
 * Returns the store iframes in local storage
 */
export const getStoredIframes = () => {
  const existing = localStorage.getItem(storageKey);

  if (existing) {
    return JSON.parse(existing);
  }

  return [];
};

/**
 * Appends a frame to the state set
 */
export const appendFrame = (frame) => {
  const existing = getStoredIframes();

  existing.push(frame);

  localStorage.setItem(storageKey, JSON.stringify(existing));
};

/**
 * Deletes a frame from the state based on the title
 */
export const deleteFrame = (title) => {
  const existing = getStoredIframes();
  const filtered = existing.filter((frame) => frame.title !== title);

  localStorage.setItem(storageKey, JSON.stringify(filtered));
};
