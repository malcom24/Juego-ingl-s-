        // Objeto para almacenar el texto original de los elementos
        const originalTexts = new Map();

        // Variable para rastrear el estado de la lectura
        let isReading = false;
        let isPaused = false;
        let currentUtterance = null;

        // Función para leer el post
        function readPost() {
            if (!window.speechSynthesis) {
                alert('Tu navegador no soporta la síntesis de voz. Usa Chrome, Firefox o Edge.');
                return;
            }

            // Si ya está leyendo, no iniciar una nueva lectura
            if (isReading && !isPaused) {
                return;
            }

            // Si está pausado, reanudar en lugar de iniciar nueva lectura
            if (isPaused) {
                window.speechSynthesis.resume();
                isPaused = false;
                document.getElementById('pauseResumeBtn').textContent = 'Pausar ⏸️';
                return;
            }

            // Cancelar cualquier lectura previa
            window.speechSynthesis.cancel();

            // Obtener el contenido del contenedor principal
            const postContent = document.querySelector('.container_h').innerText;
            currentUtterance = new SpeechSynthesisUtterance(postContent);
            currentUtterance.lang = 'es-ES';

            function setVoice() {
                const voices = speechSynthesis.getVoices();
                const spanishVoice = voices.find(voice => voice.lang.includes('es'));
                if (spanishVoice) {
                    currentUtterance.voice = spanishVoice;
                } else {
                    alert('No se encontró una voz en español. Instala una voz en español en tu sistema.');
                }
                window.speechSynthesis.speak(currentUtterance);
            }

            // Marcar que la lectura está activa
            isReading = true;
            document.getElementById('pauseResumeBtn').textContent = 'Pausar ⏸️';

            if (speechSynthesis.getVoices().length > 0) {
                setVoice();
            } else {
                speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true });
            }

            // Restaurar estado cuando la lectura termine
            currentUtterance.onend = () => {
                isReading = false;
                isPaused = false;
                document.getElementById('pauseResumeBtn').textContent = 'Pausar ⏸️';
            };
        }

        // Función para pausar o reanudar la lectura
        function pauseResumeRead() {
            if (!isReading) {
                return;
            }

            if (isPaused) {
                window.speechSynthesis.resume();
                isPaused = false;
                document.getElementById('pauseResumeBtn').textContent = 'Pausar ⏸️';
            } else {
                window.speechSynthesis.pause();
                isPaused = true;
                document.getElementById('pauseResumeBtn').textContent = 'Reanudar ▶️';
            }
        }

        // Función para detener la lectura
        function stopRead() {
            if (isReading || isPaused) {
                window.speechSynthesis.cancel();
                isReading = false;
                isPaused = false;
                document.getElementById('pauseResumeBtn').textContent = 'Pausar ⏸️';
            }
        }

        // Convertir todo a mayúsculas y guardar texto original
        function toUpperCase() {
            document.querySelectorAll('p, h1, h2, label').forEach(element => {
                if (!originalTexts.has(element)) {
                    // Guardar el texto original solo la primera vez
                    originalTexts.set(element, element.textContent);
                }
                element.textContent = element.textContent.toUpperCase();
            });
        }

        // Restaurar texto original
        function restoreText() {
            originalTexts.forEach((originalText, element) => {
                element.textContent = originalText;
            });
        }
