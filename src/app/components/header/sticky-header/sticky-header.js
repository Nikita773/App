export function addStickyHeader() {
    let header = document.querySelector('.header');
    let body = document.querySelector('body');

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 150) {
            header.classList.add('sticky');
            body.style.paddingTop = '75px';
            if (window.location.href === 'http://localhost:3000/task-list') {
                document.querySelector('.menu__link--add').closest('li').classList.remove('disabled');
            }
        } else if (window.scrollY < 150) {
            header.classList.remove('sticky');
            body.style.paddingTop = '0';
            if (window.location.href === 'http://localhost:3000/task-list') {
                document.querySelector('.menu__link--add').closest('li').classList.add('disabled');
            }
        }
    });
}

export function linkManage() {
    if (window.location.href === 'http://localhost:3000/task-list') {
        document.querySelector('.menu__link--remove').closest('li').classList.remove('disabled');
    } else {
        document.querySelector('.menu__link--remove').closest('li').classList.add('disabled');
        document.querySelector('.menu__link--add').closest('li').classList.add('disabled');
    }
}