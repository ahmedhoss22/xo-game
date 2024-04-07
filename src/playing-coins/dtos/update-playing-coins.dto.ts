import { PartialType } from '@nestjs/mapped-types'
import { PlayingCoinsDto } from './Playing-coins.dto'
export class UpdatePlayingCoinsDto extends PartialType(PlayingCoinsDto) {}
