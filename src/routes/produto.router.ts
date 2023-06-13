import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { ProdutoId, ProdutoSchema } from '../dto/produtoDto';
import Produtocontroller from '../controllers/produto.controller';

const produtoRouter = Router();

produtoRouter.post('/', validateRequest({body: ProdutoSchema }), Produtocontroller.getInstance().criarProduto)
produtoRouter.get('/:id', validateRequest({params: ProdutoId}), Produtocontroller.getInstance().lerPorId)
produtoRouter.get('/', Produtocontroller.getInstance().lerTodos);

export default produtoRouter;