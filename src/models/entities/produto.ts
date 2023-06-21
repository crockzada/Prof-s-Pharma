import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Produto{

static push(produto1: Produto, produto2: Produto, produto3: Produto) {
    throw new Error("Method not implemented.");
}

@PrimaryColumn()
id: string;
@Column({ unique: true})
serie: number;
@Column({ nullable: true})
descricao: string;
@Column()
nome: string;
@Column({nullable: true})
imagem: string;
@Column( 'decimal' , { precision: 6, scale: 2})
preco: number

}

export default Produto