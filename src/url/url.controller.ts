import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) {}

    @Post('shorten')
    async shorten(@Body() dto: ShortenUrlDto){
        return this.urlService.shorten(dto);
    }

    @Get(':code')
    async redirect(@Param('code') code: string, @Res() res: Response){
        const originalUrl = await this.urlService.getOriginalUrl(code);

        return res.redirect(302, originalUrl);
    }
}
