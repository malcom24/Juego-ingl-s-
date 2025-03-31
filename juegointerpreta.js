        const correctAnswers = { 1: 'a', 2: 'b', 3: 'a', 4: 'a', 5: 'a' };
        let userAnswers = { 1: null, 2: null, 3: null, 4: null, 5: null };
        let points = 0;

        function checkAnswer(activity, selected) {
            const feedbackDiv = document.getElementById(`feedback${activity}`);
            const buttons = document.querySelectorAll(`#opciones${activity} button`);

            // Limpiar feedback y estilos previos
            feedbackDiv.innerText = '';
            buttons.forEach(button => button.classList.remove('correct'));

            // Verificar si la respuesta es correcta
            if (selected === correctAnswers[activity]) {
                // Marcar la respuesta como correcta
                buttons.forEach(button => {
                    if (button.onclick.toString().includes(`'${selected}'`)) {
                        button.classList.add('correct');
                    }
                });
                feedbackDiv.innerText = '';
                // Sumar puntos solo si no se había respondido correctamente antes
                if (userAnswers[activity] !== selected) {
                    points++;
                    userAnswers[activity] = selected;
                }
            } else {
                feedbackDiv.innerText = 'Vuelve a intentarlo.';
            }
        }

        function openTab(evt, tabName) {
            const tabcontent = document.getElementsByClassName("tabcontent");
            for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            const tablinks = document.getElementsByClassName("tablinks");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        function showResults() {
            const resultText = `Obtuviste ${points} de 5 puntos.`;
            document.getElementById("resultadoTexto").innerText = resultText;
            document.getElementById("enviarCorreo").style.display = "inline-block";

            // Mostrar confeti si el puntaje es perfecto (5/5)
            if (points === 5) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }

        function sendResults() {
            const subject = "Resultados de las Actividades de Análisis";
            const body = `Hola,\n\nCompleté las actividades y obtuve ${points} de 5 puntos.\n\n¡Gracias por esta experiencia de aprendizaje!\n\nSaludos,\n[Tu Nombre]`;
            const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }

        // Inicialización
        window.onload = function() {
            document.getElementById("defaultOpen").click();
            document.getElementById("enviarCorreo").style.display = "none";
        };
