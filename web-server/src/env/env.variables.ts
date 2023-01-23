import { IsOptional, IsString } from "class-validator";

export class EnvironmentVariables {
    
    @IsOptional()
    LISTEN_PORT: number = 3098;

    @IsOptional()
    GOOGLE_MAPS_API_KEY: string;

    @IsString()
    WEBLATE_API_KEY: string;

    @IsOptional()
    WEBLATE_HOST: string = 'weblate';

    @IsOptional()
    WEBLATE_PORT: number = 8080;

    @IsString()
    WEBLATE_PROJECT: string = 'liga-manager';

    @IsString()
    WEBLATE_COMPONENT: string = 'liga-manager-ui';
}
