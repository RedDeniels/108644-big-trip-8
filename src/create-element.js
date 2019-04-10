const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  if (newElement.childNodes.length === 1) {
    return newElement.firstChild;
  } else {
    Array.from(newElement.childNodes).forEach(function (item) {
      newElement.appendChild(item);
    });
    return newElement;
  }
};

export {createElement};
