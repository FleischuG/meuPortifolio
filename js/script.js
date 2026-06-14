/* =============================================
   Portfólio - Guilherme Pinto Huhnfleisch
   Fundamentos da Programação Web - UNINTER
   JavaScript: validação, menu mobile e interações
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ----- Referências aos elementos do DOM ----- */
    const menuToggle = document.getElementById('menuToggle');
    const menuNav = document.getElementById('menuNav');
    const formContato = document.getElementById('formContato');
    const modalOverlay = document.getElementById('modalOverlay');
    const btnFecharModal = document.getElementById('btnFecharModal');
    const menuLinks = document.querySelectorAll('.menu-link');
    const secoes = document.querySelectorAll('.secao, .hero');
    const cabecalho = document.querySelector('.cabecalho');
    const secoesAnimadas = document.querySelectorAll('.animar-entrada');

    /* =============================================
       Cabeçalho com efeito ao rolar a página
       ============================================= */
    function atualizarCabecalho() {
        if (window.scrollY > 60) {
            cabecalho.classList.add('rolado');
        } else {
            cabecalho.classList.remove('rolado');
        }
    }

    /* =============================================
       Animação de entrada das seções ao rolar
       ============================================= */
    const observadorSecoes = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
            }
        });
    }, { threshold: 0.12 });

    secoesAnimadas.forEach(function (secao) {
        observadorSecoes.observe(secao);
    });

    /* =============================================
       Menu Mobile (Hambúrguer)
       Abre e fecha o menu em telas pequenas
       ============================================= */
    menuToggle.addEventListener('click', function () {
        const aberto = menuNav.classList.toggle('aberto');
        menuToggle.classList.toggle('ativo');
        menuToggle.setAttribute('aria-expanded', aberto);
    });

    // Fecha o menu ao clicar em um link
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menuNav.classList.remove('aberto');
            menuToggle.classList.remove('ativo');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    /* =============================================
       Destaque do link ativo no menu
       Conforme a seção visível na tela
       ============================================= */
    function destacarMenuAtivo() {
        let secaoAtual = '';

        secoes.forEach(function (secao) {
            const topo = secao.offsetTop - 100;
            const altura = secao.offsetHeight;
            if (window.scrollY >= topo && window.scrollY < topo + altura) {
                secaoAtual = secao.getAttribute('id') || '';
            }
        });

        menuLinks.forEach(function (link) {
            link.classList.remove('ativo');
            const href = link.getAttribute('href');
            if (href === '#' + secaoAtual || (secaoAtual === '' && href === '#topo')) {
                link.classList.add('ativo');
            }
        });
    }

    window.addEventListener('scroll', function () {
        destacarMenuAtivo();
        atualizarCabecalho();
    });
    destacarMenuAtivo();
    atualizarCabecalho();

    /* =============================================
       Validação do Formulário de Contato
       Verifica campos obrigatórios e formato de e-mail
       ============================================= */
    const campoNome = document.getElementById('nome');
    const campoEmail = document.getElementById('email');
    const campoMensagem = document.getElementById('mensagem');
    const erroNome = document.getElementById('erroNome');
    const erroEmail = document.getElementById('erroEmail');
    const erroMensagem = document.getElementById('erroMensagem');

    // Expressão regular para validar formato de e-mail
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validarNome() {
        const valor = campoNome.value.trim();
        if (valor === '') {
            erroNome.textContent = 'O nome é obrigatório.';
            campoNome.classList.add('invalido');
            return false;
        }
        if (valor.length < 3) {
            erroNome.textContent = 'O nome deve ter pelo menos 3 caracteres.';
            campoNome.classList.add('invalido');
            return false;
        }
        erroNome.textContent = '';
        campoNome.classList.remove('invalido');
        return true;
    }

    function validarEmail() {
        const valor = campoEmail.value.trim();
        if (valor === '') {
            erroEmail.textContent = 'O e-mail é obrigatório.';
            campoEmail.classList.add('invalido');
            return false;
        }
        if (!regexEmail.test(valor)) {
            erroEmail.textContent = 'Informe um e-mail válido (ex: usuario@dominio.com).';
            campoEmail.classList.add('invalido');
            return false;
        }
        erroEmail.textContent = '';
        campoEmail.classList.remove('invalido');
        return true;
    }

    function validarMensagem() {
        const valor = campoMensagem.value.trim();
        if (valor === '') {
            erroMensagem.textContent = 'A mensagem é obrigatória.';
            campoMensagem.classList.add('invalido');
            return false;
        }
        if (valor.length < 10) {
            erroMensagem.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
            campoMensagem.classList.add('invalido');
            return false;
        }
        erroMensagem.textContent = '';
        campoMensagem.classList.remove('invalido');
        return true;
    }

    // Validação em tempo real ao sair do campo
    campoNome.addEventListener('blur', validarNome);
    campoEmail.addEventListener('blur', validarEmail);
    campoMensagem.addEventListener('blur', validarMensagem);

    /* =============================================
       Envio do Formulário (simulação)
       Valida todos os campos, limpa o form e exibe modal
       ============================================= */
    formContato.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nomeValido = validarNome();
        const emailValido = validarEmail();
        const mensagemValida = validarMensagem();

        if (nomeValido && emailValido && mensagemValida) {
            // Simula o envio: limpa os campos
            formContato.reset();

            // Exibe modal de confirmação
            modalOverlay.removeAttribute('hidden');
            modalOverlay.classList.add('visivel');
        }
    });

    /* =============================================
       Fechar Modal de Confirmação
       ============================================= */
    function fecharModal() {
        modalOverlay.classList.remove('visivel');
        modalOverlay.setAttribute('hidden', '');
    }

    btnFecharModal.addEventListener('click', fecharModal);

    // Fecha ao clicar fora do modal
    modalOverlay.addEventListener('click', function (evento) {
        if (evento.target === modalOverlay) {
            fecharModal();
        }
    });

    // Fecha com a tecla Escape
    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && modalOverlay.classList.contains('visivel')) {
            fecharModal();
        }
    });

});
