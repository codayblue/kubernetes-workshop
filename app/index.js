import { createFrame } from "./factories.js";
import { getStoredIframes, appendFrame } from "./storage.js";

/**
 * The set of frames
 */
const frames = document.querySelector(".frames");

/**
 * Grabs the add frame input group
 */
const addFrameGroup = document.querySelector(
  ".controls__buttonGroup--addFrame"
);
const clearFrameButton = document.querySelector(
  ".controls__button--clearFrames"
);

/**
 * Injects a frame into the document
 */
const injectFrame = (event) => {
  event.preventDefault();

  // Grab our inputs to get the provided values
  const urlInput = event.target.querySelector(".controls__textInput--url");
  const titleInput = event.target.querySelector(".controls__textInput--title");

  // Build our elements and inject the content
  const data = {
    url: urlInput.value,
    title: titleInput.value,
  };

  const frame = createFrame(data);

  appendFrame(data);

  frames.appendChild(frame);
};

/**
 * Bootstraps the state of the application
 */
if (getStoredIframes().length > 0) {
  getStoredIframes().forEach((storedIframe) => {
    frames.appendChild(createFrame(storedIframe));
  });
}

/**
 * Bind the add event
 */
addFrameGroup.addEventListener("submit", injectFrame);

/**
 * Bind the clear event
 */
clearFrameButton.addEventListener("click", () => {
  const dismissButtons = document.querySelectorAll(".frames__dismiss");

  dismissButtons.forEach((button) => {
    button.click();
  });
});
