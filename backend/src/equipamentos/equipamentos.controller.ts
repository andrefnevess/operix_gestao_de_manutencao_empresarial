import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Permite } from '../auth/permissao.decorator';
import { EquipamentoResposta, SalvarEquipamentoDto } from './dto/equipamento.dto';
import { EquipamentosService } from './equipamentos.service';

/**
 * Equipamentos (UH03). Qualquer usuário logado consulta (o solicitante precisa escolher o equipamento
 * ao abrir um chamado); apenas o gestor cadastra, edita e muda o status.
 */
@ApiTags('Equipamentos')
@ApiBearerAuth()
@Controller('equipamentos')
export class EquipamentosController {
  constructor(private readonly servico: EquipamentosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar equipamentos, com busca por código, nome, tipo ou localização' })
  @ApiQuery({ name: 'busca', required: false, example: 'galpão' })
  async listar(@Query('busca') busca?: string): Promise<EquipamentoResposta[]> {
    return (await this.servico.listar(busca)).map((e) => EquipamentoResposta.de(e));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar equipamento' })
  async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<EquipamentoResposta> {
    return EquipamentoResposta.de(await this.servico.buscar(id));
  }

  @Post()
  @Permite((u) => u.podeGerenciarEquipamentos())
  @ApiOperation({ summary: 'Cadastrar equipamento (gestor)' })
  async criar(@Body() dto: SalvarEquipamentoDto): Promise<EquipamentoResposta> {
    return EquipamentoResposta.de(await this.servico.criar(dto));
  }

  @Put(':id')
  @Permite((u) => u.podeGerenciarEquipamentos())
  @ApiOperation({ summary: 'Editar equipamento (gestor)' })
  async atualizar(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SalvarEquipamentoDto): Promise<EquipamentoResposta> {
    return EquipamentoResposta.de(await this.servico.atualizar(id, dto));
  }

  @Patch(':id/inativar')
  @Permite((u) => u.podeGerenciarEquipamentos())
  @ApiOperation({ summary: 'Inativar equipamento (gestor)' })
  async inativar(@Param('id', ParseUUIDPipe) id: string): Promise<EquipamentoResposta> {
    return EquipamentoResposta.de(await this.servico.inativar(id));
  }

  @Patch(':id/reativar')
  @Permite((u) => u.podeGerenciarEquipamentos())
  @ApiOperation({ summary: 'Reativar equipamento (gestor)' })
  async reativar(@Param('id', ParseUUIDPipe) id: string): Promise<EquipamentoResposta> {
    return EquipamentoResposta.de(await this.servico.reativar(id));
  }
}
