import 'reflect-metadata'
import produtoService  from "../../src/services/produto.service";
import { v4 } from "uuid";
import Produto from '../../src/models/entities/produto';
import { DeleteResult } from 'typeorm';
import ProdutoRepositorio from '../../src/models/entities/repositorios';



const produtos: Produto[] = [];

test('criar produto', async () => {
    
    ProdutoRepositorio.find = jest.fn((a: any) => Promise.resolve(produtos))
    ProdutoRepositorio.delete = jest.fn((a: any) => new Promise(resolve => {produtos.splice(0,100); resolve(new DeleteResult()) }))
    ProdutoRepositorio.save<any> = (data) => { produtos.push(data); return Promise.resolve(data)}    
    ProdutoRepositorio.findOneBy = jest.fn((a: any) => Promise.resolve(produtos[2] || produtos[0] ))
    
    //ProdutoRepositorio.save()

    const id1 = v4();
    const produto = {
        id: id1, nome: "rexona", serie: 4332, descricao: "asdaff", imagem: "", preco: 50.00
    }; // as Produto;
    expect(produtos.length).toBe(0);
    produtoService.getInstance().criarProduto(produto);
    //produtoService.getInstance().lerTodos()
    expect(produtos.length).toBe(1);
    expect(produtos[0].nome).toBe(produto.nome);
})




test('ler todos', async ()=>{
    produtos.splice(0,100);
    const id1 = v4();
    const id2= v4();
   
    const produto1 = {
        id: id1, nome: "rexona", serie: 4332, descricao: "asdaff", imagem: "", preco: 50.00
    } 
    const produto2 = {
        id: id2, nome: "avon", serie: 566, descricao: "ablublu", imagem: "", preco: 115.00
    } 
    await ProdutoRepositorio.save(produto1)
    await ProdutoRepositorio.save(produto2)
    const produtosResultado = await produtoService.getInstance().lerTodos();
    expect (produtosResultado.length).toBe(2);
   // expect(produtos[1]).toBe(produto2);
})


test("ler por id(id) ", async () => {
    produtos.splice(0,100);
    const id1 = v4();
    const id2 = v4();

    
    const produto1 = { id: id1, nome: "rexona", serie: 4332, descricao: "asdaff", imagem: "", preco: 50.00 } ;
    const produto2 = { id: id2, nome: "avon", serie: 566, descricao: "ablublu", imagem: "", preco: 115.00 } ;


   ProdutoRepositorio.save(produto1)
   ProdutoRepositorio.save(produto2)

    let produtosResultado = await produtoService.getInstance().lerPorId(id1);
    
    expect((await produtosResultado)?.nome).toBe("rexona");
    
   
})




test('edita produto', async ()=>{
    const id2 = v4();
    
    const produto2 = {
        id: v4(), nome: "avon", serie: 566, descricao: "ablublu", imagem: "", preco: 115.00
    }
    const produto3 = {
        id: v4(), nome: "avon", serie: 566, descricao: "ablublu", imagem: "", preco: 115.00
    } 
    const produto = {
        id: v4(), nome: "avon", serie: 566, descricao: "ablublu", imagem: "", preco: 115.00
    } 
   
   
    produtos.splice(0,100);
    ProdutoRepositorio.save(produto3);
    ProdutoRepositorio.save(produto2);
    ProdutoRepositorio.save(produto);


    const produtoEditado = {
        id: id2, nome: "rexona", serie: 4332, descricao: "asdaff", imagem: "", preco: 50.00
    }

    try{
   
    await produtoService.getInstance().alterarProduto(produtoEditado,id2)
   
    expect(produtos.length).toBe(4);
    expect(produtos[0]).toBe(produto3);
    console.log(produtos)
    console.log(produtoEditado)
    expect(produtos[3]).toBe(produtoEditado);
    } catch(error) {
        console.log(error)
    }
})
