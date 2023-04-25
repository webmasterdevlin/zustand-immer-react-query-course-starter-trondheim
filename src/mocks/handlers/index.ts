import { heroHandler } from './heroHandler';

/* This handle is not singleton. States get destroy per request. */

export const handlers = [...heroHandler];
