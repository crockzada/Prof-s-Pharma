import { AppDataSource } from "../../data-source";
import Produto from "./produto";

const ProdutoRepositorio = AppDataSource.getRepository(Produto);

export default ProdutoRepositorio;