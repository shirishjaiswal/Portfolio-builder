export type FlexAlignment = "flex-start" | "flex-end" | "center";
export type JustifySpecific = "space-between" | "space-around" | "space-evenly";
export type AlignSpecific = "stretch" | "baseline";
export type JustifyContentCSS = FlexAlignment | JustifySpecific;
export type AlignItemsCSS = FlexAlignment | AlignSpecific;
export type JustifyContent =
  | "Left"
  | "Right"
  | "Center"
  | "Between"
  | "Around"
  | "Evenly";
export type AlignItems = "Start" | "Center" | "End" | "Stretch" | "Baseline";

export type SpacingSize = "small" | "medium" | "large" | "auto";
export type TextAlignment = "left" | "right" | "center" | "justify";
export type Padding = "Small" | "Medium" | "Large" | "Auto";
export type Margin = "Small" | "Medium" | "Large" | "Auto";
export type TextAlign = "Left" | "Right" | "Center" | "Justify";
export type Color =
  | `#${string}`
  | `rgb(${number},${number},${number})`
  | `rgba(${number},${number},${number},${number})`
  | {
      type: "linear" | "radial";
      angle?: `${number}deg`; // only for linear gradients
      shape?: "circle" | "ellipse"; // only for radial gradients
      colors: (
        | string
        | `#${string}`
        | `rgb(${number},${number},${number})`
        | `rgba(${number},${number},${number},${number})`
      )[];
    };

export type FontStyle = "normal" | "italic" | "oblique";
export type FontWeight =
  | "normal"
  | "bold"
  | "bolder"
  | "lighter"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
export type FontSize =
  | `${number}px`
  | `${number}em`
  | `${number}rem`
  | `${number}%`
  | `${number}vh`
  | `${number}vw`
  | "small"
  | "medium"
  | "large";
export type FontFamily =
  | "Arial"
  | "Helvetica"
  | "Times New Roman"
  | "Courier New"
  | "Verdana"
  | "Georgia"
  | "Tahoma"
  | "Comic Sans MS"
  | string;
export type FontVariant = "normal" | "small-caps";
export type LineHeight = `${number}` | `${number}%` | "normal";
type LetterSpacing = `${number}px` | "normal";

type Position = `${number}px` | `${number}%` | `${number}em` | "auto";

class CSSBuilder {
  private styles: Record<string, string> = {};

  setJustifyContent(value: JustifyContent): this {
    const justifyContentMap: Record<JustifyContent, JustifyContentCSS> = {
      Left: "flex-start",
      Right: "flex-end",
      Center: "center",
      Between: "space-between",
      Around: "space-around",
      Evenly: "space-evenly",
    };
    this.styles.justifyContent = justifyContentMap[value];
    return this;
  }

  setAlignItems(value: AlignItems): this {
    const alignItemsMap: Record<AlignItems, AlignItemsCSS> = {
      Start: "flex-start",
      End: "flex-end",
      Center: "center",
      Stretch: "stretch",
      Baseline: "baseline",
    };
    this.styles.alignItems = alignItemsMap[value];
    return this;
  }

  setPadding(value: Padding): this {
    const paddingMap: Record<Padding, SpacingSize> = {
      Small: "small",
      Medium: "medium",
      Large: "large",
      Auto: "auto",
    };
    this.styles.padding = paddingMap[value];
    return this;
  }

  setMargin(value: Margin): this {
    const marginMap: Record<Margin, SpacingSize> = {
      Small: "small",
      Medium: "medium",
      Large: "large",
      Auto: "auto",
    };
    this.styles.margin = marginMap[value];
    return this;
  }

  setTextAlign(value: TextAlign): this {
    const textAlignMap: Record<TextAlign, TextAlignment> = {
      Left: "left",
      Right: "right",
      Center: "center",
      Justify: "justify",
    };
    this.styles.textAlign = textAlignMap[value];
    return this;
  }

  setColor(color: Color): this {
    if (typeof color === "string") {
      this.styles.color = color;
    } else if (color.type === "linear") {
      const gradientColors = color.colors.join(", ");
      this.styles.background = `linear-gradient(${
        color.angle ?? "0deg"
      }, ${gradientColors})`;
    } else if (color.type === "radial") {
      const shape = color.shape ? `${color.shape}, ` : "";
      const gradientColors = color.colors.join(", ");
      this.styles.background = `radial-gradient(${shape}${gradientColors})`;
    }
    return this;
  }

  setFont(properties: {
    style?: FontStyle;
    weight?: FontWeight;
    size?: FontSize;
    family?: FontFamily;
    variant?: FontVariant;
    lineHeight?: LineHeight;
    letterSpacing?: LetterSpacing;
  }): this {
    const {
      style = "normal",
      weight = "normal",
      size = "medium",
      family = "Arial",
      variant = "normal",
      lineHeight = "normal",
      letterSpacing = "normal",
    } = properties;
    Object.assign(this.styles, {
      fontStyle: style,
      fontWeight: weight.toString(),
      fontSize: size,
      fontFamily: family,
      fontVariant: variant,
      lineHeight,
      letterSpacing,
    });

    return this;
  }

  setTop(value: Position): this {
    this.styles.top = value;
    return this;
  }

  setBottom(value: Position): this {
    this.styles.bottom = value;
    return this;
  }

  setLeft(value: Position): this {
    this.styles.left = value;
    return this;
  }

  setRight(value: Position): this {
    this.styles.right = value;
    return this;
  }

  getCSS(): string {
    return Object.entries(this.styles)
      .map(([key, value]) => `${key}: ${value};`)
      .join(" ");
  }
}

// Usage
const css = new CSSBuilder()
  .setJustifyContent("Center")
  .setAlignItems("Start")
  .setPadding("Large")
  .setMargin("Auto")
  .setTextAlign("Right")
  .setColor({ type: "linear", angle: "45deg", colors: ["#ff0000", "#00ff00"] })
  .setFont({
    style: "italic",
    weight: 700,
    size: "16px",
    family: "Helvetica",
    variant: "small-caps",
    lineHeight: "1.5",
    letterSpacing: "1px",
  })
  .getCSS();

console.log(css); // Outputs the complete CSS string
