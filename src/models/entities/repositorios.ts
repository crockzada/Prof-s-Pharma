import { AppDataSource } from "../../data-source";
import Produto from "./produto";

export const ProdutoRepositorio = AppDataSource.getRepository(Produto);