import React from 'react';

// .env
declare namespace NodeJS {
  interface ProcessEnv {
    NODE: 'development' | 'production' | 'test';
  }
}

// Global type declarations for React components
declare global {
  // Any object
  type AnyObject = Record<string, unknown>;

  // React fn component with children
  type FC<T = object> = React.FunctionComponent<React.PropsWithChildren<T>>;

  // React fn component without children
  type RC<T = object> = React.FunctionComponent<T>;

  // Get available props from element (e.g. button, input, div, etc.)
  type ComponentProps<T> = React.ComponentProps<T>;
  type ReactNode = React.ReactNode;
  type CSSProperties = React.CSSProperties;

  // Page
  type PageProps = { title: string; icon: string };

  // DeepPartial utility type
  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };
}
