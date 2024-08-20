// ckeditor.d.ts
import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

declare module '@ckeditor/ckeditor5-core/src/editor/editorconfig' {
  interface EditorConfig {
    content?: {
      styles?: Array<{ name: string; element: string }>;
    };
  }
}