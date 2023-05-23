import { BadRequestException, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { existsSync, renameSync } from 'fs';

class TeamLogoUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}

const teamLogoLocation = './client/team-logos/'

@Controller('team-logo')
@ApiTags('team-logo')
export class TeamLogoController {

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: teamLogoLocation,
                filename: (req, file, callback) => {
                    const teamId = req.params.teamId;
                    callback(null, `${teamId}-preview`)
                },
            })
        })
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
        ) file: Express.Multer.File,
        @Param('teamId') teamId: string
    ) {
    }

    @Post(':teamId/commit')
    @ApiOperation({ operationId: 'commitPreview' })
    commitPreview(
        @Param('teamId') teamId: string
    ) {
        if (!existsSync(`${teamLogoLocation}/${teamId}-preview`)) {
            throw new BadRequestException('No preview logo');
        }
        renameSync(`${teamLogoLocation}/${teamId}-preview`, `${teamLogoLocation}/${teamId}`)
    }
}
