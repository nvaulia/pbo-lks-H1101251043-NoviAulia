import { renderDashboard } from './pages/dashboard.js';
import { renderBooks } from './pages/books.js';
import { renderCategories } from './pages/categories.js';

// Daftar halaman aplikasi
const pages = {
    dashboard: renderDashboard,
    books: renderBooks,
    categories: renderCategories
};

// Fungsi router untuk berpindah halaman
async function router() {
    const page = location.hash.replace('#', '') || 'dashboard';

    // Menghapus status aktif dari semua menu
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });

    // Menentukan menu yang sedang aktif
    const activeButton = document.getElementById(`nav-${page}`);

    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Menampilkan halaman sesuai menu yang dipilih
    const renderPage = pages[page] || renderDashboard;

    await renderPage();
}

// Fungsi untuk berpindah halaman melalui menu
window.showPage = function(page) {
    location.hash = page;
};

// Menjalankan router saat hash berubah
window.addEventListener('hashchange', router);

// Menampilkan halaman pertama
router();
