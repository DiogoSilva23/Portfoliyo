// Obter todas as questões
var faqQuestions = document.querySelectorAll('.faq-question');

// Adicionar um evento para cada questão
faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
    // Mudar a visibilidade da resposta
    var answer = this.nextElementSibling;
    if (answer.style.display === 'none' || answer.style.display === '') {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
  });
});