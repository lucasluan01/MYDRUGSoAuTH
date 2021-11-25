using Domain.Interfaces.InterfaceProduct;
using Domain.Interfaces.InterfaceServices;
using Domain.Services;
using Entities.Entities;
using Infrastructure.Repository.Repositories;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace UnitTestMyDrugs
{
    [TestClass]
    public class UnitTestMDrugs
    {
        [TestMethod]
        public async Task AddProductComSucesso()
        {
            try
            {
                IProduct _IProduct = new RepositoryProduct();
                IServiceProduct _IServiceProduct = new ServiceProduct(_IProduct);
                var produto = new Produto
                {
                    Descricao = string.Concat("Descrição Test TDD", DateTime.Now.ToString()),
                    QtdEstoque = 10,
                    Nome = string.Concat("Nome Test TDD", DateTime.Now.ToString()),
                    Valor = 20,
                    UserId = "4c7807d7-e946-42d4-9473-fd5d107894ab"
                };
                await _IServiceProduct.AddProduct(produto);

                Assert.IsFalse(produto.Notitycoes.Any());
            }
            catch (Exception)
            {

                Assert.Fail();
            }
        }

        [TestMethod]
        public async Task AddProductComValidacaoCampoObrigatorio()
        {
            try
            {
                IProduct _IProduct = new RepositoryProduct();
                IServiceProduct _IServiceProduct = new ServiceProduct(_IProduct);
                var produto = new Produto
                {

                };
                await _IServiceProduct.AddProduct(produto);

                Assert.IsTrue(produto.Notitycoes.Any());
            }
            catch (Exception)
            {

                Assert.Fail();
            }
        }

        [TestMethod]
        public async Task ListarProdutosUsuario()
        {

            try
            {
                IProduct _IProduct = new RepositoryProduct();

                var listaProdutos = await _IProduct.ListarProdutosUsuario("4c7807d7-e946-42d4-9473-fd5d107894ab");

                Assert.IsTrue(listaProdutos.Any());
            }
            catch (Exception)
            {

                Assert.Fail();
            }
        }

        [TestMethod]
        public async Task GetEntityById()
        {
            try
            {
                IProduct _IProduct = new RepositoryProduct();
                var listaProdutos = await _IProduct.ListarProdutosUsuario("4c7807d7-e946-42d4-9473-fd5d107894ab");
                var produto = await _IProduct.GetEntityById(listaProdutos.LastOrDefault().Id);

                Assert.IsTrue(produto != null);
            }
            catch (Exception)
            {

                Assert.Fail();
            }
        }

        [TestMethod]
        public async Task Delete()
        {
            try
            {
                IProduct _IProduct = new RepositoryProduct();
                var listaProdutos = await _IProduct.ListarProdutosUsuario("4c7807d7-e946-42d4-9473-fd5d107894ab");
                var ultimoProduto = listaProdutos.LastOrDefault();
                await _IProduct.Delete(ultimoProduto);
                Assert.IsTrue(true);
            }
            catch (Exception)
            {
                Assert.Fail();
            }
        }

    }
}
