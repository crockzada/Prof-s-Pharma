import { Request, Response, NextFunction} from 'express'
import ProdutoService from '../services/produto.service';

class Produtocontroller {
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
}

export default Produtocontroller;