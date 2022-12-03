let veiculos = []

function textoVeiculos(veiculos) {
    const textoInicial = "Veículos encontrados: {"
    let texto = textoInicial
    veiculos.forEach((veiculo) => {
        if (texto != textoInicial) {
            texto += ', '
        }
        texto += `(placa: ${veiculo.placa}, marca: ${veiculo.marca}, modelo: ${veiculo.modelo}, ano: ${veiculo.ano})`
    })
    texto += '}'
    return texto
}

function inserirDiv() {
    let d = document.createElement("div")
    const textoInicial = "Veículos: <br/>{"
    let texto = textoInicial
    veiculos.forEach((veiculo) => {
        if (texto != textoInicial) {
            texto += ', '
        }
        texto += `(placa: ${veiculo.placa}, marca: ${veiculo.marca}, modelo: ${veiculo.modelo}, ano: ${veiculo.ano})`
    })
    texto += '}'
    d.innerHTML = texto + '<br/>'
    let body = document.getElementsByTagName("body")[0]
    body.appendChild(d)
}

function apresentarMenu() {
    let valor = prompt(`
    (1) - Cadastrar automóvel;
    (2) - Pesquisar automóvel;
    (3) - Excluir automóvel;
    (0) - Sair
    `)

    switch (parseInt(valor)) {
        case 1:
        cadastrar()
        break
        case 2:
        pesquisarVeiculo()
        break
        case 3:
        excluir()
        break
    }
    if (valor == 0) {
        inserirDiv()
        return
    }
    else if ((valor == 1) || (valor == 2) || (valor == 3)) {
        apresentarMenu()
    }
}

function criarAutomovel(placa, marca, modelo, ano) {
    return {placa, marca, modelo, ano}
}

function cadastrar() {
    let placa = prompt("Placa")
    let veiculosPesquisa = obterVeiculos(placa, 1) 
    if (veiculosPesquisa.length > 0) {
        alert("Veículo já cadastrado anteriormente")
        return
    }
    let marca = prompt("Marca")
    let modelo = prompt("Modelo")
    let ano = prompt("Ano")
    veiculo = criarAutomovel(placa, marca, modelo, ano)
    veiculos.push(veiculo)    
}

function obterVeiculos(valor, tipoDePesquisa) {
    let veiculosRetornados = []
    veiculos.forEach((veiculo) => {
        if (((tipoDePesquisa == 1) && (veiculo.placa == valor)) ||
            ((tipoDePesquisa == 2) && (veiculo.marca == valor)) ||
            ((tipoDePesquisa == 3) && (veiculo.modelo == valor)) ||
            ((tipoDePesquisa == 4) && (veiculo.ano == valor))) {
            veiculosRetornados.push(veiculo)
            }
    })
    return veiculosRetornados
}

function pesquisarVeiculo() {
    let veiculosEncontrados = []
    let opcao = prompt(`
        Informe o tipo de pesquisa:
            (1) - Placa;
            (2) - Marca;
            (3) - Modelo;
            (4) - Ano
    `)
    if (parseInt(opcao) == 1) {
        let placa = prompt("Placa")
        veiculosEncontrados = obterVeiculos(placa, 1)
    }
    else if (parseInt(opcao) == 2) {
        let marca = prompt("Marca")
        veiculosEncontrados = obterVeiculos(marca, 2)
    }
    else if (parseInt(opcao) == 3) {
        let modelo = prompt("Modelo")
        veiculosEncontrados = obterVeiculos(modelo, 3)
    }
    else if (parseInt(opcao) == 4) {
        let ano = prompt("Ano")
        veiculosEncontrados = obterVeiculos(ano, 4)
    }    
    if (veiculosEncontrados.length > 0) {
        alert(textoVeiculos(veiculosEncontrados))
    }
    else {
        alert("Nenhum veículo foi encontrado")
    }
}

function excluir() {
    let placa = prompt("placa")
    let veiculosEncontrados = obterVeiculos(placa, 1)
    if (veiculosEncontrados.length > 0) {
        for (let i = 0; i < veiculos.length; i++) {
            if (veiculos[i].placa == veiculos[0].placa) {
                veiculos.splice(i, 1)
                return
            }            
        }
    } else {
        alert("Veículo não encontrado")
    }
}
