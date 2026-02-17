document.getElementById('discoveryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formMsg = document.getElementById('formMsg');
    const name = document.getElementById('name').value;
    const depth = document.getElementById('depth').value;
    const zone = document.getElementById('zone').value;

    try {
        formMsg.textContent = 'Transmitting...';
        const res = await fetch('/api/discoveries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, depth, zone })
        });

        if (res.ok) {
            formMsg.textContent = '✔️ Signal Logged Successfully';
            document.getElementById('discoveryForm').reset();
            fetchLogs();
        } else {
            const data = await res.json();
            formMsg.textContent = '❌ Transmission Failed: ' + (data.error || 'Unknown');
        }
    } catch (err) {
        formMsg.textContent = '❌ Out of Range: Server Unreachable';
    }
});

async function fetchLogs() {
    const logStack = document.getElementById('logStack');
    const logCount = document.getElementById('logCount');
    const statusHeader = document.getElementById('connectionStatus');

    try {
        // Status Check
        const sRes = await fetch('/api/status');
        const status = await sRes.json();
        if (status.connected) {
            statusHeader.textContent = '🛰️ Connected to Azure Satellite Database';
            statusHeader.style.color = '#00F2FF';
        } else {
            statusHeader.textContent = '📡 Running in Simulation Mode (Local Only)';
            statusHeader.style.color = '#8892B0';
        }

        const res = await fetch('/api/discoveries');
        const data = await res.json();

        if (data.length === 0) {
            logStack.innerHTML = '<div class="azure-card"><p>No transmissions detected in this sector.</p></div>';
        } else {
            logStack.innerHTML = data.map(item => `
                <div class="log-item">
                    <div class="log-main">
                        <h3>${item.name}</h3>
                        <div class="log-meta">
                            <span class="zone-tag">${item.zone}</span>
                            <span class="depth-tag">${item.depth}m Depth</span>
                        </div>
                    </div>
                    <div class="log-time">${new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
            `).join('');
        }
        logCount.textContent = `${data.length} ENTRIES`;
    } catch (err) {
        logStack.innerHTML = '<div class="azure-card"><p>Signal Lost. Reconnect to Deep Sea Node.</p></div>';
    }
}

fetchLogs();
