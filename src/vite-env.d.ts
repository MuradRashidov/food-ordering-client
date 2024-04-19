/// <reference types="vite/client" /> 

interface ImportMeta {
    readonly env: {
      VITE_AUTH0_DOMAIN: string;
      VITE_AUTH0_CLIENTID: string;
      VITE_AUTH0_CALLBACK_URL: string;
      // Diğer çevre değişkenleri buraya eklenebilir
    };
  }
  