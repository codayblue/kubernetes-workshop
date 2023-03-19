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
export const createFrame = async ({ url, title }) => {
  const listItem = document.createElement("li");

  listItem.dataset.url = url;
  listItem.dataset.title = title;

  listItem.classList.add("frames__container");

  const button = document.createElement("button");

  button.classList.add("frames__dismiss");

  button.addEventListener("click", removeFrame);

  const responseBox = document.createElement("pre");

  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();

    responseBox.classList.add("frames__frame");

    responseBox.appendChild(
      document.createTextNode(JSON.stringify(jsonResponse, null, 2))
    );

    hljs.highlightElement(responseBox);
  } catch (e) {
    alert('there was a problem retreiving your endpoint');

    console.error(e);
  }

  const titleElement = document.createElement("h1");

  titleElement.classList.add("frames__title");
  titleElement.appendChild(document.createTextNode(title));

  listItem.appendChild(button);
  listItem.appendChild(responseBox);
  listItem.appendChild(titleElement);

  return listItem;
};
