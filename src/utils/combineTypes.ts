type Prettify<T> = {
    [K in keyof T]: T[K]
} & {};

/**
 * Combine 2 types into one
 */
export type Combine<T1, T2> = Prettify<
    {
        [K in keyof (T1 | T2)]: T1[K] | T2[K];
    } & Partial<T1 & T2>
>;
