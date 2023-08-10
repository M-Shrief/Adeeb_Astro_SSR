/// <reference types="astro/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

interface ImportMetaEnv {
  readonly PUBLIC_API: string;
  // more env variables...
}