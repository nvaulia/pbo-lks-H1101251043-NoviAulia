export function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return entities[character];
    });
}

export function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');

    if (!container) return;

    const toast = document.createElement('div');

    toast.textContent = message;
    toast.className = `
        px-5 py-3 mb-3 rounded-xl shadow-lg text-white
        ${type === 'error' ? 'bg-red-500' : 'bg-[#243B75]'}
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
