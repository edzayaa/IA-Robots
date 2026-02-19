export const cacheTTLs = {
    products: {
        list: 300,
        detail: 600,
        search: 120,
        popular: 900
    },
    blog: {
        posts: 1800,
        detail: 3600
    },
    user: {
        profile: 300,
        preferences: 600
    },
    static: {
        config: 86400,
        translations: 3600
    }
};

export type CacheCategory = keyof typeof cacheTTLs;
export type CacheSubType<T extends CacheCategory> = keyof typeof cacheTTLs[T];

export const generateCacheKey = (
    category: string,
    subType: string,
    identifier: string | Record<string, any>
): string => {
    const id = typeof identifier === 'string'
        ? identifier
        : Buffer.from(JSON.stringify(identifier)).toString('base64').slice(0, 20);
    return `cache:${category}:${subType}:${id}`;
};

export const getCacheTTL = <T extends CacheCategory>(
    category: T,
    subType: CacheSubType<T>
): number => {
    return (cacheTTLs[category] as any)[subType] || 300;
};
