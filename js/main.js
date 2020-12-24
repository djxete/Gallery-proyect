// alert(`testing`);

//Know what item is selected

function getElement(selection){
    const element = document.querySelector(selection);
    if(element){
        return element;
    } else{
        throw new Error(`Please check "${selection}" selector, no such element exists`)
    }
}

// Construction function

function Gallery(element){ 

    //dom elements
    this.container = element;
    this.list = [...element.querySelectorAll(".img")]; 
    this.modal = getElement(".modal"); 
    this.modalImg = getElement(".main-img"); 
    this.imageName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");
    
    //buttons
    this.prevBtn= getElement(".prev-btn");
    this.nextBtn = getElement(".next-btn");
    this.closeBtn = getElement(".close-btn")


    //addEventListener
    this.container.addEventListener(
        "click",
        function (e){
  
        if(e.target.classList.contains("img")){
            
    
            this.openModal(e.target,this.list);
            this.setMainImage(e.target,this.list);
        }
        
        

    }.bind(this))

}


// ======================= PROTOTYPES ==========================


Gallery.prototype.openModal = function (selectedImage,list){

this.modal.classList.add("open");

}


Gallery.prototype.setMainImage = function (selectedImage,list){

    let srcSelectedImg = selectedImage.getAttribute("src");
    let titleSelectedImg = selectedImage.getAttribute("title");
    
    this.modalImg.setAttribute("src",srcSelectedImg);
    this.imageName.innerHTML = titleSelectedImg;
    
}


// ====================== INSTANCES ========================



const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));












