function updateCharacterCount() {
    const input = document.getElementById('experiencia');
    const remaining = document.getElementById('remaining');
    remaining.textContent = (`Restam ${1500 - input.value.length} caracteres.`);
}

document.addEventListener('DOMContentLoaded', function () {
    // Aguarda o DOM carregar antes de associar o evento
    const submitBtn = document.getElementById('submitBtn');

    // Verifica se o botão foi encontrado
    if (submitBtn) {
        submitBtn.addEventListener('click', async function (event) {
            event.preventDefault();

            // Captura o valor do grupo "gênero"
            const generoRadios = document.getElementsByName('genero');
            let genero_id = null;
            generoRadios.forEach(radio => {
                if (radio.checked) {
                    genero_id = parseInt(radio.value); // "1", "2" ou "3"
                }
            });

            // Captura o valor de PCD
            const pcdRadios = document.getElementsByName('pcd');
            let pcd = null;
            pcdRadios.forEach(radio => {
                if (radio.checked) {
                    pcd = radio.value; // true para "1", false para "0"
                }
            });

            // Captura o valor de Experiência
            const experienciaRadios = document.getElementsByName('experiencia');
            let experiencia = null;
            experienciaRadios.forEach(radio => {
                if (radio.checked) {
                    experiencia = radio.value; // true para "1", false para "0"
                }
            });

            // Coleta dos dados do formulário
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const resumo_profissional = document.getElementById('experiencia').value.trim();
            const estado = document.getElementById('estado').value;
            const cidade = document.getElementById('cidade').value;
            const data_nascimento = document.getElementById('data_nascimento').value;

            const nrp = document.getElementById('nrp').value.trim();
            const categoria = document.getElementById('categoria').value.toUpperCase().trim();
            const locRegistro = document.getElementById('loc-registro').value.toUpperCase().trim();

            const cref = (`${nrp}-${categoria}/${locRegistro}`);

            // Validação básica
            if (!nome || !email || !nrp || !categoria || !locRegistro || experiencia === null || !estado || !cidade || !data_nascimento) {
                console.error("Preencha todos os campos.");
                alert("Preencha todos os campos.");
                return;
            }

            // Exibe os valores no console
            console.log("Nome completo:", nome);
            console.log("Email:", email);
            console.log("Número de registro do profissional:", nrp);
            console.log("Categoria de atuação:", categoria);
            console.log("Estado de registro:", locRegistro);
            console.log("Descrição da experiência:", resumo_profissional);
            console.log("Gênero Selecionado:", genero_id);
            console.log("PCD Selecionado:", pcd);
            console.log("Experiência Selecionada:", experiencia);
            console.log("Estado selecionado:", estado);
            console.log("Cidade selecionada:", cidade);
            console.log("Data de Nascimento:", data_nascimento);
            console.log("CREF:", cref);

            const parametros = `
                @cref = '${cref}', 
                @nome = '${nome}', 
                @data_nascimento = '${data_nascimento}', 
                @pcd = ${pcd}, 
                @genero_id = ${genero_id}, 
                @estado = '${estado}', 
                @cidade = '${cidade}', 
                @experiencia = ${experiencia}, 
                @resumo_profissional = '${resumo_profissional}';
            `;
            console.log("Parametros:", parametros);

            // Preparando o corpo da requisição
            const body = {
                cref,
                nome,
                email,
                data_nascimento,
                pcd,
                genero_id,
                estado,
                cidade,
                experiencia,
                resumo_profissional
            };

            try {
                // Enviando a requisição para o backend
                const response = await fetch('http://localhost:3000/Cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                // Verificando a resposta do servidor
                if (response.ok) {
                    const data = await response.json();  // Recebe os dados do servidor
                    console.log('Cadastro bem-sucedido:', data);  // Aqui você pode fazer algo com os dados recebidos
                    alert("Cadastro realizado com sucesso!");
                } else {
                    const errorData = await response.json();
                    console.error('Erro ao cadastrar:', errorData);  // Exibe o erro, caso haja
                    alert("Erro ao cadastrar. Tente novamente.");
                }
            } catch (error) {
                console.error('Erro de conexão:', error);  // Caso não consiga se conectar com o servidor
                alert("Erro de conexão. Verifique a sua conexão com a internet.");
            }
        });
    } else {
        console.error('Ocorreu um erro ao carregar os dados.');
    }
});