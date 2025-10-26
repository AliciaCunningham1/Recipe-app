const menuItems = [];
let allCategories = new Set();
let activeCategory = null;

document.getElementById('menuForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('menuName').value.trim();
    const categoriesInput = document.getElementById('categories').value;
    const description = document.getElementById('description').value.trim();

    if (!name || !categoriesInput || !description) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    const itemCategories = categoriesInput
        .split(',')
        .map(category => category.trim().toLowerCase())
        .filter(category => category !== "");

    const newItem = { name, categories: itemCategories, description };
    const { categories } = newItem;

    menuItems.push(newItem);
    allCategories = new Set([...allCategories, ...categories]);

    updateCategoryLinks();
    displayMenuItems(menuItems);
    event.target.reset();
});

const displayMenuItems = (items) => {
    const menuContainer = document.getElementById('menuContainer');

    if (items.length === 0) {
        menuContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">No menu items found for this category.</p>
            </div>
        `;
        return;
    }

    menuContainer.innerHTML = items.map(({ name, categories, description }) => `
        <div class="col-md-4">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p><strong>Categories:</strong> 
                        ${categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).join(', ')}
                    </p>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `).join('');
};

const updateCategoryLinks = () => {
    const categoryLinksContainer = document.getElementById('categoryLinks');
    categoryLinksContainer.innerHTML = [...allCategories].map(category => `
        <button 
            class="btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2" 
            onclick="filterByCategory('$
