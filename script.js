const photos = [
  "06635FF0-D047-401B-84DE-08A9081FD7B9.jpg",
  "0EA17F0D-CF31-4706-82FE-2268D98B37BA.jpg",
  "1AC1CF07-7C8A-4F1A-A674-6B96BA4EAFC1.jpg",
  "23FB9DDF-616C-4C20-A9F3-475FB8A3AD28.jpg",
  "3C4C6BC5-EFD8-42CC-97E2-2E2A6FB96AD4.jpg",
  "4C944832-21BA-4EDD-BDAC-3E7338CF52A0.jpg",
  "5CFF9E91-2177-468D-87D5-CBD5B5ED0920.jpg",
  "6690BD07-0A0B-48B5-92B4-B078E3321AA8.jpg",
  "7DDB6FB9-F79B-4CB1-84B3-B6058BDB2DEA.jpg",
  "7F15D65D-EC43-4736-9512-A0D1FC5CE153.jpg",
  "834FF94F-299D-4CE3-B556-B80C2754559C.jpg",
  "A1CDF8CC-8AB8-4969-9353-762D465989F1.jpg",
  "A887189B-0B6B-4082-AC19-8D4851809E0E.jpg",
  "B2C8EA6F-21FC-4F2F-8D1D-045F1E1FC5A3.jpg",
  "B761311C-0578-48A1-84D2-AA6ACB738327.jpg",
  "C5DFDA77-8218-4105-9F83-8F2DB690579A.jpg",
  "C9905731-F984-4C39-8163-596E41D8D361.jpg",
  "EE5D8555-243A-43C3-AA44-2A0B75A9FD1C.jpg",
  "F1152963-1F2A-42C8-8849-C19BA9E12385.jpg",
  "FA22B183-4742-4B91-9407-0EA501C7B6E0.jpg"
];

const thumbnailDir = "thumbs";

const photoDescriptions = [
  "This side yard is basically our tool and compost zone.",
  "Tomato jungle. First green tomato showed up here.",
  "Our owl stake that watches the garden like a security guard.",
  "Deck flower box in late-day sun.",
  "Rain barrel by the stairs where we fill watering cans.",
  "Purple and white flowers that make this side way less boring.",
  "Our grill spot, especially busy on weekend dinners.",
  "Practice net on the lawn for quick reps.",
  "Pepper plants in grow bags, doing better than we thought.",
  "Heat pump on the wall, always low-key humming.",
  "Smoker by the shed, ready for backyard cook days.",
  "Old cracked lizard pot. Still keeping it.",
  "More green tomatoes, not ready yet but close.",
  "Back shed where most of our random backyard stuff ends up.",
  "Cucumber vine climbing up with lettuce below.",
  "Table area where our family sits and hangs out.",
  "Jalapenos finally getting bigger.",
  "Another rain barrel and pepper plant angle.",
  "Hose reel on the wall, used almost every day.",
  "Small cedar by the fence, with the swing set behind it."
];

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const topButton = document.getElementById("backToTop");
let currentPhotoIndex = 0;

function getPhotoDescription(index) {
  return photoDescriptions[index] || `Backyard photo ${index + 1}`;
}

function getThumbnailPath(fileName) {
  return `${thumbnailDir}/${fileName}`;
}

function buildGallery() {
  if (!gallery) return;

  const frag = document.createDocumentFragment();

  photos.forEach((fileName, index) => {
    const card = document.createElement("figure");
    card.className = "photo-card";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.src = encodeURI(getThumbnailPath(fileName));
    img.alt = getPhotoDescription(index);
    img.loading = "lazy";
    img.decoding = "async";

    const caption = document.createElement("figcaption");
    caption.textContent = getPhotoDescription(index);

    img.addEventListener("error", () => {
      card.classList.add("broken");
      img.src = encodeURI(fileName);
      caption.textContent = `Could not load thumbnail for ${fileName}. Showing original image.`;
    });

    card.addEventListener("click", () => openLightbox(index));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });

    card.append(img, caption);
    frag.appendChild(card);
  });

  gallery.appendChild(frag);
}

function openLightbox(index) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  currentPhotoIndex = index;
  const fileName = photos[currentPhotoIndex];
  const description = getPhotoDescription(currentPhotoIndex);

  lightboxImage.src = encodeURI(fileName);
  lightboxCaption.textContent = `${description} (${currentPhotoIndex + 1} of ${photos.length})`;

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function showRelativePhoto(step) {
  if (!lightbox || !lightbox.open || photos.length === 0) return;

  currentPhotoIndex = (currentPhotoIndex + step + photos.length) % photos.length;
  openLightbox(currentPhotoIndex);
}

function setupLightboxNavigation() {
  if (!lightbox || !lightboxPrev || !lightboxNext) return;

  lightboxPrev.addEventListener("click", () => showRelativePhoto(-1));
  lightboxNext.addEventListener("click", () => showRelativePhoto(1));

  window.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showRelativePhoto(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showRelativePhoto(1);
    }
  });
}

function setupBackToTop() {
  if (!topButton) return;

  const toggle = () => {
    if (window.scrollY > 380) {
      topButton.classList.add("show");
    } else {
      topButton.classList.remove("show");
    }
  };

  window.addEventListener("scroll", toggle);
  toggle();

  topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

buildGallery();
setupLightboxNavigation();
setupBackToTop();
