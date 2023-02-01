import { IsOptional, IsString } from "class-validator";

export class EnvironmentVariables {
    
    @IsOptional()
    LISTEN_PORT: number = 3098;

    @IsOptional()
    GOOGLE_MAPS_API_KEY: string;

}
