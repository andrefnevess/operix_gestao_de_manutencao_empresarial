import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permite } from '../auth/permissao.decorator';
import { OrdemResposta } from '../ordens-servico/dto/ordem-servico.dto';
import { CriarPlanoDto, PlanoResposta } from './dto/plano.dto';
import { PlanosService } from './planos.service';

/** Manutenção preventiva e alertas (UH07). Somente o gestor. */
@ApiTags('Planos preventivos')
@ApiBearerAuth()
@Permite((u) => u.podeGerenciarOrdens())
@Controller('planos')
export class PlanosController {
constructor(private readonly servico: PlanosService) {}

@Post()
@ApiOperation({ summary: 'Criar plano preventivo' })
async criar(@Body() dto: CriarPlanoDto): Promise<PlanoResposta> {
return PlanoResposta.de(await this.servico.criar(dto));
}

@Get()
@ApiOperation({ summary: 'Listar planos' })
async listar(): Promise<PlanoResposta[]> {
return (await this.servico.listar()).map((p) => PlanoResposta.de(p));
}

@Get('alertas/vencendo')
@ApiOperation({ summary: 'Alerta: planos que vencem nos próximos 7 dias' })
async vencendo(): Promise<PlanoResposta[]> {
return (await this.servico.vencendo()).map((p) => PlanoResposta.de(p));
}

@Get('alertas/atrasados')
@ApiOperation({ summary: 'Alerta: planos atrasados' })
async atrasados(): Promise<PlanoResposta[]> {
return (await this.servico.atrasados()).map((p) => PlanoResposta.de(p));
}

@Get(':id')
@ApiOperation({ summary: 'Consultar plano' })
async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<PlanoResposta> {
return PlanoResposta.de(await this.servico.buscar(id));
}

@Post(':id/gerar-ordem')
@ApiOperation({ summary: 'Gerar ordem de serviço preventiva a partir do plano' })
async gerarOrdem(@Param('id', ParseUUIDPipe) id: string): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.gerarOrdem(id));
}
}