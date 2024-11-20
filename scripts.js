let editRowIndex = null; // Para saber si estamos editando una fila

function addData() {
    // Obtener los valores de los inputs
    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const tuition = document.getElementById('tuition').value;
    const note = document.getElementById('note').value;

    // Esta validacion es necesaria para Verificar que los campos no estén vacíos
    if (name && lastname && tuition && note) {
        // Si editRowIndex no es null, significa que estamos editando una columna existente
        if (editRowIndex !== null) {
            // Actualizar los valores en la fila seleccionada
            const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            const row = table.rows[editRowIndex];

            row.cells[0].textContent = name;
            row.cells[1].textContent = lastname;
            row.cells[2].textContent = tuition;
            row.cells[3].textContent = note;

            // Restablecer el índice de edición y el texto del botón
            editRowIndex = null;

            Swal.fire({
                title: '¡Éxito!',
                text: 'Los datos se han guardado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            // Crear una nueva fila para la tabla
            const table = document.getElementById('data-table').getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            // Insertar las celdas en la nueva fila
            const nameCell = newRow.insertCell(0);
            const lastnameCell = newRow.insertCell(1);
            const tuitionCell = newRow.insertCell(2);
            const noteCell = newRow.insertCell(3);
            const actionCell = newRow.insertCell(4); // Para botones

            // Asignar los valores a las celdas
            nameCell.textContent = name;
            lastnameCell.textContent = lastname;
            tuitionCell.textContent = tuition;
            noteCell.textContent = note;

            // Crear botón de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = function () {
                editRow(newRow);
            };
            actionCell.appendChild(editButton);


            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = function () {
                deleteRow(newRow);
            };
            actionCell.appendChild(deleteButton);
        }

        // Limpiar los inputs
        document.getElementById('name').value = '';
        document.getElementById('lastname').value = '';
        document.getElementById('tuition').value = '';
        document.getElementById('note').value = '';
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Función editar
function editRow(row) {
    // Obtener valores de fila
    const nameCell = row.cells[0];
    const lastnameCell = row.cells[1];
    const tuitionCell = row.cells[2];
    const noteCell = row.cells[3];

    // Colocar los valores de fila los inputs
    document.getElementById('name').value = nameCell.textContent;
    document.getElementById('lastname').value = lastnameCell.textContent;
    document.getElementById('tuition').value = tuitionCell.textContent;
    document.getElementById('note').value = noteCell.textContent;

    // Guardar el índice de la fila que se está editando
    editRowIndex = row.rowIndex - 1;


    document.getElementById('addButton').textContent = 'Guardar cambios';
}
