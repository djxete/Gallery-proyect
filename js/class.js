
//============ FUNCTION TO GET AN ELEMENT ==================


function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
        return element;
    } else {
        throw new Error(`Please check "${selection}" selector, no such element exists`)
    }
}



//============= CLASS ======================

class Gallery {
    constructor(element) {

    //properties

        //dom elements
        this.container = element;
        this.list = [...element.querySelectorAll(".img")];
        this.modal = getElement(".modal");
        this.modalImg = getElement(".main-img");
        this.imageName = getElement(".image-name");
        this.modalImages = getElement(".modal-images");

        //buttons
        this.prevBtn = getElement(".prev-btn");
        this.nextBtn = getElement(".next-btn");
        this.closeBtn = getElement(".close-btn")

        //binds buttons
        this.closeModal = this.closeModal.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.chooseImage = this.chooseImage.bind(this);

        //addEventListener, open modal and set the main image
        this.container.addEventListener(
            "click",
            function (e) {

                if (e.target.classList.contains("img")) {

                    this.openModal(e.target, this.list);
                    this.setMainImage(e.target, this.list);

                }



            }.bind(this))

    }

    //methods

    setMainImage(selectedImage, list) {
        this.modalImg.src = selectedImage.src;
        this.imageName.textContent = selectedImage.title;
    }
    openModal(selectedImage, list) {
        this.setMainImage(selectedImage);
        this.modalImages.innerHTML = list.map(function (image) {
            return `<img 
            src="${image.src}" 
            title="${image.title}" 
            class="${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}" 
        alt="city 5 picture" 
            data-id="${image.dataset.id}">`

        }).join(" ");

        this.modal.classList.add("open");

        //event listeners buttons
        this.prevBtn.addEventListener("click", this.prevImage);
        this.closeBtn.addEventListener("click", this.closeModal);
        this.nextBtn.addEventListener("click", this.nextImage);
        this.modalImages.addEventListener("click", this.chooseImage);

    }

    closeModal() {
        this.modal.classList.remove("open");
        //remove event listeners buttons when I close the modal
        this.closeBtn.removeEventListener("click", this.closeModal);
        this.nextBtn.removeEventListener("click", this.nextImage);
        this.prevBtn.removeEventListener("click", this.prevImage);
        this.modalImages.removeEventListener("click", this.chooseImage);
    }

    nextImage() {
        const selected = this.modalImages.querySelector(".selected");
        const next = selected.nextElementSibling || this.modalImages.firstElementChild;
        selected.classList.remove("selected");
        next.classList.add("selected");
        this.setMainImage(next);
    }

    prevImage() {
        const selected = this.modalImages.querySelector(".selected");
        const prev = selected.previousElementSibling || this.modalImages.lastElementChild;
        selected.classList.remove("selected");
        prev.classList.add("selected");
        this.setMainImage(prev);
    }

    chooseImage(e) {
        if (e.target.classList.contains("modal-img")) {

            const selected = this.modalImages.querySelector(".selected");
            selected.classList.remove("selected");
            this.setMainImage(e.target);
            e.target.classList.add("selected");

        }
    }

} // end class Gallery


// ====================== INSTANCES ========================



const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
