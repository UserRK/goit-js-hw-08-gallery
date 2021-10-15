const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryEl = document.querySelector('.gallery');
const modalEL = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const modalOverlay = document.querySelector('.lightbox__overlay');
const imgModal = document.querySelector(".lightbox__image");
const sources = galleryItems.map(element => element.original);

galleryEl.addEventListener('click', onGalleryImgClick);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', onModalOverlayClick);

function createItemsGallery (gallery) {
  return gallery.map(({ preview, original, description }) => {
  return `<li class = "gallery__item">
   <a class="gallery__link" href=${original}>
   <img src=${preview} alt=${description} data-source="${original}" class = "gallery__image">
   </a>
   </li>`;
}).join('');
 }

galleryEl.insertAdjacentHTML('beforeend', createItemsGallery(galleryItems));

function onGalleryImgClick(event) {
  event.preventDefault();
  
  if (!event.target.classList.contains("gallery__image")) {
    return;
  };

  openModal(event);
};
 
function openModal(event) {
  window.addEventListener('keydown', onEscCloseModal);
  document.addEventListener('keydown', imageSlice);
  modalEL.classList.add('is-open')
  openImgModal(event);
};

function openImgModal(event){
  
  if (!(imgModal.src === "")) {
    imgModal.src = "";
  };

  imgModal.src = event.target.dataset.source;
};
 
function closeModal() {
  window.removeEventListener('keydown', onEscCloseModal);
  document.removeEventListener('keydown', imageSlice);
    modalEL.classList.remove('is-open');
};

function onModalOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  };
};

function onEscCloseModal(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

function imageSlice(event) {
  const currentIndex = sources.indexOf(imgModal.src);
  if (event.key === "ArrowLeft") {
    leftClick(currentIndex);
  } else if (event.key === "ArrowRight") {
    rightClick(currentIndex);
  };
};

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex == -1) {
    nextIndex = sources.length - 1;
  }
  imgModal.src = sources[nextIndex];
};

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex == sources.length) {
    nextIndex = 0;
  }
  imgModal.src = sources[nextIndex];
};