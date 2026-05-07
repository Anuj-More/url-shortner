import { IsNotEmpty, isNotEmpty, IsUrl } from "class-validator";


export class ShortenUrlDto {
    @IsNotEmpty()
    @IsUrl({}, {message: "Please provide a valid URL (including http/https)"})
    longUrl!: string;
}