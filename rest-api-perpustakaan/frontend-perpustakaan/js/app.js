import { renderDashboard } from './pages/dashboard.js';
import { renderBooks } from './pages/books.js';

const pages = {
    dashboard: renderDashboard,
    books: renderBooks
};

async function router() {
    const page = location.hash.replace('#', '') || 'dashboard';

    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.getElementById(`nav-${page}`);

    if (activeButton) {
        activeButton.classList.add('active');
    }

    const renderPage = pages[page] || renderDashboard;

    await renderPage();
}

window.showPage = function(page) {
    location.hash = page;
};

window.addEventListener('hashchange', router);

router();
