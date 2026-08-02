import type { CSSProperties } from 'react';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      'model-viewer': {
        children?: React.ReactNode;
        ref?: React.Ref<HTMLElement>;
        className?: string;
        style?: CSSProperties;
        src?: string;
        alt?: string;
        poster?: string;
        exposure?: string;
        reveal?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'rotate-per-second'?: string;
        'rotation-per-second'?: string;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        'shadow-softness'?: string;
        'field-of-view'?: string;
        'camera-orbit'?: string;
        'disable-zoom'?: boolean;
        'environment-image'?: string;
        'interaction-prompt'?: string;
      };
    }
  }
}

export {};