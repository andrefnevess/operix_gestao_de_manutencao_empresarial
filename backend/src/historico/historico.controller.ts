import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Permite } from '../auth/permissao.decorator';
import { TipoManutencao } from '../domain';
import { IndicadoresResposta, ManutencaoResposta } from './dto/historico.dto';
import { HistoricoService } from './historico.service';

/** Histórico e indicadores (UH08). Somente o gestor. */
@ApiTags('Histórico e indicadores')
@ApiBearerAuth()
@Permite((u) => u.podeGerenciarOrdens())
@Controller()
export class HistoricoController {
  constructor(private readonly servico: HistoricoService) {}

  @Get('equipamentos/:id/historico')
  @ApiOperation({ summary: 'Histórico de manutenções do equipamento' })
  @ApiQuery({ name: 'tipo', required: false, enum: TipoManutencao })
  @ApiQuery({ name: 'de', required: false, example: '2026-11-01' })
  @ApiQuery({ name: 'ate', required: false, example: '2026-11-30' })
  historico(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tipo') tipo?: TipoManutencao,
    @Query('de') de?: string,
    @Query('ate') ate?: string,
  ): Promise<ManutencaoResposta[]> {
    return this.servico.historico(id, tipo, de, ate);
  }

  @Get('indicadores')
  @ApiOperation({ summary: 'Painel de indicadores' })
  indicadores(): Promise<IndicadoresResposta> {
    return this.servico.indicadores();
  }
}