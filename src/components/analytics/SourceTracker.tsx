"use client";

import { useEffect } from "react";
import { captureFirstTouchSource } from "@/lib/source-tracking";

// 不渲染任何东西,只在客户端挂载时记一下"访客第一次从哪来"(见 src/lib/source-tracking.ts)。
// 挂在根 layout 里,四个语言的每个页面都会经过。
export default function SourceTracker() {
  useEffect(() => {
    captureFirstTouchSource();
  }, []);

  return null;
}
