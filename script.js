function updateCharacterCount() {
    const input = document.getElementById('experiencia');
    const remaining = document.getElementById('remaining');
    remaining.textContent = `Restam ${1500 - input.value.length} caracteres.`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Aguarda o DOM carregar antes de associar o evento
    const submitBtn = document.getElementById('submitBtn');

    // Verifica se o botão foi encontrado
    if (submitBtn) {
        submitBtn.addEventListener('click', function (event) {
            event.preventDefault();
            // Captura o valor do grupo "gênero"
            const generoRadios = document.getElementsByName('genero');
            let generoSelecionado = null;
            generoRadios.forEach(radio => {
                if (radio.checked) {
                    generoSelecionado = radio.value; // "1", "2" ou "3"
                }
            });

            // Captura o valor de PCD
            const pcdRadios = document.getElementsByName('pcd');
            let pcdSelecionado = null;
            pcdRadios.forEach(radio => {
                if (radio.checked) {
                    pcdSelecionado = radio.value === "1"; // true para "1", false para "0"
                }
            });

            // Captura o valor de Experiência
            const experienciaRadios = document.getElementsByName('experiencia');
            let experienciaSelecionada = null;
            experienciaRadios.forEach(radio => {
                if (radio.checked) {
                    experienciaSelecionada = radio.value === "1"; // true para "1", false para "0"
                }
            });

            // Exibe os valores no console
            // Faça algo com os valores capturados

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const experiencia = document.getElementById('experiencia').value.trim();
            const estado = document.getElementById('estado').value;
            const cidade = document.getElementById('cidade').value;
            const dataNascimento = document.getElementById('data_nascimento').value;

            const nrp = document.getElementById('nrp').value.trim();
            const categoria = document.getElementById('categoria').value.toUpperCase().trim();
            const locRegistro = document.getElementById('loc-registro').value.toUpperCase().trim();

            const cref = (`${nrp}-${categoria}/${locRegistro}`)

            const parametros = `
                @cref = '${cref}', 
                @nome = '${nome}', 
                @data_nascimento = '${dataNascimento}', 
                @pcd = ${pcdSelecionado}, 
                @genero_id = ${generoSelecionado}, 
                @estado = '${estado}', 
                @cidade = '${cidade}', 
                @experiencia = ${experienciaSelecionada}, 
                @resumo_profissional = '${experiencia}';
            `;

            // Validação básica
            if (!nome || !email || !nrp || !categoria || !locRegistro || !experiencia || !estado || !cidade || !dataNascimento) {
                console.error("Preencha todos os campos.");
                return;
            }

            // Exibe os valores no console
            console.log("Nome completo:", nome);
            console.log("Email:", email);
            console.log("Número de registro do profissional:", nrp);
            console.log("Categoria de atuação:", categoria);
            console.log("Estado de registro:", locRegistro);
            console.log("Descrição da experiência:", experiencia);
            console.log("Gênero Selecionado:", generoSelecionado);
            console.log("PCD Selecionado:", pcdSelecionado);
            console.log("Experiência Selecionada:", experienciaSelecionada);
            console.log("Estado selecionado:", estado);
            console.log("Cidade selecionada:", cidade);
            console.log("Data de Nascimento:", dataNascimento);
            console.log("CREF:", cref);
            console.log("Parametros:", parametros);
        });
    } else {
        console.error('Ocorreu um erro ao carregar os dados.');
    }
});