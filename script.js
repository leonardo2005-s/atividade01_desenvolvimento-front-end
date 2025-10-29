// Alterna o menu de navegação (abrir/fechar)
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
        navMenu.classList.toggle("active");
    }
}

// Faz o scroll suave até a seção selecionada
function scrollActive(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerHeight = 70; // altura do cabeçalho fixa
    const sectionPosition = section.offsetTop - headerHeight;

    window.scrollTo({ top: sectionPosition, behavior: "smooth" });

    // Fecha o menu após clicar em um link
    const menu = document.getElementById("navMenu");
    if (menu) {
        menu.classList.remove("active");
    }
}

// Envia o formulário e salva os dados no Local Storage
function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("volunteerForm");
    if (!form) return;

    const formData = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        idade: form.idade.value.trim(),
        disponibilidade: form.disponibilidade.value.trim(),
        areaInteresse: form.areaInteresse.value.trim(),
        motivacao: form.motivacao.value.trim(),
        dataCadastro: new Date().toLocaleDateString("pt-BR")
    };

    // Salva os dados no Local Storage
    let voluntarios = JSON.parse(localStorage.getItem("voluntarios") || "[]");
    voluntarios.push(formData);
    localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

    // Exibe mensagem de sucesso
    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
        successMessage.classList.add("show");
        successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => form.reset(), 2000);
        setTimeout(() => successMessage.classList.remove("show"), 3000);
    }

    // Atualiza a lista de voluntários
    exibirVoluntarios();
}

// Exibe os voluntários cadastrados
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem("voluntarios") || "[]");
    const voluntariosList = document.getElementById("tabelaVoluntarios");

    if (!voluntariosList) return;

    if (voluntarios.length === 0) {
        voluntariosList.innerHTML = "<p>Nenhum voluntário cadastrado ainda.</p>";
        return;
    }

    voluntariosList.innerHTML = voluntarios
        .map(
            (v) => `
            <div class="voluntario">
                <p><strong>Nome:</strong> ${v.nome}</p>
                <p><strong>Email:</strong> ${v.email}</p>
                <p><strong>Telefone:</strong> ${v.telefone}</p>
                <p><strong>Idade:</strong> ${v.idade}</p>
                <p><strong>Disponibilidade:</strong> ${v.disponibilidade}</p>
                <p><strong>Área de Interesse:</strong> ${v.areaInteresse}</p>
                <p><strong>Motivação:</strong> ${v.motivacao}</p>
                <p><strong>Data de Cadastro:</strong> ${v.dataCadastro}</p>
            </div>
            `
        )
        .join("");
}
