import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permite, UsuarioAtual } from '../auth/permissao.decorator';
import { Usuario } from '../domain';
import { ChamadosService } from './chamados.service';
import { AbrirChamadoDto, ChamadoResposta } from './dto/chamado.dto';

/** Chamados de manutenção (UH04). */
@ApiTags('Chamados')
@ApiBearerAuth()
@Controller('chamados')
export class ChamadosController {
constructor(private readonly servico: ChamadosService) {}

@Post()
@Permite((u) => u.podeAbrirChamado())
@ApiOperation({ summary: 'Abrir chamado (solicitante ou gestor)' })
async abrir(@UsuarioAtual() usuario: Usuario, @Body() dto: AbrirChamadoDto): Promise<ChamadoResposta> {
return ChamadoResposta.de(await this.servico.abrir(usuario, dto));
}

@Get()
@ApiOperation({ summary: 'Listar chamados' })
async listar(): Promise<ChamadoResposta[]> {
return (await this.servico.listar()).map((c) => ChamadoResposta.de(c));
}

@Get(':id')
@ApiOperation({ summary: 'Consultar chamado' })
async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<ChamadoResposta> {
return ChamadoResposta.de(await this.servico.buscar(id));
}

@Patch(':id/cancelar')
@ApiOperation({ summary: 'Cancelar chamado aberto (quem abriu ou o gestor)' })
async cancelar(@UsuarioAtual() usuario: Usuario, @Param('id', ParseUUIDPipe) id: string): Promise<ChamadoResposta> {
return ChamadoResposta.de(await this.servico.cancelar(usuario, id));
}
}
