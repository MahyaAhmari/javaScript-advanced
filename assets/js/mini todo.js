const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const STORAGE_KEY = 'mini-todo-tasks';

// ===== عناصر =====
const list = document.getElementById('list');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const addBtn = document.getElementById('addBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

const editModal = document.getElementById('editModal');
const editOverlay = document.getElementById('editOverlay');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editTitle = document.getElementById('editTitle');
const editDescription = document.getElementById('editDescription');

// ===== وضعیت =====
let tasks = [];
let editingCard = null;

// ===== توابع کمکی =====
const toPersianNumber = (value) =>
    String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[digit]);

const getPersianDate = () =>
    new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date());

// ===== localStorage =====
const saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const loadTasks = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        tasks = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('خطا در خواندن تسک‌ها:', error);
        tasks = [];
    }
};

// ===== مودال =====
const openModal = (modalEl, overlayEl) => {
    modalEl.classList.replace('hidden', 'flex');
    overlayEl.classList.replace('hidden', 'flex');
};

const closeModal = (modalEl, overlayEl) => {
    modalEl.classList.replace('flex', 'hidden');
    overlayEl.classList.replace('flex', 'hidden');
};

// ===== ساخت کارت =====
function createCardElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = 'bg-white w-1/3 p-4 rounded-lg mb-2 shadow-md flex items-center justify-between';

    if (task.completed) {
        li.classList.add('opacity-50', 'line-through');
    }

    li.innerHTML = `
        <div class="h-full">
            <h3 class="text-xl font-bold mb-5 card-title">${task.title}</h3>
            <p class="card-description">${task.description}</p>
            <small class="text-gray-400">${toPersianNumber(task.createdAt)}</small>
        </div>
        <div class="h-full flex items-center gap-3">
            <button class="cursor-pointer text-lg edit-btn">
                <i class="fa-solid fa-pencil text-yellow-300"></i>
            </button>
            <button class="cursor-pointer text-lg delete-btn">
                <i class="fa-solid fa-trash-can text-red-500"></i>
            </button>
            <button class="cursor-pointer text-lg complete-btn">
                <i class="fa-solid fa-check text-green-500"></i>
            </button>
            <button class="cursor-pointer text-lg not-complete-btn">
                <i class="fa-solid fa-times text-gray-500"></i>
            </button>
        </div>
    `;
    return li;
}

// ===== رندر لیست =====
const renderTasks = () => {
    list.innerHTML = '';
    tasks.forEach((task) => list.appendChild(createCardElement(task)));
};

// ===== افزودن تسک جدید =====
addBtn.addEventListener('click', () => openModal(modal, overlay));

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!title) return;

    tasks.push({
        id: crypto.randomUUID(),
        title,
        description,
        completed: false,
        createdAt: getPersianDate(),
    });

    saveTasks();
    renderTasks();

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    closeModal(modal, overlay);
});

// ===== Event Delegation =====
list.addEventListener('click', (e) => {
    const card = e.target.closest('li');
    if (!card) return;

    const taskId = card.dataset.id;

    // ویرایش
    if (e.target.closest('.edit-btn')) {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        editingCard = card;
        editTitle.value = task.title;
        editDescription.value = task.description;
        openModal(editModal, editOverlay);
    }

    // حذف
    if (e.target.closest('.delete-btn')) {
        tasks = tasks.filter((t) => t.id !== taskId);
        saveTasks();
        card.remove();
    }

    // تکمیل
    if (e.target.closest('.complete-btn')) {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        task.completed = true;
        saveTasks();

        card.classList.add('opacity-50', 'line-through');
    }

    // لغو تکمیل
    if (e.target.closest('.not-complete-btn')) {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        task.completed = false;
        saveTasks();

        card.classList.remove('opacity-50', 'line-through');
    }
});

// ===== ذخیره ویرایش =====
saveEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!editingCard) return;

    const taskId = editingCard.dataset.id;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newTitle = editTitle.value.trim();
    const newDescription = editDescription.value.trim();
    if (!newTitle) return;

    task.title = newTitle;
    task.description = newDescription;

    editingCard.querySelector('.card-title').textContent = newTitle;
    editingCard.querySelector('.card-description').textContent = newDescription;

    saveTasks();
    editingCard = null;
    closeModal(editModal, editOverlay);
});

// ===== لغو ویرایش =====
cancelEditBtn.addEventListener('click', () => {
    editingCard = null;
    closeModal(editModal, editOverlay);
});

// ===== لغو افزودن =====
cancelBtn.addEventListener('click', () => closeModal(modal, overlay));

// ===== راه‌اندازی =====
loadTasks();
renderTasks();