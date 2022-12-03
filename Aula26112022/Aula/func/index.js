function somarNumeros(n1, n2) {
    return n1 + n2;
}

function calcularMedia(array) {
    var soma = 0;
    for (let i = 0; i < array.length; i++) {
        soma += array[i];         
    }
    return soma / array.length;
}

const idades = [15, 20, 25];
let calculo = calcularMedia(idades);
d 
alert(calculo);