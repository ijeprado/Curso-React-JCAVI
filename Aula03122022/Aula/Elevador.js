let elevador = {
    andar: 0,
    andarMaximo: 10,
    subir: () => {
        if (elevador.andar == elevador.andarMaximo) {
            alert("Elevador já está no último andar")
        }
        else {
            elevador.andar++
            elevador.apresentarAndarAtual()
        }
    },
    descer: () => {
        if (elevador.andar == 0) {
            alert("Elevador já está no térro")
        }
        else {
            elevador.andar--
            elevador.apresentarAndarAtual()
        }
    },
    apresentarAndarAtual: () => {
        alert(`${elevador.andar}`)
    },
    qtdPessoas: 0,
    qtdMaximaPessoas: 6,
    adicionaPessoa: () => {
        if (qtdPessoas == qtdMaximaPessoas) {
            alert("Número máximo de pessoas atingido")
        }
        else {
            qtdPessoas++
        }
    },
    removerPessoa: () => {
        if (qtdPessoas == 0) {
            alert("Elevador já vazio")
        }
        else {
            qtdPessoas++
        }
    }
}

function descer() {
    elevador.descer()
}

function subir() {
    elevador.subir()
}

function entrar(pessoa) {

}

function sair(nome) {

}
