import ViewEvent from "../viewEvent";

export const HtmlDefines = {
  UPLOADED_ID_GIF: "gif_uploaded",
  UPLOADED_ID_MAP: "dat_uploaded",
  INPUT_ID_GIF: "gif_file",
  INPUT_ID_MAP: "dat_file",
  GIF_SRC_PREVIEW: "gif_src_preview",

  IS_LOADING: "is_loading",
  ERROR_MESSAGE: "error_message",

  CANVAS_GIF_MAP_PREVIEW: "gif_map_preview",
  GIF_MAP_DOWNLOAD: "gif_map_download",
  GIF_MAP_DOWNLOAD_BUTTON: "git_map_download_button",
} as const;
export type HtmlDefines = (typeof HtmlDefines)[keyof typeof HtmlDefines];

export class View {
  private static adjustCanvas = (canvas: HTMLCanvasElement): void => {
    const scale = window.devicePixelRatio;
    canvas.width = window.innerWidth * scale * 2;
    canvas.height = window.innerHeight * scale * 2;
  };

  public constructor(viewEvent: ViewEvent) {
    const canvas = document.getElementById("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      if ("ontouchstart" in window) {
        const onTouchStartEvent = ((e: TouchEvent) => {
          e.preventDefault();
        }) as EventListener;
        const onTouchMoveEvent = ((e: TouchEvent) => {
          e.preventDefault();
          viewEvent.onTouchScroll(e.touches[0].pageY);
        }) as EventListener;
        canvas.addEventListener("touchstart", onTouchStartEvent, {
          passive: false,
        });
        canvas.addEventListener("touchend", onTouchStartEvent, {
          passive: false,
        });
        canvas.addEventListener("touchcancel", onTouchStartEvent, {
          passive: false,
        });
        canvas.addEventListener("touchmove", onTouchMoveEvent, {
          passive: false,
        });
      } else {
        canvas.onwheel = (e: WheelEvent) => {
          viewEvent.onScroll(e.deltaY);
        };
      }
      window.onresize = () => {
        View.adjustCanvas(canvas);
      };
      const context = canvas.getContext("2d");
      if (context instanceof CanvasRenderingContext2D) {
        View.adjustCanvas(canvas);
        viewEvent.onCanvasReady(context);
      }
    }
  }
}
