function somarValores(valor1, valor2) {
    return valor1 + valor2;
}

function somaArray(elementos) {
    var soma = 0;
    for (let i = 0; i < elementos.length; i++) {
        soma += elementos[i];
    }
    return soma;
}

function nomeCompleto(primeiroNome, segundoNome) {
    return `${primeiroNome}  ${segundoNome}`;
}

function ObtemElementos() {
    var numeroDeElementos = window.prompt("Número de elementos")
    if (isNaN(numeroDeElementos)) {
        alert('Número inválido');
        return;
    }
    var elementos = new Array();
    for (let i = 0; i < numeroDeElementos; i++) {
        var entrada = window.prompt(`Digite o número ${i + 1}`);
        if (isNaN(entrada)) {
            alert('Número inválido');
            return;
        }
        elementos.push(parseFloat(entrada));
    }
    return elementos;
}

function ObterElementoNaoRepetido(array) {
    let quantidades = new Array();
    for (let i = 0; i < array.length; i++) {
        let achou = false;
        for (let j = 0; j < quantidades.length; j++) {
            if (quantidades[j].letra == array[i]) {
                quantidades[j].quantidade = quantidades[j] + 1;
                achou = true;
                break;
            }            
        }
        if (!achou) {
            quantidades.push({letra: array[i], quantidade: 1});
        }        
    }
    let letra = "";
    for (let i = 0; i < quantidades.length; i++) {
        if (quantidades[i].quantidade == 1) {
            letra = quantidades[i].letra;
            break;
        }        
    }
    return letra;
}
function resolver() {
    var select = document.getElementById('Itens');
    if (select.value == "1") {
        var numero1 = window.prompt("Primeiro número");
        var numero2 = window.prompt("Segudo número");
        var soma = somarValores(parseFloat(numero1), parseFloat(numero2));
        alert(`
        A some de ${numero1} e ${numero2} é ${soma}`)
    }
    else if (select.value == "2") {
        var elementos = ObtemElementos();
        if (elementos != null) {
            var soma = somaArray(elementos);
            alert(`A soma dos valores do array é ${soma}`)
        }
    }
    else if (select.value == "3") {
        var primeiroNome = window.prompt("Primeiro nome");
        var segundoNome = window.prompt("Segundo nome");
        alert(`Nome completo: ${nomeCompleto(primeiroNome, segundoNome)}`);
    }
    else if (select.value == "4") {
        var texto = window.prompt("String");
        alert(`
        Texto digitado: ${texto}`)
    }
    else if (select.value == "5") {
        var elementos = ObtemElementos();
        var media = somaArray(elementos) / elementos.length;
        alert(`
        A média dos valores do array é ${media}`)
    }
    else if (select.value == "6") {
        let vetor = ["a", "b", "a", "a", "c", "b"];
        let elemento = ObterElementoNaoRepetido(vetor);
        if ((elemento != null) && (elemento != "")) {
            alert(`
            O único elemento do array que não se repete é ${elemento}
            `)    
        }
    }
}