function resolver() {
    var select = document.getElementById('Itens');
    if (select.value == "1") {
        var numero1 = window.prompt("Primeiro número");
        var numero2 = window.prompt("Segudo número");
        var numero3 = window.prompt("Terceiro número");
        var mediaAritmetica = ((parseFloat(numero1) + 
            parseFloat(numero2) + parseFloat(numero3)) / 3).toFixed(2);
        alert(`Média aritmética: ${mediaAritmetica}`)
    }
    else if (select.value == "2") {
        var nome = window.prompt("Nome do funcionário");
        var salario = window.prompt("Salário");
        var novoSalario = (salario * 1.1).toFixed(2).replace('.', ',')
        alert(`O novo salário de ${nome} é ${novoSalario}`)
    }
    else if (select.value == "3") {
        var primeiroNumero = window.prompt("Primeiro número");
        var segundoNumero = window.prompt("Segundo número");
        if (primeiroNumero == segundoNumero) {
            var soma = parseInt(primeiroNumero) + parseInt(segundoNumero);
            alert(`Números iguais. Soma: ${soma}`)
        }
        else {
            var multiplicacao = parseInt(primeiroNumero) * parseInt(segundoNumero);
            alert(`Números diferentes. Multiplicação: ${multiplicacao}`);
        }
    }
    else if (select.value == "4") {
        var preco = window.prompt("Preço à vista do produto");
        var numParcelas = window.prompt("Número de parcelas");
        if (numParcelas < 3) {
            var precoFinal = preco;
        }
        else if (numParcelas < 5) {
            var precoFinal = preco * 1.1;
        }
        else {
            var precoFinal = preco * 1.2;
        }
        var valorParcela = (precoFinal / numParcelas).toFixed(2).replace('.', ',')
        alert(`
        Preço final: ${precoFinal.toFixed(2).replace('.', ',')}
        Valor de cada parcela: ${valorParcela}`)
    }
    else if (select.value == "5") {
        var nome = window.prompt("Nome do aluno");
        var primeiraNota = window.prompt("Primeira nota");
        var segundaNota = window.prompt("Segunda nota");
        var terceiraNota = window.prompt("Terceira nota");
        var media = (parseFloat(primeiraNota) + parseFloat(segundaNota) + parseFloat(terceiraNota)) / 3;
        if (media >= 8) {
            alert("Aluno foi aprovado")
        }
        else {
            alert("Aluno não foi aprovado");
        }
    }
    else if (select.value == "6") {
        var alturas = [1.70, 1.91, 1.80, 1.79, 1.68, 1.73, 1.65, 1.60, 1.75, 1.80, 1.79, 1.81, 1.78, 1.82,
                       1.75];
        var menorAltura = 3;
        var maiorAltura = 0;
        var soma = 0;
        var alturaReferencia = 1.81;
        var numPesMaisRef = 0;
        for (let i = 0; i < alturas.length; i++) {
            if (alturas[i] < menorAltura) {
                menorAltura = alturas[i]
            }
            if (alturas[i] > maiorAltura) {
                maiorAltura = alturas[i]
            }
            soma = soma + alturas[i];
            if (alturas[i] > alturaReferencia) {
                numPesMaisRef++;
            }
        }
        var media = soma / alturas.length;    
        alert(`
               A maior altura é ${maiorAltura}
               A menor altura é ${menorAltura}
               O número de pessoas com mais de ${alturaReferencia} é ${numPesMaisRef}
               A média de altura é ${media}`);
    }
    else if (select.value =="7") {
        var opinioes = [ {idade: 21, opiniao: 2 }, {idade: 25, opiniao: 1},
            {idade: 30, opiniao: 1 }, {idade: 55, opiniao: 4},
            {idade: 35, opiniao: 2 }, {idade: 50, opiniao: 3},
            {idade: 40, opiniao: 3 }, {idade: 45, opiniao: 1},
            {idade: 45, opiniao: 2 }, {idade: 40, opiniao: 3},
            {idade: 50, opiniao: 1 }, {idade: 35, opiniao: 2},
            {idade: 55, opiniao: 3 }, {idade: 30, opiniao: 1},
            {idade: 60, opiniao: 2 } ];
        var somaOtimo = 0;
        var quantidadeOtimo = 0;
        var quantidadeRegular = 0;
        var quantidadeBom = 0;
        opinioes.forEach(function soma(item) {
            if (item.opiniao == 3) {
                somaOtimo += item.idade;
                quantidadeOtimo++;
            }
            else if (item.opiniao == 1) {
                quantidadeRegular++;
            }    
            else if (item.opiniao == 2) {
                quantidadeBom++;    
            }
        });
        var media = somaOtimo / quantidadeOtimo;
        var porcentagem = (100 * quantidadeBom / opinioes.length).toFixed(2);
        alert(`
        A média de idade das pessoas que responderam ótimo é ${media}
        A quantidade de pessoas que responderam bom é ${quantidadeRegular}
        A porcentagem de pessoas que responderam bom é ${porcentagem} %`);
    }
    else if (select.value == "8") {
        alert("A oito é continuação da sete")
    }
    else if (select.value == "9") {
        var numeros = [15, 25, 20, 13, 12, 6, 29, 35, 49, 54];
        var somaNumerosPares = 0;
        var somaNumerosPrimos = 0;
        numeros.forEach(function soma(numero) {
            if ((numero % 2) == 0) {
                somaNumerosPares += numero;
            }
            var numDivisores = 0;
            for (var i = 1; i <= numero; i++) {
                if ((numero % i) == 0) {
                    numDivisores++;
                }
            }            
            if (numDivisores == 2) {
                somaNumerosPrimos += numero;
            }
        });
        alert(`
        A soma do números pares é ${somaNumerosPares}
        A soma de números primos é ${somaNumerosPrimos}
        `)
    }
    else if (select.value == "10") {
        pessoas = [
            {idade: 20, peso: 60, sexo: "Masculino"},
            {idade: 20, peso: 65, sexo: "Masculino"},
            {idade: 24, peso: 69, sexo: "Feminino"},
            {idade: 25, peso: 70, sexo: "Masculino"},
            {idade: 28, peso: 61, sexo: "Masculino"},
            {idade: 27, peso: 63, sexo: "Feminino"},
            {idade: 24, peso: 63, sexo: "Masculino"},
            {idade: 26, peso: 63, sexo: "Feminino"},
            {idade: 25, peso: 64, sexo: "Masculino"},
            {idade: 24, peso: 64, sexo: "Masculino"}];
        var numeroDeHomens = 0;
        var numeroDeMulheres = 0;
        var somaIdadesHomens = 0;
        var somaPesosMulheres = 0;
        pessoas.forEach(function fx(pessoa) {
            if (pessoa.sexo == "Masculino") {
                numeroDeHomens++;
                somaIdadesHomens += pessoa.idade;
            }
            else if (pessoa.sexo == "Feminino") {
                numeroDeMulheres++;
                somaPesosMulheres += pessoa.peso;
            }
        })
        var mediaIdadeHomens = somaIdadesHomens / numeroDeHomens;
        var mediaPesoMulheres = somaPesosMulheres / numeroDeMulheres;
        alert(`
            Número de homens: ${numeroDeHomens}
            Número de mulheres: ${numeroDeMulheres}
            Média de idade dos homens: ${mediaIdadeHomens}
            Média de peso das mulheres: ${mediaPesoMulheres} 
        `)
    }
}