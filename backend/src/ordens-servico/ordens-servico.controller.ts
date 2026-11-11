import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permite, UsuarioAtual } from '../auth/permissao.decorator';
import { Usuario } from '../domain';
import { AtribuirOrdemDto, CancelarOrdemDto, ConcluirOrdemDto, GerarOrdemDto, OrdemResposta } from './dto/ordem-servico.dto';
import { OrdensServicoService } from './ordens-servico.service';

/** Ordens de serviço (UH05 e UH06). */
@ApiTags('Ordens de serviço')
@ApiBearerAuth()
@Controller('ordens-servico')
export class OrdensServicoController {
constructor(private readonly servico: OrdensServicoService) {}

@Post()
@Permite((u) => u.podeGerenciarOrdens())
@ApiOperation({ summary: 'Gerar ordem a partir de um chamado (gestor)' })
async gerar(@Body() dto: GerarOrdemDto): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.gerar(dto.chamadoId));
}

@Get()
@ApiOperation({ summary: 'Listar ordens (o técnico vê só as dele)' })
async listar(@UsuarioAtual() usuario: Usuario): Promise<OrdemResposta[]> {
    return (await this.servico.listar(usuario)).map((o) => OrdemResposta.de(o));
}

@Get(':id')
@ApiOperation({ summary: 'Consultar ordem' })
async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.buscar(id));
}

@Patch(':id/atribuir')
@Permite((u) => u.podeGerenciarOrdens())
@ApiOperation({ summary: 'Atribuir a um técnico (gestor)' })
async atribuir(@UsuarioAtual() gestor: Usuario, @Param('id', ParseUUIDPipe) id: string, @Body() dto: AtribuirOrdemDto): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.atribuir(gestor, id, dto));
}

@Patch(':id/iniciar')
@Permite((u) => u.podeExecutarOrdens())
@ApiOperation({ summary: 'Iniciar execução (técnico atribuído)' })
async iniciar(@UsuarioAtual() tecnico: Usuario, @Param('id', ParseUUIDPipe) id: string): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.iniciar(tecnico, id));
}

@Patch(':id/concluir')
@Permite((u) => u.podeExecutarOrdens())
@ApiOperation({ summary: 'Concluir e registrar a manutenção (técnico atribuído)' })
async concluir(@UsuarioAtual() tecnico: Usuario, @Param('id', ParseUUIDPipe) id: string, @Body() dto: ConcluirOrdemDto): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.concluir(tecnico, id, dto));
}

@Patch(':id/cancelar')
@Permite((u) => u.podeGerenciarOrdens())
@ApiOperation({ summary: 'Cancelar antes da execução (gestor)' })
async cancelar(@UsuarioAtual() gestor: Usuario, @Param('id', ParseUUIDPipe) id: string, @Body() dto: CancelarOrdemDto): Promise<OrdemResposta> {
return OrdemResposta.de(await this.servico.cancelar(gestor, id, dto.motivo));
}
}