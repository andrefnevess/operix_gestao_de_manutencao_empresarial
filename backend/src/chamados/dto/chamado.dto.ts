import { ApiProperty } from '@nestjs/swagger';
import { IsEnum,  IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Chamado } from '../../domain'
import { Prioridade } from '../../domain/enums';

export class AbrirChamadoDto {
    @ApiProperty ({ example:  'Esteira parou de girar'})
    @IsString()
    @IsNotEmpty ()
    descricao!: string;

    @ApiProperty ({ example:  'Id do Equipamento'})
    @IsUUID()
    equipamentoId!: string;

    @ApiProperty ({ enum: Prioridade })
    @IsEnum(Prioridade)
    urgencia!: Prioridade;
}


export class ChamadoResposta {
    id!: string;
    descricao!: string;
    equipamentoId!: string;
    urgencia!: Prioridade;
    status!: string;
    abertoEm!: Date;

    static de (c:Chamado): ChamadoResposta {
        return {
            id: c.getId(),
            descricao: c.getDescricao(),
            equipamentoId: c.getEquipamento().getId(),
            urgencia: c.getUrgencia(),
            status: c.getStatus(),
            abertoEm: c.getAbertoEm(),
        };
    }
}