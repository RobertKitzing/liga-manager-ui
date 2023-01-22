import { IsNumber, IsOptional, IsString } from "class-validator";

export class EnvironmentVariables {
    
    @IsOptional()
    LISTEN_PORT: number = 3098;
    
    @IsOptional()
    GRAPHQL_URL: string = 'api/graphql';

    @IsOptional()
    GRAPHQL_WS_URL: string;

    @IsOptional()
    GOOGLE_MAPS_API_KEY: string;

    @IsString()
    WEBLATE_API_KEY: string;

    @IsString()
    WEBLATE_HOST: string;

    @IsString()
    WEBLATE_PORT: string;

    @IsString()
    WEBLATE_PROJECT: string = 'liga-manager';

    @IsString()
    WEBLATE_COMPONENT: string = 'ui';
}
