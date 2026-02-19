let observer: IntersectionObserver;

function getObserver() {
    if (observer) return observer;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    return observer;
}

export function scrollAnimate(node: HTMLElement) {
    getObserver().observe(node);

    return {
        destroy() {
            if (observer) {
                observer.unobserve(node);
            }
        }
    };
}
