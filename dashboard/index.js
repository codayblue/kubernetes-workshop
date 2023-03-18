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
const injectFrame = async (event) => {
  event.preventDefault();

  // Grab our inputs to get the provided values
  const urlInput = event.target.querySelector(".controls__textInput--url");
  const titleInput = event.target.querySelector(".controls__textInput--title");

  // Build our elements and inject the content
  const data = {
    url: urlInput.value,
    title: titleInput.value,
  };

  const frame = await createFrame(data);

  appendFrame(data);

  frames.append(frame);
};

/**
 * Bootstraps the state of the application
 */
if (getStoredIframes().length > 0) {
  getStoredIframes().forEach(async (storedIframe) => {
    frames.append(await createFrame(storedIframe));
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

/**
 * Poll the frames for new data
 * 
 * We're nesting timeouts so stray intervals don't stay alive if something goes wrong
 */
const pollingDelay = 2 * 1000; // In miliseconds, first digit is number of seconds

const pollData = () => {
  const frameContainers = document.querySelectorAll(`.frames__container`);

  frameContainers.forEach(async (container) => {
    const { url, title } = container.dataset;
    const responseBox = container.querySelector('.frames__frame');

    try {
      if (!responseBox) {
        console.debug('old references to bad containers are being kept');

        return;
      }

      const response = await fetch(url);
      const jsonResponse = await response.json();

      responseBox.replaceChildren(
        document.createTextNode(JSON.stringify(jsonResponse, null, 2))
      );

      hljs.highlightElement(responseBox);

      setTimeout(pollData, pollingDelay);
    } catch (e) {
      console.error(`there was an issue with the API rqeuest for: ${title}`, e);
    }
  });
};

setTimeout(pollData, 1000);
