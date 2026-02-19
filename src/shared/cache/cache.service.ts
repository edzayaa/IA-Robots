import type { Redis } from 'ioredis';
import { appConfig } from '#config/app.js';
import { safeJsonParse } from '../utils/safe-json.js';

export class CacheService {
    constructor(private readonly redis: Redis | null) { }

    private getKey(key: string): string {
        return `${appConfig.redisKeyPrefix}${key}`;
    }

    async get<T>(key: string): Promise<T | null> {
        if (!this.redis) return null;

        try {
            const value = await this.redis.get(this.getKey(key));
            return value ? safeJsonParse<T>(value, null as T) : null;
        } catch {
            return null;
        }
    }

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean> {
        if (!this.redis) return false;

        try {
            const serialized = JSON.stringify(value);
            const ttl = ttlSeconds ?? appConfig.cacheTtlSeconds;
            await this.redis.setex(this.getKey(key), ttl, serialized);
            return true;
        } catch {
            return false;
        }
    }

    async del(key: string): Promise<boolean> {
        if (!this.redis) return false;

        try {
            await this.redis.del(this.getKey(key));
            return true;
        } catch {
            return false;
        }
    }

    async exists(key: string): Promise<boolean> {
        if (!this.redis) return false;

        try {
            const result = await this.redis.exists(this.getKey(key));
            return result === 1;
        } catch {
            return false;
        }
    }

    async flush(pattern?: string): Promise<boolean> {
        if (!this.redis) return false;

        try {
            const searchKey = pattern ? this.getKey(pattern) : `${appConfig.redisKeyPrefix}*`;
            const keys = await this.redis.keys(searchKey);
            if (keys.length > 0) {
                await this.redis.del(...keys);
            }
            return true;
        } catch {
            return false;
        }
    }
}
