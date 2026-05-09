document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emailForm');
    const responseDiv = document.getElementById('response');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                responseDiv.className = 'success';
                responseDiv.textContent = 'Письмо успешно отправлено!';
                form.reset();
            } else {
                responseDiv.className = 'error';
                responseDiv.textContent = 'Ошибка: ' + data.message;
            }
        })
        .catch(error => {
            responseDiv.className = 'error';
            responseDiv.textContent = 'Произошла ошибка при отправке: ' + error;
        });
    });
});