const nome = document.querySelector("#nome");
const idade = document.querySelector("#idade");
const telefone = document.querySelector("#telefone");
const button = document.querySelector("button");
const lista = document.querySelector(".lista");

let users = [];

/* Evento JavaScript */

button.addEventListener("click", (event) => {
    event.preventDefault();

    const inputNameValue = nome.value
    const inputIdadeValue = idade.value
    const inputTelefoneValue = telefone.value

    const informacoes = {
        inputNameValue,
        inputIdadeValue,
        inputTelefoneValue
    };

    if (inputNameValue === "" || inputIdadeValue === "" || inputTelefoneValue === "") {
        alert("Algum campo não foi preenchido");
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(inputNameValue)) {
        alert("O nome deve ter apenas letras");
        return false;
    }

    if (!/^\d+$/.test(inputIdadeValue) || inputIdadeValue < 1 || inputIdadeValue > 99) {
        alert("Idade inválida");
        return false;
    }

    if (inputTelefoneValue.length !== 11) {
        alert("Adicione um número de telefone válido, incluindo o DDD");
        return false;
    }
    
    const testePhone = users.some(user => user.inputTelefoneValue === inputTelefoneValue);
    if (testePhone) {
        alert("Número já foi registrado");
        return false;
    }

    users.push(informacoes);
    console.log(users);

    nome.value = "";
    idade.value = "";
    telefone.value = "";
    usuariosCadastrados();
});

function usuariosCadastrados() {
    lista.innerHTML = '';

    users.forEach((element, index) => {
        const templateHTML = `
            <div class="info">
                <div>
                    <li><p><strong>NOME:</strong> ${element.inputNameValue}</p></li>
                    <li><p><strong>IDADE:</strong> ${element.inputIdadeValue}</p></li>
                    <li><p><strong>TELEFONE:</strong> ${element.inputTelefoneValue}</p></li>
                </div>
                <button class="apagar" data-index="${index}">Excluir</button>
            </div>
        `;

        lista.innerHTML += templateHTML;
    });

    const apagar = document.querySelectorAll(".apagar");
    apagar.forEach(button => {
        button.addEventListener("click", excluir);
    });
}

function excluir(event) {
    const index = event.target.dataset.index;
    users.splice(index, 1);
    usuariosCadastrados();
}
