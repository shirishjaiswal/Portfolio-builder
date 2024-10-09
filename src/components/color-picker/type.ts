interface HSL {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
  a: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface ColorType {
  hex: string;
  hsl: HSL;
  hsv: HSV;
  oldHue: number;
  rgb: RGB;
  source: string;
}