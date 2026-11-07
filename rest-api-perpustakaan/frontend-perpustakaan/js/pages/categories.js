
import { categoriesApi } from '../api.js';
import { escapeHtml, showToast } from '../utils.js';

const categoryOptions = {
    'Fiksi': 'Buku cerita, novel, dan karya imajinatif.',
    'Non-Fiksi': 'Buku berdasarkan fakta dan pengetahuan.',
    'Sastra': 'Buku sastra klasik, puisi, dan karya sastra.',
    'Teknologi': 'Buku teknologi, komputer, dan pemrograman.',
    'Pendidikan': 'Buku pembelajaran dan materi pendidikan.',
    'Sejarah': 'Buku sejarah dan peristiwa masa lalu.',
    'Biografi': 'Buku tentang kisah hidup seseorang.',
    'Komik': 'Buku cerita bergambar dan komik.'
};

export async function renderCategories() {
    const app = document.getElementById('app');

    try {
        const categories = await categoriesApi.getAll();

        const categoryRows = categories.map(category => `
            <tr class="border-t">
                <td class="p-4">${category.id}</td>
                <td class="p-4 font-medium text-[#243B75]">
                    ${escapeHtml(category.nama)}
                </td>
                <td class="p-4">
                    ${escapeHtml(category.deskripsi || '-')}
                </td>
                <td class="p-4 whitespace-nowrap">
                    <button
                        class="edit-category text-blue-700"
                        data-id="${category.id}">
                        Edit
                    </button>

                    <button
                        class="delete-category text-pink-600 ml-2"
                        data-id="${category.id}">
                        Hapus
                    </button>
                </td>
            </tr>
        `).join('');

        app.innerHTML = `
            <section class="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-[#243B75]">
                        Data Kategori
                    </h2>
                    <p class="text-gray-500 mt-1">
                        Kelola kategori buku perpustakaan.
                    </p>
                </div>

                <button id="add-category" class="primary-button">
                    + Tambah Kategori
                </button>
            </section>

            <section class="bg-white rounded-2xl shadow-sm overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-[#E8F0FF] text-[#243B75]">
                        <tr>
                            <th class="p-4">ID</th>
                            <th class="p-4">Nama Kategori</th>
                            <th class="p-4">Deskripsi</th>
                            <th class="p-4">Aksi</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${categoryRows || `
                            <tr>
                                <td colspan="4" class="p-6 text-center text-gray-500">
                                    Belum ada kategori.
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </section>

            <!-- Modal Kategori -->
            <div id="category-modal" class="modal-overlay hidden">
                <div class="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">

                    <h3 id="category-modal-title"
                        class="text-xl font-bold text-[#243B75] mb-5">
                        Tambah Kategori
                    </h3>

                    <form id="category-form" class="space-y-4">
                        <input type="hidden" id="category-id">

                        <div>
                            <label for="category-name"
                                class="block mb-2 font-medium text-gray-700">
                                Pilih Nama Kategori
                            </label>

                            <select
                                id="category-name"
                                class="w-full px-3 py-3 border border-[#D9E2F5] rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F4A6C1]"
                                required>

                                <option value="">-- Pilih Kategori --</option>

                                ${Object.keys(categoryOptions)
                                    .map(name => `
                                        <option value="${escapeHtml(name)}">
                                            ${escapeHtml(name)}
                                        </option>
                                    `).join('')}
                            </select>
                        </div>

                        <div>
                            <label for="category-description"
                                class="block mb-2 font-medium text-gray-700">
                                Deskripsi Kategori
                            </label>

                            <textarea
                                id="category-description"
                                rows="3"
                                class="w-full px-3 py-3 border border-[#D9E2F5] rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F4A6C1]"
                                placeholder="Deskripsi akan terisi otomatis"
                            ></textarea>
                        </div>

                        <div class="flex justify-end gap-3 pt-3">
                            <button
                                type="button"
                                id="cancel-category"
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

        const modal = document.getElementById('category-modal');
        const form = document.getElementById('category-form');
        const nameInput = document.getElementById('category-name');
        const descriptionInput =
            document.getElementById('category-description');

        function closeModal() {
            modal.classList.add('hidden');
            form.reset();
            document.getElementById('category-id').value = '';
        }

        // Isi deskripsi otomatis berdasarkan pilihan
        nameInput.addEventListener('change', () => {
            descriptionInput.value =
                categoryOptions[nameInput.value] || '';
        });

        // Tambah kategori
        document.getElementById('add-category').onclick = () => {
            form.reset();
            document.getElementById('category-id').value = '';

            document.getElementById('category-modal-title').textContent =
                'Tambah Kategori';

            // Sembunyikan pilihan yang sudah ada
            Array.from(nameInput.options).forEach(option => {
                if (!option.value) return;

                const alreadyExists = categories.some(
                    category =>
                        category.nama.toLowerCase() === option.value.toLowerCase()
                );

                option.disabled = alreadyExists;
            });

            modal.classList.remove('hidden');
        };

        // Tutup modal
        document.getElementById('cancel-category').onclick = closeModal;

        // Edit kategori
        document.querySelectorAll('.edit-category').forEach(button => {
            button.onclick = () => {
                const category = categories.find(
                    item => item.id == button.dataset.id
                );

                if (!category) return;

                form.reset();

                document.getElementById('category-modal-title').textContent =
                    'Edit Kategori';

                document.getElementById('category-id').value = category.id;

                // Aktifkan pilihan yang sedang diedit
                Array.from(nameInput.options).forEach(option => {
                    option.disabled = false;
                });

                if (!Array.from(nameInput.options).some(
                    option => option.value === category.nama
                )) {
                    nameInput.add(new Option(category.nama, category.nama));
                }

                nameInput.value = category.nama;
                descriptionInput.value = category.deskripsi || '';

                modal.classList.remove('hidden');
            };
        });

        // Hapus kategori
        document.querySelectorAll('.delete-category').forEach(button => {
            button.onclick = async () => {
                if (!confirm('Yakin ingin menghapus kategori ini?')) return;

                try {
                    await categoriesApi.delete(button.dataset.id);
                    showToast('Kategori berhasil dihapus');
                    await renderCategories();
                } catch (error) {
                    showToast(error.message, 'error');
                }
            };
        });

        // Simpan kategori
        form.onsubmit = async event => {
            event.preventDefault();

            const id = document.getElementById('category-id').value;

            const data = {
                nama: nameInput.value,
                deskripsi: descriptionInput.value.trim()
            };

            try {
                if (id) {
                    await categoriesApi.update(id, data);
                    showToast('Kategori berhasil diperbarui');
                } else {
                    await categoriesApi.create(data);
                    showToast('Kategori berhasil ditambahkan');
                }

                await renderCategories();

            } catch (error) {
                showToast(error.message, 'error');
            }
        };

    } catch (error) {
        app.innerHTML = `
            <p class="text-red-600">
                Gagal memuat kategori: ${escapeHtml(error.message)}
            </p>
        `;
    }
}
