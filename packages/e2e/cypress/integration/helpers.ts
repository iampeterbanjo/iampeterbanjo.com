export const clearServiceWorkers = () => {
	if (window.navigator && navigator.serviceWorker) {
		navigator.serviceWorker.getRegistrations().then(registrations => {
			registrations.forEach(registration => {
				registration.unregister();
			});
		});
	}
};

export const BASE_URL = 'http://localhost:8080';
