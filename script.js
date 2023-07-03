// Cargar el archivo JSON con las preguntas y opciones
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    const categoryButtons = document.querySelectorAll('.categories button');
    
    // Agregar evento de clic a los botones de categoría
    categoryButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (index === 0) {
          // Abrir un enlace aleatorio de la categoría 1 en una nueva pestaña
          const randomLink = getRandomLink(data.category1);
          window.open(randomLink, '_blank');
        } else {
          // Mostrar una pregunta aleatoria y sus opciones
          const category = 'category' + (index + 1); // Corrección aquí
          const questionData = getRandomQuestion(data[category]);
          displayQuestion(questionData);
        }
      });
    });
  })
  .catch(error => {
    console.log('Error al cargar el archivo JSON:', error);
  });

// Función para obtener una pregunta aleatoria de una categoría
function getRandomQuestion(category) {
  const randomIndex = Math.floor(Math.random() * category.questions.length);
  return category.questions[randomIndex];
}

// Función para obtener un enlace aleatorio de la categoría 1
function getRandomLink(category) {
  const randomIndex = Math.floor(Math.random() * category.links.length);
  return category.links[randomIndex];
}

// Función para mostrar la pregunta y opciones en la página
function displayQuestion(questionData) {
  const questionElement = document.getElementById('question');
  const optionsElements = document.querySelectorAll('#options .option');

  // Mostrar la pregunta
  questionElement.textContent = questionData.question;

  // Mostrar las opciones
  optionsElements.forEach((option, index) => {
    option.textContent = questionData.options[index];

    // Resaltar la opción correcta
    option.classList.remove('correct');
    if (index === questionData.answerIndex) {
      option.classList.add('correct');
    }
  });

  // Mostrar el contenedor de la pregunta y opciones
  const questionContainer = document.getElementById('question-container');
  questionContainer.style.display = 'block';
}
