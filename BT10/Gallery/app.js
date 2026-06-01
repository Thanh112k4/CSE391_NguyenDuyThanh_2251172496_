const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
const trigger = document.getElementById("load-trigger");

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeBtn");

let page = 1;
let isLoading = false;

async function loadPhotos() {
    if (isLoading) return;

    isLoading = true;
    loading.style.display = "block";

    try {
        const response = await fetch(
            `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        const photos = await response.json();

        renderPhotos(photos);

        page++;
    } catch (error) {
        console.error("Lỗi:", error);
        loading.textContent = "Không thể tải dữ liệu!";
    }

    loading.style.display = "none";
    isLoading = false;
}

function renderPhotos(photos) {

    photos.forEach(photo => {

        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");

        // Lazy Loading
        img.dataset.src = photo.download_url;
        img.alt = photo.author;

        const title = document.createElement("p");
        title.textContent = photo.author;

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener("click", () => {
            openModal(photo.download_url);
        });

        gallery.appendChild(card);

        imageObserver.observe(img);
    });
}

// Lazy Loading Images
const imageObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const img = entry.target;

            img.src = img.dataset.src;

            imageObserver.unobserve(img);
        }
    });

}, {
    threshold:0.1
});

// Infinite Scroll
const scrollObserver = new IntersectionObserver(entries => {

    if(entries[0].isIntersecting){
        loadPhotos();
    }

},{
    threshold:1
});

scrollObserver.observe(trigger);

// Modal
function openModal(src){
    modal.style.display = "flex";
    modalImage.src = src;
}

function closeModal(){
    modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if(e.target === modal){
        closeModal();
    }
});

// Load lần đầu
loadPhotos();