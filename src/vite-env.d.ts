/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'lord-icon': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        trigger?: string;
        colors?: string;
        stroke?: string;
        state?: string;
        target?: string;
      },
      HTMLElement
    >;
  }
}
