// Steps add a modal to the dom
const showModal = function () {
  const overlayEl = document.getElementById('overlay');
  overlayEl.classList.replace('overlay_hidden', 'overlay_show');

  setTimeout(() => {
    overlayEl.firstElementChild.classList.toggle('modal');
  }, 500);
};

// Handle modal closing
const closeModal = function (ovEl, bookingBtnEL) {
  return function () {
    ovEl.firstElementChild.classList.toggle('modal');
    ovEl.classList.replace('overlay_show', 'overlay_hidden');

    bookingBtnEL.textContent = 'Book Tour Now!';
  };
};

export { showModal as default, closeModal };
