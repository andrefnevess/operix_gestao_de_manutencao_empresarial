import {OrdemServico} from './ordem-servico';

export class OrdemCorretiva extends OrdemServico {
    private descricaoProblema: string;

    constructor(id: number, descricao: string, descricaoProblema: string) {
        super (id, descricao);
        this.descricaoProblema = descricaoProblema;

}

    getDescricaoProblema ():string {
        return this.descricaoProblema;
    }

}