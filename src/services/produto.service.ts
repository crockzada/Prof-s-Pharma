import Produto from "../models/entities/produto";
import { ProdutoRepositorio } from "../models/entities/repositorios";
import { v4 } from "uuid";



class ProdutoService {
    private static instance: ProdutoService;
    private constructor(){

    }

    public static getInstance(): ProdutoService {
        if(!ProdutoService.instance){
            ProdutoService.instance = new ProdutoService();

        }
        return ProdutoService.instance;
    }

    public async criarProduto(dto: Produto): Promise<Produto> {
        try{
            const produto = new Produto();
            produto.nome = dto.nome;
            produto.descricao = dto.descricao;
            produto.preco = dto.preco;
            produto.serie = dto.serie;
            produto.id = v4();
                return await ProdutoRepositorio.save(produto)
        } catch(err) {
            return Promise.reject(new Error('Não foi possível salvar'));
        }
    }

    public async lerTodos(): Promise<Produto[]> {
        return await ProdutoRepositorio.find();
    }

    public async lerPorId(id: string): Promise<Produto> {
        const selected = await ProdutoRepositorio.findOneBy({id});
        if(selected){
            return Promise.resolve(selected);
        } else {
            return Promise.reject("Não encontrado")
        }
    }

}

export default ProdutoService;