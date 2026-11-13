
// Tabela de preços
const precos = {
    'Pen drive 32GB': 45,
    'Monitor OLED 33"': 1790,
    'Smartphone Android': 3200,
    'SmartTV TV 50" 4K': 2950,
    'TV 48" 4K': 2840,
    'TV 60" 4K': 3470,
    'Smartphone iOS': 8300
};

// Tabela de fretes
const fretes = {
    'Região Centro-Oeste': 15,
    'Região Nordeste': 20,
    'Região Norte': 25,
    'Região Sul': 15,
    'Região Sudeste': 10
};

// Pedidos iniciais
const pedidosIniciais = [
    {codigo:1001, regiao:'Região Centro-Oeste', estado:'GO', produto:'Smartphone iOS', data:'17/11/2024', quantidade:4},
    {codigo:1002, regiao:'Região Sudeste', estado:'SP', produto:'Pen drive 32GB', data:'17/11/2024', quantidade:4},
    {codigo:1003, regiao:'Região Sul', estado:'RS', produto:'Smartphone iOS', data:'17/11/2024', quantidade:2},
    {codigo:1004, regiao:'Região Sul', estado:'RS', produto:'Monitor OLED 33"', data:'18/11/2024', quantidade:1},
    {codigo:1005, regiao:'Região Sudeste', estado:'SP', produto:'SmartTV TV 50" 4K', data:'18/11/2024', quantidade:1},
    {codigo:1006, regiao:'Região Nordeste', estado:'BA', produto:'Smartphone Android', data:'18/11/2024', quantidade:4},
    {codigo:1007, regiao:'Região Sudeste', estado:'SP', produto:'SmartTV TV 50" 4K', data:'18/11/2024', quantidade:2},
    {codigo:1008, regiao:'Região Sudeste', estado:'RJ', produto:'TV 48" 4K', data:'19/11/2024', quantidade:4},
    {codigo:1009, regiao:'Região Nordeste', estado:'BA', produto:'SmartTV TV 50" 4K', data:'19/11/2024', quantidade:5},
    {codigo:1010, regiao:'Região Sudeste', estado:'RJ', produto:'Smartphone Android', data:'19/11/2024', quantidade:1},
    {codigo:1011, regiao:'Região Sudeste', estado:'RJ', produto:'TV 60" 4K', data:'19/11/2024', quantidade:1},
    {codigo:1012, regiao:'Região Centro-Oeste', estado:'GO', produto:'Monitor OLED 33"', data:'19/11/2024', quantidade:3},
    {codigo:1013, regiao:'Região Sudeste', estado:'MG', produto:'TV 60" 4K', data:'20/11/2024', quantidade:5},
    {codigo:1014, regiao:'Região Norte', estado:'AM', produto:'Smartphone Android', data:'20/11/2024', quantidade:4},
    {codigo:1015, regiao:'Região Sudeste', estado:'MG', produto:'Pen drive 32GB', data:'20/11/2024', quantidade:5},
    {codigo:1016, regiao:'Região Sudeste', estado:'ES', produto:'Monitor OLED 33"', data:'20/11/2024', quantidade:4},
    {codigo:1017, regiao:'Região Sudeste', estado:'ES', produto:'Pen drive 32GB', data:'20/11/2024', quantidade:1},
    {codigo:1018, regiao:'Região Sul', estado:'PR', produto:'Smartphone iOS', data:'20/11/2024', quantidade:2},
    {codigo:1019, regiao:'Região Sul', estado:'PR', produto:'Monitor OLED 33"', data:'20/11/2024', quantidade:5},
    {codigo:1020, regiao:'Região Sul', estado:'PR', produto:'Smartphone iOS', data:'20/11/2024', quantidade:1},
    {codigo:1021, regiao:'Região Sudeste', estado:'SP', produto:'Monitor OLED 33"', data:'21/11/2024', quantidade:5},
    {codigo:1022, regiao:'Região Sudeste', estado:'SP', produto:'Smartphone Android', data:'21/11/2024', quantidade:1},
    {codigo:1023, regiao:'Região Sul', estado:'RS', produto:'TV 60" 4K', data:'21/11/2024', quantidade:2},
    {codigo:1024, regiao:'Região Sudeste', estado:'SP', produto:'Monitor OLED 33"', data:'21/11/2024', quantidade:5},
    {codigo:1025, regiao:'Região Sudeste', estado:'RJ', produto:'Monitor OLED 33"', data:'21/11/2024', quantidade:5},
    {codigo:1026, regiao:'Região Sudeste', estado:'RJ', produto:'TV 60" 4K', data:'21/11/2024', quantidade:3},
    {codigo:1027, regiao:'Região Sudeste', estado:'MG', produto:'Monitor OLED 33"', data:'21/11/2024', quantidade:3},
    {codigo:1028, regiao:'Região Sudeste', estado:'MG', produto:'Smartphone iOS', data:'21/11/2024', quantidade:1},
    {codigo:1029, regiao:'Região Nordeste', estado:'BA', produto:'Pen drive 32GB', data:'21/11/2024', quantidade:3}
];

// Carregar pedidos salvos
let pedidos = JSON.parse(localStorage.getItem('pedidosVendas')) || pedidosIniciais;

const moeda = valor =>
    valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

// Gerar próximo código sem repetir
function gerarCodigo() {
    return pedidos.reduce(
        (maior, p) => Math.max(maior, p.codigo), 1000
    ) + 1;
}

// Mostrar código automaticamente
document.getElementById('codigo').value = gerarCodigo();

// Calcular valores automaticamente
function calcular() {
    const produto = document.getElementById('produto').value;
    const regiao = document.getElementById('regiao').value;
    const quantidade = Number(
        document.getElementById('quantidade').value
    );

    const preco = precos[produto] || 0;
    const frete = fretes[regiao] || 0;

    document.getElementById('preco').textContent =
        moeda(preco);

    document.getElementById('frete').textContent =
        moeda(frete);

    document.getElementById('total').textContent =
        moeda(quantidade * (preco + frete));
}

['produto', 'regiao', 'quantidade'].forEach(id => {
    document.getElementById(id).addEventListener('input', calcular);
});

// Cadastrar pedido
document.getElementById('formPedido').addEventListener('submit', function(e) {
    e.preventDefault();

    const codigo = gerarCodigo();
    const regiao = document.getElementById('regiao').value;
    const estado = document.getElementById('estado').value;
    const produto = document.getElementById('produto').value;
    const dataInput = document.getElementById('data').value;
    const quantidade = Number(document.getElementById('quantidade').value);

    if (!regiao || !estado || !produto || !dataInput ||
        !Number.isInteger(quantidade) || quantidade < 1) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    // Verificação de código duplicado
    if (pedidos.some(p => p.codigo === codigo)) {
        alert('Código já cadastrado!');
        return;
    }

    const partes = dataInput.split('-');
    const data = `${partes[2]}/${partes[1]}/${partes[0]}`;

    const novoPedido = {
        codigo,
        regiao,
        estado,
        produto,
        data,
        quantidade
    };

    pedidos.push(novoPedido);

    localStorage.setItem(
        'pedidosVendas',
        JSON.stringify(pedidos)
    );

    atualizarPainel();

    this.reset();

    document.getElementById('codigo').value = gerarCodigo();

    calcular();

    document.getElementById('mensagem').textContent =
        `Pedido ${codigo} cadastrado com sucesso!`;
});

// Atualizar tabela e indicadores
function atualizarPainel() {
    const pesquisa = document.getElementById('pesquisa')
        .value.toLowerCase();

    const faturamento = pedidos.reduce((soma, p) =>
        soma + p.quantidade * (
            precos[p.produto] + fretes[p.regiao]
        ), 0);

    const unidades = pedidos.reduce((soma, p) =>
        soma + p.quantidade, 0);

    document.getElementById('faturamento').textContent =
        moeda(faturamento);

    document.getElementById('totalPedidos').textContent =
        pedidos.length;

    document.getElementById('totalUnidades').textContent =
        unidades;

    document.getElementById('ticketMedio').textContent =
        moeda(pedidos.length ? faturamento / pedidos.length : 0);

    const lista = pedidos.filter(p =>
        String(p.codigo).includes(pesquisa) ||
        p.produto.toLowerCase().includes(pesquisa) ||
        p.estado.toLowerCase().includes(pesquisa)
    );

    document.getElementById('listaPedidos').innerHTML =
        lista.map(p => {
            const total = p.quantidade * (
                precos[p.produto] + fretes[p.regiao]
            );

            return `
                <tr>
                    <td>${p.codigo}</td>
                    <td>${p.regiao}</td>
                    <td>${p.estado}</td>
                    <td>${p.produto}</td>
                    <td>${p.data}</td>
                    <td>${p.quantidade}</td>
                    <td>${moeda(total)}</td>
                </tr>
            `;
        }).join('');
}

// Pesquisa de pedidos
document.getElementById('pesquisa').addEventListener(
    'input', atualizarPainel
);

// Inicializar painel
atualizarPainel();

document.getElementById('listaPedidos').innerHTML =
    lista.map(p => {
        const total = p.quantidade * (
            precos[p.produto] + fretes[p.regiao]
        );

        return `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.regiao}</td>
                <td>${p.estado}</td>
                <td>${p.produto}</td>
                <td>${p.data}</td>
                <td>${p.quantidade}</td>
                <td>${moeda(total)}</td>
                <td>
                    <button class="btn-remover" data-codigo="${p.codigo}">
                        🗑 Remover
                    </button>
                </td>
            </tr>
        `;
    }).join('');[]
// Remover pedido
document.getElementById('listaPedidos').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-remover')) {
        const codigo = Number(e.target.dataset.codigo);

        const confirmar = confirm(
            `Tem certeza que deseja remover o pedido ${codigo}?`
        );

        if (confirmar) {
            pedidos = pedidos.filter(p => p.codigo !== codigo);

            localStorage.setItem(
                'pedidosVendas',
                JSON.stringify(pedidos)
            );

            atualizarPainel();

            document.getElementById('codigo').value = gerarCodigo();

            document.getElementById('mensagem').textContent =
                `Pedido ${codigo} removido com sucesso!`;
        }
    }
});