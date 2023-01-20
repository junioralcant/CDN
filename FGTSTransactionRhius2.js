const data_nascimento = document.getElementsByName(
  'cf_data_de_nascimento'
);

data_nascimento[0].addEventListener('input', () => {
  data_nascimento[0].maxLength = 10;
  let valor = data_nascimento[0].value;
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/^(\d{2})(\d)/, '$1/$2');
  valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
  data_nascimento[0].value = valor;
});

document
  .getElementById('conversion-form')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementsByName('cf_nome_completo')[0]
      .value;
    const cpf = document.getElementsByName('cf_cpf')[0].value;
    const data_nascimento = document.getElementsByName(
      'cf_data_de_nascimento'
    )[0].value;
    const email = document.getElementsByName('email')[0].value;
    const telefone = document.getElementsByName(
      'cf_celular_whatsapp_para_contato'
    )[0].value;
    const saldo = document.getElementsByName(
      'cf_saldo_do_seu_fgts'
    )[0].value;

    if (
      nome &&
      cpf &&
      data_nascimento &&
      email &&
      telefone &&
      saldo
    ) {
      const dataNascimentoFormatted = data_nascimento.replaceAll(
        '/',
        '-'
      );
      const bodyFgts = {
        nome: nome,
        telefone_sms: telefone,
        telefone_wpp: telefone,
        data_nascimento: dataNascimentoFormatted,
        email: email,
        valor_em_conta: saldo,
        valor_a_retirar: saldo,
        anos: 7,
        cpf: cpf,
      };

      const optionsFgts = {
        method: 'POST',
        body: JSON.stringify(bodyFgts),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      fetch(
        'https://deixanoazul.apitest.app/api/transaction-fgts/rhius',
        optionsFgts
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  });
