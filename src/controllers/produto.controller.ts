import { Request, Response, NextFunction} from 'express'
import ProdutoService from '../services/produto.service';

class Produtocontroller {
    static lerPorId(res: Response<any, Record<string, any>>, req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>) {
        throw new Error("Method not implemented.");
    }
    private static instance: Produtocontroller;
    private constructor(){

    }
    
    public static getInstance(): Produtocontroller {
        if(!Produtocontroller.instance){
            Produtocontroller.instance = new Produtocontroller();
        }
        return Produtocontroller.instance;
    }

    public async criarProduto(req: Request, res: Response){
        try{
            const produtoDto = req.body;
            const produtoSalvo = await ProdutoService.getInstance().criarProduto(produtoDto);
            res.json(produtoSalvo);
        } catch(error) {
            res.status(500).json(error);
        }
    }

    public async lerTodos(req: Request, res: Response){
        const produtos = await ProdutoService.getInstance().lerTodos();
        res.json(produtos);
    }

    public async lerPorId(req: Request, res: Response){
        try{
            const id = req.params.is;
            const produto = await ProdutoService.getInstance().lerPorId(id);
            res.json(produto);
        } catch(error) {
            res.status(500).send(error);
        }
    }

    public async alterarProduto(req: Request, res: Response){
        try {
        const produtoDto = req.body;
        const id = req.params.id;
       await ProdutoService.getInstance().alterarProduto(produtoDto, id);
        res.json('ok');
        } catch(error) {
            res.status(500).json(error);
        }        
    }
/*
    public async alterarImagem(req: Request, res: Response){
        try {
        const file = req.file;
        if(file == null) throw new Error();
        const id = req.params.id;
       await ProdutoService.getInstance().alterarImagem(file, id);
        res.json('ok');
        } catch(error) {
            res.status(500).json(error);
        }        
    }

    public async deletarProduto(req: Request, res: Response){
        try{
        const id = req.params.id;
       await ProdutoService.getInstance().deletarProduto(id);
        res.json('ok')
        } catch(error){
            res.status(500).send(error);
        }
    }
*/

}

export default Produtocontroller;