"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef } from "react";

const scenes = [
  { file: "scene-01.jpg", width: 960, height: 720, caption: "거실이 꽉 찼던 밤" },
  { file: "scene-02.jpg", width: 960, height: 720, caption: "건배 준비 완료" },
  { file: "scene-03.jpg", width: 960, height: 720, caption: "단체사진은 국룰" },
  { file: "scene-04.jpg", width: 540, height: 720, caption: "이날 처음 만난 사이" },
  { file: "scene-05.jpg", width: 960, height: 720, caption: "정직한 결산" },
  { file: "scene-06.jpg", width: 960, height: 720, caption: "파란 조명 편" },
  { file: "scene-07.jpg", width: 960, height: 720, caption: "한강 편" },
  { file: "scene-08.jpg", width: 960, height: 720, caption: "치킨은 넉넉하게" },
  { file: "scene-09.jpg", width: 960, height: 720, caption: "제일 컸던 판" },
  { file: "scene-11.jpg", width: 540, height: 720, caption: "입구부터 이 텐션" },
  { file: "scene-10.jpg", width: 960, height: 720, caption: "건배사 직전" },
  { file: "scene-12.jpg", width: 540, height: 720, caption: "조는 흩어져 앉기" },
  { file: "scene-13.jpg", width: 960, height: 720, caption: "저녁부터 시작" },
  { file: "scene-14.jpg", width: 960, height: 720, caption: "어색함 녹이는 중" },
  { file: "scene-15.jpg", width: 1080, height: 720, caption: "잔디밭 편" },
  { file: "scene-16.jpg", width: 1080, height: 720, caption: "피크닉 상차림" },
  { file: "scene-17.jpg", width: 1080, height: 720, caption: "해가 진 다음" },
  { file: "scene-18.jpg", width: 1080, height: 720, caption: "폰 플래시 엔딩" },
] as const;

function SceneRun({ decorative }: { decorative?: boolean }) {
  return (
    <ul className="scenes-run" aria-hidden={decorative || undefined}>
      {scenes.map((scene) => (
        <li className="scene-print" key={scene.file}>
          <img
            src={`/photos/${scene.file}`}
            width={scene.width}
            height={scene.height}
            alt={decorative ? "" : `지난 아무사람대잔치 — ${scene.caption}`}
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}

export default function SceneStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const idleAt = useRef(0);
  const drag = useRef<{ startX: number; startScroll: number } | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const markInteraction = () => {
      idleAt.current = performance.now();
    };
    scroller.addEventListener("wheel", markInteraction, { passive: true });
    scroller.addEventListener("touchmove", markInteraction, { passive: true });

    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;
      const half = scroller.scrollWidth / 2;
      if (half > 0) {
        const speed = half / 40; // 한 바퀴(사진 18장)에 40초
        const idle = now - idleAt.current > 1200 && !drag.current;
        if (!reduced && idle) scroller.scrollLeft += (speed * delta) / 1000;
        if (scroller.scrollLeft >= half + 1) scroller.scrollLeft -= half;
        else if (scroller.scrollLeft < 1) scroller.scrollLeft += half;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      scroller.removeEventListener("wheel", markInteraction);
      scroller.removeEventListener("touchmove", markInteraction);
    };
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    drag.current = { startX: event.clientX, startScroll: scroller.scrollLeft };
    scroller.setPointerCapture(event.pointerId);
    idleAt.current = performance.now();
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || !drag.current) return;
    scroller.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
    idleAt.current = performance.now();
  };

  const onPointerEnd = () => {
    drag.current = null;
    idleAt.current = performance.now();
  };

  return (
    <div className="scenes-band">
      <div className="scenes-meta" aria-hidden="true">
        <span>ARCHIVE / REAL SCENES</span>
        <span>SINCE 2016 · 실제로 있었던 일</span>
      </div>
      <div
        className="scenes-scroller"
        ref={scrollerRef}
        role="group"
        aria-label="지난 아무사람대잔치 사진 모음"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div className="scenes-track">
          <SceneRun />
          <SceneRun decorative />
        </div>
      </div>
    </div>
  );
}
