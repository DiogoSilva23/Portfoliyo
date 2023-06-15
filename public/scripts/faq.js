// Obter todas as questões
var faqQuestions = document.querySelectorAll('.faq-question');

// Adicionar um evento para cada questão
faqQuestions.forEach(function(question) {
question.addEventListener('click', function() {
    // Mudar a visibilidade da resposta
    var answer = this.nextElementSibling;
    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';

    // Adicionar e/ou remover a classe ativa da questão
    this.classList.toggle('active');
});
});