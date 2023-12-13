import { Body, Controller, Get, Patch, Post, Res, UseGuards, } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelDto } from './dto/level.dto';
import { Response } from 'express';
import { AuthAdminGuard, AuthGuard } from 'src/auth/local-auth/auth.guard';
import { UpdateLevelDto } from './dto/update-level.dto';

@Controller('/level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('/')
  @UseGuards(AuthAdminGuard)
  async addLevel(@Body() data: LevelDto,) {
    await this.levelService.addLevel(data)
    return "Level Added !!"
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getLevesl() {
    return await this.levelService.getLevels()
  }

  @Post("/update")
  @UseGuards(AuthAdminGuard)
  async updateLevel(@Body() data : UpdateLevelDto){
    
      await this.levelService.updateLevel(data)
      return {message: "Updated !!"}
    }
}
