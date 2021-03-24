class CarrinhoDeCompras {

    constructor(cliente, data, novoCliente) {
        this.cliente = cliente;
        this.novoCliente = novoCliente;
        this.data = data;
        this.itens = [];
        this.valorTotal = 0;
        this.cupom = null;
    }

    // adicionar produtos
    adicionarProduto(produto, quantidade) {
        this.itens.push({ produto, quantidade });
        this.calcularValorTotal();
    };

    // recebe um array de objetos com um produto e a sua respectiva quantidade
    adicionarProdutos(lista) {
        this.itens.push(...lista);
        this.calcularValorTotal();
    };

    // recalcular valor total para novos produtos adicionados (usar concatenação de operadores)
    calcularValorTotal() {
        let total = 0;

        this.itens.map((item) => {
            total += item.produto.preco * item.quantidade;
        });

        this.valorTotal = total;
    };

    // adicionar cupom de desconto
    adicionarCupom(codigo) {
        if (codigo === 'camp50') {
            this.cupom = 50 / 100;
        };
    };

    // calcular quantidade de itens totais 
    get totalDeItens() {
        let totalItens = 0;

        this.itens.map((item) => {
            totalItens += item.quantidade;
        });

        return totalItens;
    };

    // listar produtos
    get listaDeProdutos() {
        let listaDeProdutos = '';

        this.itens.map((item) => {
            listaDeProdutos += `Código: ${item.produto.codigo} | Produto: ${item.produto.nome} | Qtd: ${item.quantidade}\n`;
        });

        return listaDeProdutos;
    };

    // calcular valor final (desconto para novos clientes OU cupom)
    fecharCompra() {
        let total = 0;

        // 20% de desconto para novos clientes
        if (this.novoCliente) {
            total = this.valorTotal * 0.8;
            // desconto de XX% do cupom 
        } else if (this.cupom) {
            total = this.valorTotal * (1 - this.cupom);
            // 5% de desconto para compras acima de 100 reais
        } else if (this.valorTotal > 100) {
            fintotalal = this.valorTotal * 0.95;
        };

        return this.valorTotal = total.toFixed(2);;
    };
};

function Produto(codigo, nome, preco) {
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
};

const meuCarrinho = new CarrinhoDeCompras('Diego Batista', new Date(), false);

meuCarrinho.adicionarProduto({ codigo: 01, nome: 'Notebook', preco: 10 }, 1);
meuCarrinho.adicionarProduto({ codigo: 02, nome: 'Smartphone', preco: 20 }, 2);
meuCarrinho.adicionarProduto({ codigo: 03, nome: 'Tablet', preco: 30 }, 3);

meuCarrinho.adicionarProduto(new Produto(04, 'Cadeira', 20), 1);

// adicionar uma lista 
const meusItens = [
    { produto: new Produto(05, 'Teclado', 5), quantidade: 1 },
    { produto: new Produto(06, 'Mouse', 2.5), quantidade: 1 }
];

meuCarrinho.adicionarProdutos(meusItens);

meuCarrinho.adicionarCupom('camp50');

function resumoDaCompra(carrinho) {
    const template = (
        `Cliente: ${carrinho.cliente}
Data da compra: ${carrinho.data.toLocaleDateString('pt-BR')}\n
# Produtos #\n${carrinho.listaDeProdutos}
Quantidade de produtos: ${carrinho.totalDeItens}
Total: R$ ${carrinho.valorTotal}

${carrinho.novoCliente && 'Desconto de primeira compra'
        || carrinho.cupom && `Cupom de ${carrinho.cupom * 100}%`
        || carrinho.valorTotal > 100 && '5% de desconto em compras acima de R$ 100,00'
        }

Total Final: R$ ${carrinho.fecharCompra()}`
    );

    return (metodoDePagamento, parcelas) => {
        const valorParcelado = (carrinho.valorTotal / parcelas).toFixed(2);
        return `${template}\nPagamento com ${metodoDePagamento} em ${parcelas}x de RS ${valorParcelado}\n`;
    };
};

console.log(resumoDaCompra(meuCarrinho)('Cartão de Crédito', 3));

