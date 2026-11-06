import { booksApi } from '../api.js';
import { escapeHtml, showToast } from '../utils.js';

export async function renderBooks() {
    const app = document.getElementById('app');

    try {
        const books = await booksApi.getAll();

        app.innerHTML = `
            <section class="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-[#243B75]">Data Buku</h2>
                    <p class="text-gray-500 mt-1">Kelola koleksi buku perpustakaan.</p>
                </div>
                <button id="add-book" class="primary-button">
                    + Tambah Buku
                </button>
            </section>

            <section class="bg-white rounded-2xl shadow-sm overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-[#E8F0FF] text-[#243B75]">
                        <tr>
                            <th class="p-4">ID</th>
                            <th class="p-4">Judul</th>
                            <th class="p-4">Penulis</th>
                            <th class="p-4">Tahun</th>
                            <th class="p-4">Stok</th>
                            <th class="p-4">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${books.map(book => `
                            <tr class="border-t">
                                <td class="p-4">${book.id}</td>
                                <td class="p-4">${escapeHtml(book.judul)}</td>
                                <td class="p-4">${escapeHtml(book.penulis)}</td>
                                <td class="p-4">${book.tahun}</td>
                                <td class="p-4">${book.stok}</td>
                                <td class="p-4">
                                    <button class="edit-book text-blue-700"
                                        data-id="${book.id}">Edit</button>

                                    <button class="delete-book text-pink-600 ml-2"
                                        data-id="${book.id}">Hapus</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </section>

            <!-- Modal Buku -->
            <div id="book-modal" class="modal-overlay hidden">
                <div class="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">

                    <h3 id="modal-title"
                        class="text-xl font-bold text-[#243B75] mb-5">
                        Tambah Buku
                    </h3>

                    <form id="book-form" class="space-y-4">

                        <input type="hidden" id="book-id">

                        <div>
                            <label for="judul"
                                class="block mb-2 font-medium text-gray-700">
                                Judul Buku
                            </label>
                            <input
                                type="text"
                                id="judul"
                                class="w-full px-3 py-3 border border-[#D9E2F5] rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F4A6C1]"
                                placeholder="Masukkan judul buku"
                                required>
                        </div>

                        <div>
                            <label for="penulis"
                                class="block mb-2 font-medium text-gray-700">
                                Penulis
                            </label>
                            <input
                                type="text"
                                id="penulis"
                                class="w-full px-3 py-3 border border-[#D9E2F5] rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F4A6C1]"
                                placeholder="Masukkan nama penulis"
                                required>
                        </div>

                        <div>
                            <label for="tahun"
                                class="block mb-2 font-medium text-gray-700">
                                Tahun
                            </label>
                            <input
                                type="number"
                                id="tahun"
                                min="1"
                                class="w-full px-3 py-3 border border-[#D9E2F5] rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F4A6C1]"
                                placeholder="Masukkan tahun terbit"
                                required>
                        </div>

                        <div>
                            <label for="stok"
                                class="block mb-2 font-medium text-gray-700">
                                Stok
                            </label>
                            <input
                                type="number"
                                id="stok"
                                min="0"
                                class="w-full px-3 py-3 border border-[#D9E2F5] rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F4A6C1]"
                                placeholder="Masukkan jumlah stok"
                                required>
                        </div>

                        <div class="flex justify-end gap-3 pt-3">
                            <button type="button" id="cancel-modal"
                                class="cancel-button">
                                Batal
                            </button>

                            <button type="submit" class="primary-button">
                                Simpan
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        `;

        const modal = document.getElementById('book-modal');
        const form = document.getElementById('book-form');

        function closeModal() {
            modal.classList.add('hidden');
            form.reset();
            document.getElementById('book-id').value = '';
        }

        // Tambah buku
        document.getElementById('add-book').onclick = () => {
            form.reset();
            document.getElementById('modal-title').textContent = 'Tambah Buku';
            modal.classList.remove('hidden');
        };

        // Tutup modal
        document.getElementById('cancel-modal').onclick = closeModal;

        // Edit buku
        document.querySelectorAll('.edit-book').forEach(button => {
            button.onclick = () => {
                const book = books.find(
                    item => item.id == button.dataset.id
                );

                if (!book) return;

                document.getElementById('modal-title').textContent = 'Edit Buku';
                document.getElementById('book-id').value = book.id;
                document.getElementById('judul').value = book.judul;
                document.getElementById('penulis').value = book.penulis;
                document.getElementById('tahun').value = book.tahun;
                document.getElementById('stok').value = book.stok;

                modal.classList.remove('hidden');
            };
        });

        // Hapus buku
        document.querySelectorAll('.delete-book').forEach(button => {
            button.onclick = async () => {
                if (!confirm('Yakin ingin menghapus buku ini?')) return;

                try {
                    await booksApi.delete(button.dataset.id);
                    showToast('Buku berhasil dihapus');
                    await renderBooks();
                } catch (error) {
                    showToast(error.message, 'error');
                }
            };
        });

        // Simpan buku
        form.onsubmit = async event => {
            event.preventDefault();

            const id = document.getElementById('book-id').value;

            const data = {
                judul: document.getElementById('judul').value.trim(),
                penulis: document.getElementById('penulis').value.trim(),
                tahun: Number(document.getElementById('tahun').value),
                stok: Number(document.getElementById('stok').value)
            };

            try {
                if (id) {
                    await booksApi.update(id, data);
                    showToast('Buku berhasil diperbarui');
                } else {
                    await booksApi.create(data);
                    showToast('Buku berhasil ditambahkan');
                }

                await renderBooks();

            } catch (error) {
                showToast(error.message, 'error');
            }
        };

    } catch (error) {
        app.innerHTML = `
            <p class="text-red-600">
                Gagal memuat buku: ${escapeHtml(error.message)}
            </p>
        `;
    }
}
