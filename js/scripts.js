/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// 整页滚轮切换功能
(function() {
    const sections = Array.from(document.querySelectorAll('.resume-section'));
    if (sections.length === 0) return;
    let isScrolling = false;
    let currentSection = 0;
    // 初始化时定位到当前可见section
    function getCurrentSectionIndex() {
        const scrollY = window.scrollY || window.pageYOffset;
        let idx = 0;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop - 10 <= scrollY) {
                idx = i;
            }
        }
        return idx;
    }
    currentSection = getCurrentSectionIndex();
    function scrollToSection(idx) {
        if (idx < 0) idx = 0;
        if (idx >= sections.length) idx = sections.length - 1;
        isScrolling = true;
        sections[idx].scrollIntoView({behavior: 'smooth'});
        setTimeout(() => { isScrolling = false; }, 800);
        currentSection = idx;
    }
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        let delta = e.deltaY;
        if (delta > 0) {
            // 向下滚动
            if (currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
                e.preventDefault();
            }
        } else if (delta < 0) {
            // 向上滚动
            if (currentSection > 0) {
                scrollToSection(currentSection - 1);
                e.preventDefault();
            }
        }
    }, { passive: false });
    // 避免手动滚动后currentSection不同步
    window.addEventListener('scroll', function() {
        currentSection = getCurrentSectionIndex();
    });
})();
