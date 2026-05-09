let observer: IntersectionObserver;

function getObserver() {
    if (observer) return observer;

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    return observer;
}

export function scrollReveal(node: HTMLElement) {
    getObserver().observe(node);

    return {
        destroy() {
            if (observer) {
                observer.unobserve(node);
            }
        }
    };
}
