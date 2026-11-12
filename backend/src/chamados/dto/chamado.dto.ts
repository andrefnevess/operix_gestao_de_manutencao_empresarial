import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Chamado } from '../../domain'
import { Prioridade } from '../../domain/enums';

export class AbrirChamadoDto {
    @ApiProperty ({ example:  'Esteira parou de girar'})
    @IsString()
    // Sem o trim, "   " passa pelo IsNotEmpty e só o domínio recusa, devolvendo 422
    // enquanto a descrição vazia devolve 400 — os dois casos viram 400 (DEF-09).
    @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
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
