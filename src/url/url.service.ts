import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { Base62 } from 'src/utils/base62.util';

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService) {}

    async shorten(dto: ShortenUrlDto) {
        const existing = await this.prisma.url.findFirst({
            where: { longUrl: dto.longUrl },
        });
        if (existing) return;

        const urlRecord = await this.prisma.url.create({
            data: {
                longUrl: dto.longUrl,
                shortCode: '',
            },
        });

        const shortCode = Base62.encode(urlRecord.id);

        return this.prisma.url.update({
            where: { id: urlRecord.id },
            data: { shortCode },
        });
    }

    async getOriginalUrl(shortCode: string) {
        const record = await this.prisma.url.findUnique({
            where: { shortCode },
        });

        if (!record) throw new NotFoundException('Short code does not exist');
        return record.longUrl;
    }
}
