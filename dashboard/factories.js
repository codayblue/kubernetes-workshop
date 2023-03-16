import { deleteFrame } from "./storage.js";

/**
 * When called deletes a frame from the DOM and State
 */
const removeFrame = ({ target }) => {
  const title = target.parentNode.querySelector(".frames__title");
  const titleText = title.textContent;

  deleteFrame(titleText);

  target.parentNode.remove();
};

/**
 * Creates a frame and returns the document node for use
 */
export const createFrame = ({ url, title }) => {
  const listItem = document.createElement("li");

  listItem.classList.add("frames__container");

  const button = document.createElement("button");

  button.classList.add("frames__dismiss");

  button.addEventListener("click", removeFrame);

  const iframe = document.createElement("iframe");

  iframe.classList.add("frames__frame");
  iframe.setAttribute("src", url);
  iframe.setAttribute("frameborder", "0");

  const titleElement = document.createElement("h1");

  titleElement.classList.add("frames__title");
  titleElement.appendChild(document.createTextNode(title));

  listItem.appendChild(button);
  listItem.appendChild(iframe);
  listItem.appendChild(titleElement);

  return listItem;
};
