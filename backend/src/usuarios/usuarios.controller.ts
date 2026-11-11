import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permite } from '../auth/permissao.decorator';
import { AtualizarUsuarioDto, CriarUsuarioDto, UsuarioResposta } from './dto/usuario.dto';
import { UsuariosService } from './usuarios.service';

/** Gestão de usuários e perfis (UH02). Somente administradores (UH02-CA06). */
@ApiTags('Usuários')
@ApiBearerAuth()
@Permite((u) => u.podeGerenciarUsuarios())
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly servico: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  async criar(@Body() dto: CriarUsuarioDto): Promise<UsuarioResposta> {
    return UsuarioResposta.de(await this.servico.criar(dto));
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  async listar(): Promise<UsuarioResposta[]> {
    return (await this.servico.listar()).map((u) => UsuarioResposta.de(u));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar usuário' })
  async buscar(@Param('id', ParseUUIDPipe) id: string): Promise<UsuarioResposta> {
    return UsuarioResposta.de(await this.servico.buscar(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Editar nome, e-mail e perfil' })
  async atualizar(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AtualizarUsuarioDto): Promise<UsuarioResposta> {
    return UsuarioResposta.de(await this.servico.atualizar(id, dto));
  }

  @Patch(':id/inativar')
  @ApiOperation({ summary: 'Inativar usuário (o histórico é preservado)' })
  async inativar(@Param('id', ParseUUIDPipe) id: string): Promise<UsuarioResposta> {
    return UsuarioResposta.de(await this.servico.inativar(id));
  }

  @Patch(':id/reativar')
  @ApiOperation({ summary: 'Reativar usuário' })
  async reativar(@Param('id', ParseUUIDPipe) id: string): Promise<UsuarioResposta> {
    return UsuarioResposta.de(await this.servico.reativar(id));
  }
}
