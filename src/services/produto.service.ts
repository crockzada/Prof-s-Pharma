import Jimp from "jimp";
import { ProdutoDto } from "../dto/produtoDto";
import Produto from "../models/entities/produto";
import ProdutoRepositorio from "../models/entities/repositorios";
import { v4 } from "uuid";
import fs from 'fs';


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

    public async alterarProduto(dto: ProdutoDto, id: string): Promise<Produto> {
        try{

        const produto = await ProdutoRepositorio.findOneBy({id})
        if(!produto){
            return Promise.reject('Não encontrado')
        }
        produto.nome = dto.nome;
        produto.descricao = dto.descricao;
        produto.preco = dto.preco;
        produto.serie = dto.serie;
            return await ProdutoRepositorio.save(produto)
        } catch(err) {
            return Promise.reject(new Error('Problemas ao atualizar'));
        }
    }
/*
    public async alterarImagem(file: Express.Multer.File, id: string) : Promise<void> {
        try{

            const produto = await ProdutoRepositorio.findOneBy({id})
            if(!produto){
                return Promise.reject('Not Found')
            }
            const nomeImagem = `avatar_${id}.jpg`;
            const imagem = await Jimp.read(file.path);
            await imagem.resize(500,500);
            await imagem.writeAsync('public/images/' + nomeImagem);
            if(fs.existsSync(file.path))
                fs.unlinkSync(file.path);
            produto.imagem = nomeImagem;
            await ProdutoRepositorio.save(produto);

            
        } catch(err) {
            return Promise.reject('Nao pode processar imagem')
        }
    }

    public async deletarProduto(id: string): Promise<void> {
        try {
            await ProdutoRepositorio.delete({id});
        } catch(err){
            return Promise.reject('Não encontrado')
        }
    }
*/


}

export default ProdutoService;