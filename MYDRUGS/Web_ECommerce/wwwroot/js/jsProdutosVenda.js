

var ObjetoVenda = new Object();

ObjetoVenda.AdicionarCarrinho = function (idProduto) {

    var nome = $("#nome_" + idProduto).val();
    var qtd = $("#qtd_" + idProduto).val();

    $.ajax({
        type: 'POST',
        url: "/api/AdicionarProdutoCarrinho",
        dataType: "JSON",
        cache: false,
        async: true,
        data: {
            "id": idProduto, "nome": nome, "qtd": qtd
        },
        success: function (data) {

            if (data.sucesso) {
                // 1 alert-success// 2 alert-warning// 3 alert-danger
                ObjetoAlerta.AlertarTela(1, "Produto adicionado no carrinho!");
            }
            else {
                // 1 alert-success// 2 alert-warning// 3 alert-danger
                ObjetoAlerta.AlertarTela(2, "Necessário efetuar o login!");
            }

        }
    });


}


ObjetoVenda.CarregaProdutos = function (descricao) {

    $.ajax({
        type: 'GET',
        url: "/api/ListarProdutosComEstoque",
        dataType: "JSON",
        cache: false,
        async: true,
        data: { descricao: descricao },

        success: function (data) {

            var htmlConteudo = "";

            data.forEach(function (Entitie) {
                htmlConteudo += `
                    <div class="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch justify-content-center">
                        <div class="card p-2 custom-shadow w-100">
                            <div class="card-hearder text-center">
                                <img
                                    class="img-fluid"
                                    style="max-height: 200px; min-height: 200px"
                                    src="${Entitie.url}"
                                >
                            </div>
                            <div class="card-body p-0">
                                <p class="nome-produto"><strong>${Entitie.nome}</strong></p>
                                <span class="descricao-produto">${Entitie.descricao}</span>
                                <h5 class="mt-2 mb-0 text-primary">
                                    <strong>R$ ${Entitie.valor}</strong>
                                </h5>
                                </div>
                                <div class="row mt-2 d-flex align-items-center comprar-qtd px-3 justify-content-between  ">
                                    <input class="col-2 p-0 " type="number" value="1" min="1" id="qtd_${Entitie.id}">
                                    <button class="col-4 p-0 btn btn-outline-primary btn-comprar" type="button" onclick="ObjetoVenda.AdicionarCarrinho(${Entitie.id})">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
            });

            $("#DivVenda").html(htmlConteudo);
        }
    });

}

    //`
    //                <div class="col-md-4 col-lg-3">
    //                    <div class="card custom-shadow cartao-produto">
    //                        <div class="card-hearder text-center">
    //                            <img
    //                                class="img-fluid"
    //                                style="max-height: 200px"
    //                                src="${Entitie.url}"
    //                                alt="..."
    //                            >
    //                        </div>
    //                        <div class="card-body d-flex flex-column">
    //                            <p class="nome-produto">${Entitie.nome}</p>
    //                            <span class="descricao-produto">${Entitie.descricao}</span>
    //                            <h5 class="mt-2 mb-0 preco">
    //                               R$ ${Entitie.valor}
    //                            </h5>

                            //<div class="row mt-2 d-flex align-items-center comprar-qtd px-3 justify-content-md-between  ">
                            //    <input class="col-2 p-0 " type="number" value="1" min="1" id="qtd_${Entitie.id}">
                            //    <button class="col-4 p-0 btn-comprar" type="button" onclick="ObjetoVenda.AdicionarCarrinho(${Entitie.id})">
                            //        <i class="bi bi-cart-plus"></i>
                            //    </button>
                            //</div>
    //                        </div>
    //                    </div>
    //                </div>
    //            `


ObjetoVenda.CarregaQtdCarrinho = function () {

    $("#qtdCarrinho").text("(0)");

    $.ajax({
        type: 'GET',
        url: "/api/QtdProdutosCarrinho",
        dataType: "JSON",
        cache: false,
        async: true,
        success: function (data) {

            if (data.sucesso) {
                $("#qtdCarrinho").text("(" + data.qtd + ")");
            }

        }
    });


    setTimeout(ObjetoVenda.CarregaQtdCarrinho, 5000);
}

$(function () {
    ObjetoVenda.CarregaProdutos();
    ObjetoVenda.CarregaQtdCarrinho();


    $("#buscar").click(
        function () {
            var descricao = $("#descricao").val();
            ObjetoVenda.CarregaProdutos(descricao);
        }
    );

});