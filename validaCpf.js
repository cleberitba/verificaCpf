
const cpf = new ValidaCPF('111.111.111-11'); /// Insira o numero do cpf aqui



function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function () {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
};


ValidaCPF.prototype.valida = function () {

    if (this.cpfLimpo === '') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpf9Dig = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpf9Dig);
    const digito2 = this.criaDigito(cpf9Dig + digito1);
    const cpfCalculado = cpf9Dig + digito1 + digito2;

    if (cpfCalculado !== this.cpfLimpo) return false;

    return true;
};

ValidaCPF.prototype.criaDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);


};

ValidaCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;

};


if (cpf.valida() === true) {
    console.log("Cpf Verdadeiro");
} else {
    console.log("cpf falso")
};
