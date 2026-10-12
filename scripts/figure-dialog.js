(() => {
  const dialog = document.querySelector(".figure-dialog");
  const image = dialog.querySelector(".expanded-figure");
  const title = dialog.querySelector("#figure-title");

  document.querySelectorAll(".figure-button").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.image;
      image.alt = button.querySelector("img").alt;
      title.textContent = button.dataset.title;
      dialog.showModal();
    });
  });

  dialog.querySelector(".close-dialog").addEventListener("click", () => {
    dialog.close();
  });

  // A click outside the dialog bounds is a click on its backdrop.
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (outside) dialog.close();
  });
})();
