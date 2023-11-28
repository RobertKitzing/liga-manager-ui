import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  Header,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { createReadStream, existsSync, renameSync } from 'fs';
import { join } from 'path';

class TeamLogoUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

const teamLogoLocation = './assets/team-logos/originals';

@Controller('team-logo')
@ApiTags('team-logo')
export class TeamLogoController {
  @Get(':teamId')
  @Header('Content-Type', 'image/png')
  getTeamLogo(@Param('teamId') teamId: string) {
    let fileName = `${teamLogoLocation}/${teamId}`;
    if (!existsSync(fileName)) {
      fileName = './assets/default-team-logo.png';
    }
    const file = createReadStream(join(process.cwd(), fileName));
    return new StreamableFile(file);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: teamLogoLocation,
        filename: (req, file, callback) => {
          const teamId = req.params.teamId;
          callback(null, `${teamId}-preview`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: TeamLogoUploadDto,
  })
  @Post(':teamId')
  @ApiOperation({ operationId: 'uploadTeamLogo' })
  uploadTeamLogo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('teamId') teamId: string,
  ) {}

  @Post(':teamId/commit')
  @ApiOperation({ operationId: 'commitPreview' })
  commitPreview(@Param('teamId') teamId: string) {
    if (!existsSync(`${teamLogoLocation}/${teamId}-preview`)) {
      throw new BadRequestException('No preview logo');
    }
    renameSync(
      `${teamLogoLocation}/${teamId}-preview`,
      `${teamLogoLocation}/${teamId}`,
    );
  }
}
