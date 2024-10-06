const addTaskButtons = document.querySelectorAll('.add-task-btn');
        addTaskButtons.forEach(button => {
            button.addEventListener('click', function () {
                const selectedDay = this.getAttribute('data-day');
                document.getElementById('task-date').value = selectedDay;
                document.getElementById('task-form-modal').classList.remove('hidden');
            });
        });

        document.getElementById('cancel-btn').addEventListener('click', function () {
            document.getElementById('task-form-modal').classList.add('hidden');
        });

        document.getElementById('task-time').addEventListener('change', function () {
            document.getElementById('task-title').focus();
        });

        document.getElementById('new-task-form').addEventListener('submit', function (event) {
            event.preventDefault();

            const time = document.getElementById('task-time').value;
            const title = document.getElementById('task-title').value;
            const date = document.getElementById('task-date').value;
            const description = document.getElementById('task-desc').value;

            if (time && title && date) {
                // Create a new row for the task
                const taskTableBody = document.getElementById('task-table-body');
                const newRow = document.createElement('tr');
                newRow.classList.add('task-row');

                // Create cells for each day
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                days.forEach(day => {
                    const cell = document.createElement('td');
                    cell.classList.add('border', 'border-gray-500', 'px-4', 'py-2', 'task-cell');
                    cell.setAttribute('data-day', day);

                    // Add task content only to the matching day
                    if (day === date) {
                        cell.innerHTML = `
                            <div class="font-medium">${title}</div>
                            <div class="text-sm text-gray-600">${time}</div>
                            <div class="text-sm text-gray-500">${description}</div>
                        `;
                    }

                    newRow.appendChild(cell);
                });

                // Insert the new row before the button row
                const buttonRow = taskTableBody.lastElementChild;
                taskTableBody.insertBefore(newRow, buttonRow);

                // Clear form and close modal
                document.getElementById('new-task-form').reset();
                document.getElementById('task-form-modal').classList.add('hidden');

                // Show success message
                const successMessage = document.getElementById('success-message');
                successMessage.classList.remove('hidden', 'opacity-0');
                successMessage.classList.add('opacity-100');

                setTimeout(() => {
                    successMessage.classList.remove('opacity-100');
                    successMessage.classList.add('opacity-0');
                }, 3000);
            }
        });