import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Produto{

@PrimaryColumn()
id: string;
@Column({ unique: true})
serie: number;
@Column({ nullable: true})
descricao: string;
@Column()
nome: string;
@Column( 'decimal' , { precision: 6, scale: 2})
preco: number

}

export default Produto