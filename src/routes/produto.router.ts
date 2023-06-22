import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { ProdutoId, ProdutoSchema } from '../dto/produtoDto';
import Produtocontroller from '../controllers/produto.controller';
import upload from '../middlewares/storage';

const produtoRouter = Router();

produtoRouter.post('/', validateRequest({body: ProdutoSchema }), Produtocontroller.getInstance().criarProduto)
produtoRouter.get('/:id', validateRequest({params: ProdutoId}), Produtocontroller.getInstance().lerPorId)
produtoRouter.get('/', Produtocontroller.getInstance().lerTodos)
produtoRouter.put('/:id', validateRequest({body: ProdutoSchema, params: ProdutoId}), Produtocontroller.getInstance().alterarProduto)
produtoRouter.put('/:id/photo', validateRequest({params: ProdutoId}), upload.single('avatar'), Produtocontroller.getInstance().alterarImagem)
produtoRouter.delete('/:id', validateRequest({params: ProdutoId}), Produtocontroller.getInstance().deletarProduto);

export default produtoRouter;