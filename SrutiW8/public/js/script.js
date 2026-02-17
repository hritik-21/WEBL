document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const statusMsg = document.getElementById('statusMsg');
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;

    try {
        statusMsg.textContent = 'Blooming...';
        const response = await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, price })
        });

        if (response.ok) {
            statusMsg.textContent = '✨ Petal added to registry!';
            document.getElementById('itemForm').reset();
            fetchItems();
        } else {
            const data = await response.json();
            statusMsg.textContent = '❌ Error: ' + (data.error || 'Check database connection');
        }
    } catch (err) {
        statusMsg.textContent = '❌ Connection failed. Is MongoDB running?';
    }
});

async function fetchItems() {
    const itemStack = document.getElementById('itemStack');
    const itemCount = document.getElementById('itemCount');

    try {
        // Check connection status
        const statusRes = await fetch('/api/status');
        const status = await statusRes.json();
        const headerP = document.querySelector('.header-section p');

        if (!status.connected) {
            headerP.innerHTML = '✨ Running in <strong>Preview Mode</strong> (Mock Data)';
            headerP.style.color = 'var(--lavender)';
        } else {
            headerP.textContent = 'Database-powered collection with soft touches.';
            headerP.style.color = 'var(--text-soft)';
        }

        const response = await fetch('/api/items');
        const items = await response.json();

        if (items.length === 0) {
            itemStack.innerHTML = `<div class="empty-cloud"><p>Your garden is waiting to grow...</p></div>`;
        } else {
            itemStack.innerHTML = items.map(item => `
                <div class="item-chip">
                    <div class="chip-main">
                        <h3>${item.name}</h3>
                        <span class="chip-cat">${item.category}</span>
                    </div>
                    <div class="chip-price">$${Number(item.price).toFixed(2)}</div>
                </div>
            `).join('');
        }
        itemCount.textContent = `${items.length} items`;
    } catch (err) {
        itemStack.innerHTML = `<div class="empty-cloud"><p>Unable to reach the garden. 🥀</p></div>`;
    }
}

// Initial fetch
fetchItems();
