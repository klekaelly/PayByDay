document.addEventListener('DOMContentLoaded', function () {
    // Sidebar resizer code
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
            document.getElementById('main').style.marginLeft = newWidth + 'px';
        }
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }

    // Inline editing logic
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function () {
            const row = this.closest('tr');
            row.querySelectorAll('span.editable').forEach(span => {
                span.classList.add('d-none');
            });
            row.querySelectorAll('input').forEach(input => {
                input.classList.remove('d-none');
            });
            row.querySelector('.edit-btn').classList.add('d-none');
            row.querySelector('.save-btn').classList.remove('d-none');
        });
    });

    document.querySelectorAll('.save-btn').forEach(button => {
        button.addEventListener('click', async function () {
            const row = this.closest('tr');
            const id = row.getAttribute('data-id');
            const expense = {
                Id: id,
                Name: row.querySelector('input[type="text"]').value,
                Date: row.querySelector('input[type="date"]').value,
                Amount: parseFloat(row.querySelector('input[type="number"]').value)
            };

            // Send AJAX request to update the expense
            const response = await fetch(`/Expenses/EditExpense/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
                },
                body: JSON.stringify(expense)
            });

            if (response.ok) {
                // Update the table view
                row.querySelector('span[data-field="Name"]').innerText = expense.Name;
                row.querySelector('span[data-field="Date"]').innerText = expense.Date;
                row.querySelector('span[data-field="Amount"]').innerText = expense.Amount.toFixed(2);

                row.querySelectorAll('span.editable').forEach(span => {
                    span.classList.remove('d-none');
                });
                row.querySelectorAll('input').forEach(input => {
                    input.classList.add('d-none');
                });
                row.querySelector('.edit-btn').classList.remove('d-none');
                row.querySelector('.save-btn').classList.add('d-none');
            } else {
                alert('Failed to save changes. Please try again.');
            }
        });
    });

    // Bootstrap tab initialization code
    var triggerTabList = [].slice.call(document.querySelectorAll('#tabs button'))
    triggerTabList.forEach(function(triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', function(event) {
            event.preventDefault()
            tabTrigger.show()
        })
    });
});
