document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const resizer = document.createElement('div');
    resizer.className = 'resizer-handle';
    sidebar.appendChild(resizer);

    // Existing mousedown event
    resizer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        window.addEventListener('mousemove', resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }, false);

    // Add double-click event to reset the sidebar width
    resizer.addEventListener('dblclick', function() {
        sidebar.style.width = '';
    });

    function resize(e) {
        const newWidth = e.clientX - sidebar.getBoundingClientRect().left;
        if (newWidth > 150 && newWidth < window.innerWidth - 100) {
            sidebar.style.width = newWidth + 'px';
        }
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
});
