//MODAL
const  modal = document.querySelector('.modal')
const modalTriggerBtn = document.querySelector('#btn-get')
const modalCloseBtn = document.querySelector('.modal_close')

const openModal = ()=>{
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
}

const closeModal= ()=>{
    modal.style.display = 'none'
    document.body.style.overflow=''
}

modalTriggerBtn.onclick = ()=>openModal()
modalCloseBtn.onclick = ()=>closeModal()

modal.onclick = (event)=>{
    if (event.target===modal){
        closeModal()
    }
}



let modalShown = false;

window.addEventListener('scroll', function showModalOnScroll() {
    const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

    if (scrolledToBottom && !modalShown) {
        openModal();
        modalShown = true;
        window.removeEventListener('scroll', showModalOnScroll);
    }
});

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!modalShown) {
            openModal();
            modalShown = true;
        }
    }, 10000); // 10 seconds in milliseconds
});
