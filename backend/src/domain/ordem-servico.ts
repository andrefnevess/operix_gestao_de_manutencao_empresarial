import {StatusOrdemServico} from './status-ordem-servico.enum';
export class OrdemServico {
    private id:number;
    private descricao:string;
    private status:StatusOrdemServico;

    constructor(id: number, descricao: string) {
        this.id = id;
        this.descricao = descricao;
        this.status = StatusOrdemServico.ABERTA;
    }

    iniciar ():void {
    this.status = StatusOrdemServico.EM_ANDAMENTO;
    }

    concluir ():void {
    this.status = StatusOrdemServico.CONCLUIDA;
    }

    getStatus ():StatusOrdemServico {
    return this.status;
    }

}