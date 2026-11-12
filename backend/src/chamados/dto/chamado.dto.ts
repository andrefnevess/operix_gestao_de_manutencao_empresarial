import { ApiPaymentRequiredResponse, ApiProperty } from '@nestjs/swagger';
import { IsEnum,  IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Chamado } from '../../domain'
import { Prioridade } from '../../domain/enums';

export class AbrirChamadoDto {
    @ApiProperty ({ example:  'Esteira parou de girar'})
    @IsString()
    @IsNotEmpty ()
    descricao!: string;

    @ApiProperty ({ example:  '3f8a1c2e-5b7d-4e9a-8c1f-2d6b4a9e7c03'})
    @IsUUID()
    equipamentoId!: string;

    @ApiProperty ({ enum: Prioridade })
    @IsEnum(Prioridade)
    urgencia!: Prioridade;
}


export class ChamadoResposta {
    @ApiProperty() id!: string;
    @ApiProperty() descricao!: string;
    @ApiProperty() equipamentoId!: string;
    @ApiProperty() equipamentoCodigo!: string;
    @ApiProperty() equipamentoNome!: string;
    @ApiProperty() solicitanteId!: string;
    @ApiProperty() solicitanteNome!: string;
    @ApiProperty({ enum: Prioridade }) urgencia!: Prioridade;
    @ApiProperty() status!: string;
    @ApiProperty() abertoEm!: Date;

    static de (c:Chamado): ChamadoResposta {
        return {
            id: c.getId(),
            descricao: c.getDescricao(),
            equipamentoId: c.getEquipamento().getId(),
            equipamentoCodigo: c.getEquipamento().getCodigo(),
            equipamentoNome: c.getEquipamento().getNome(),
            solicitanteId: c.getSolicitante().getId(),
            solicitanteNome: c.getSolicitante().getNome(),
            urgencia: c.getUrgencia(),
            status: c.getStatus(),
            abertoEm: c.getAbertoEm(),
        };
    }
}
