export function centerHighlight(node: HTMLElement) {
	const mobileQuery = window.matchMedia('(max-width: 47.999rem)');
	let frame: number | undefined;
	let activeItem: HTMLElement | undefined;

	const clearHighlight = () => {
		activeItem?.classList.remove('is-centered');
		activeItem = undefined;
	};

	const updateHighlight = () => {
		frame = undefined;

		if (!mobileQuery.matches) {
			clearHighlight();
			return;
		}

		const viewport = window.visualViewport;
		const viewportTop = viewport?.offsetTop ?? 0;
		const viewportHeight = viewport?.height ?? window.innerHeight;
		const viewportBottom = viewportTop + viewportHeight;
		const viewportCenter = viewportTop + viewportHeight / 2;
		const items = Array.from(node.querySelectorAll<HTMLElement>('[data-center-highlight-item]'));
		const visibleItems = items.filter((item) => {
			const rect = item.getBoundingClientRect();
			return rect.bottom > viewportTop && rect.top < viewportBottom;
		});

		const closestItem = visibleItems.reduce<HTMLElement | undefined>((closest, item) => {
			if (!closest) return item;

			const itemRect = item.getBoundingClientRect();
			const closestRect = closest.getBoundingClientRect();
			const itemDistance = Math.abs(itemRect.top + itemRect.height / 2 - viewportCenter);
			const closestDistance = Math.abs(closestRect.top + closestRect.height / 2 - viewportCenter);

			return itemDistance < closestDistance ? item : closest;
		}, undefined);

		if (closestItem === activeItem) return;

		clearHighlight();
		activeItem = closestItem;
		activeItem?.classList.add('is-centered');
	};

	const requestUpdate = () => {
		if (frame === undefined) frame = requestAnimationFrame(updateHighlight);
	};

	window.addEventListener('scroll', requestUpdate, { passive: true });
	window.addEventListener('resize', requestUpdate);
	window.visualViewport?.addEventListener('resize', requestUpdate);
	window.visualViewport?.addEventListener('scroll', requestUpdate);
	mobileQuery.addEventListener('change', requestUpdate);
	requestUpdate();

	return {
		destroy() {
			window.removeEventListener('scroll', requestUpdate);
			window.removeEventListener('resize', requestUpdate);
			window.visualViewport?.removeEventListener('resize', requestUpdate);
			window.visualViewport?.removeEventListener('scroll', requestUpdate);
			mobileQuery.removeEventListener('change', requestUpdate);
			if (frame !== undefined) cancelAnimationFrame(frame);
			clearHighlight();
		}
	};
}
