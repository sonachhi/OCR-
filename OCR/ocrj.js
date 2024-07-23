document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.querySelector('.file');
    const performOcrButton = document.querySelector('.btn');
    const resultTextArea = document.querySelector('.text');
    const messageElement = document.querySelector('.msg');

    performOcrButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function() {
                const img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    messageElement.textContent = 'Performing OCR...';
                    Tesseract.recognize(img, 'eng', {
                        logger: (m) => console.log(m)
                    }).then(({ data: { text } }) => {
                        resultTextArea.value = text;
                        messageElement.textContent = 'Text extracted!';
                    }).catch((error) => {
                        console.error(error);
                        messageElement.textContent = 'OCR failed. Please try again.';
                    });
                }
            }
            reader.readAsDataURL(file);
        } else {
            messageElement.textContent = 'Please select a file first.';
        }
    });
});
