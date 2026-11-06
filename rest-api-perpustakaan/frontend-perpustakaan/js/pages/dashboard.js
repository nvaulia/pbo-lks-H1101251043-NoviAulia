import { booksApi, categoriesApi } from '../api.js';
import { escapeHtml } from '../utils.js';

export async function renderDashboard() {
    const app = document.getElementById('app');

    try {
        const [books, categories] = await Promise.all([
            booksApi.getAll(),
            categoriesApi.getAll()
        ]);

        const latestBooks = books.slice(0, 5);

        app.innerHTML = `
            <section class="mb-8">
                <h2 class="text-2xl font-bold text-[#243B75]">
                    Dashboard
                </h2>

                <p class="text-gray-500 mt-1">
                    Ringkasan informasi perpustakaan.
                </p>
            </section>

            <section class="grid md:grid-cols-2 gap-6 mb-8">

                <div class="stat-card">
                    <p class="text-gray-500">Total Buku</p>

                    <h3 class="text-4xl font-bold text-[#243B75] mt-3">
                        ${books.length}
                    </h3>

                    <p class="text-sm text-gray-400 mt-2">
                        Jumlah seluruh koleksi buku
                    </p>
                </div>

                <div class="stat-card pink-card">
                    <p class="text-gray-500">Total Kategori</p>

                    <h3 class="text-4xl font-bold text-pink-600 mt-3">
                        ${categories.length}
                    </h3>

                    <p class="text-sm text-gray-400 mt-2">
                        Jumlah kategori buku
                    </p>
                </div>

            </section>

            <section class="bg-white rounded-2xl shadow-sm p-6">

                <div class="flex justify-between items-center mb-5">
                    <div>
                        <h3 class="text-xl font-bold text-[#243B75]">
                            5 Buku Terbaru
                        </h3>

                        <p class="text-sm text-gray-500 mt-1">
                            Daftar koleksi buku perpustakaan.
                        </p>
                    </div>
                </div>

                ${
                    latestBooks.length > 0
                    ? `
                        <div class="overflow-x-auto">
                            <table class="w-full text-left">

                                <thead class="bg-[#E8F0FF] text-[#243B75]">
                                    <tr>
                                        <th class="p-3">ID</th>
                                        <th class="p-3">Judul Buku</th>
                                        <th class="p-3">Penulis</th>
                                        <th class="p-3">Tahun</th>
                                        <th class="p-3">Stok</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    ${latestBooks.map(book => `
                                        <tr class="border-t hover:bg-[#FFF0F5]">
                                            <td class="p-3">${book.id}</td>

                                            <td class="p-3 font-medium text-[#243B75]">
                                                ${escapeHtml(book.judul)}
                                            </td>

                                            <td class="p-3">
                                                ${escapeHtml(book.penulis)}
                                            </td>

                                            <td class="p-3">
                                                ${book.tahun}
                                            </td>

                                            <td class="p-3">
                                                ${book.stok}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>

                            </table>
                        </div>
                    `
                    : `
                        <p class="text-gray-500 text-center py-8">
                            Belum ada data buku.
                        </p>
                    `
                }

            </section>
        `;

    } catch (error) {
        app.innerHTML = `
            <div class="bg-white rounded-2xl p-8 text-center">

                <h3 class="text-xl font-bold text-red-600">
                    Gagal Memuat Dashboard
                </h3>

                <p class="text-gray-500 mt-2">
                    ${escapeHtml(error.message)}
                </p>

            </div>
        `;
    }
}
