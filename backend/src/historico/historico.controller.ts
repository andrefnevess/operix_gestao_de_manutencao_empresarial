import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permite } from '../auth/permissao.decorator';
import { FiltroHistoricoQuery, IndicadoresResposta, ManutencaoResposta } from './dto/historico.dto';
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
  historico(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() filtros: FiltroHistoricoQuery,
  ): Promise<ManutencaoResposta[]> {
    return this.servico.historico(id, filtros.tipo, filtros.de, filtros.ate);
  }

  @Get('indicadores')
  @ApiOperation({ summary: 'Painel de indicadores' })
  indicadores(): Promise<IndicadoresResposta> {
    return this.servico.indicadores();
  }
}