interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // Tambahkan variabel lingkungan lain yang Anda gunakan di sini
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
