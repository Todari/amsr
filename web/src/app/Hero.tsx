"use client";

import Link from "next/link";
import type { PointerEvent as ReactPointerEvent, MouseEvent as ReactMouseEvent } from "react";
import { useRef } from "react";

const confettiColors = ["#d9ff43", "#5271ff", "#ff6b4a", "#ff87b7", "#171717"];

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Hero({ applicationsOpen }: { applicationsOpen: boolean }) {
  const heroRef = useRef<HTMLElement>(null);

  const follow = (event: ReactPointerEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--mx", (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3));
    hero.style.setProperty("--my", (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3));
  };

  const release = () => {
    heroRef.current?.style.setProperty("--mx", "0");
    heroRef.current?.style.setProperty("--my", "0");
  };

  const burst = (event: ReactMouseEvent<HTMLElement>) => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion()) return;
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < 20; i += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti";
      const size = 5 + Math.random() * 7;
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;
      piece.style.width = `${size}px`;
      piece.style.height = `${Math.random() < 0.35 ? size : size * 0.55}px`;
      piece.style.background = confettiColors[i % confettiColors.length];
      if (Math.random() < 0.3) piece.style.borderRadius = "50%";
      hero.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const speed = 80 + Math.random() * 180;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed - 120;
      const spin = (Math.random() * 2 - 1) * 2;
      piece
        .animate(
          [
            { transform: "translate(0, 0) rotate(0turn)", opacity: 1 },
            { transform: `translate(${dx * 0.7}px, ${dy * 0.7}px) rotate(${spin * 0.5}turn)`, opacity: 1, offset: 0.45 },
            { transform: `translate(${dx}px, ${dy + 300}px) rotate(${spin}turn)`, opacity: 0 },
          ],
          { duration: 900 + Math.random() * 500, easing: "cubic-bezier(0.2, 0.6, 0.35, 1)" },
        )
        .addEventListener("finish", () => piece.remove());
    }
  };

  return (
    <section
      className="hero"
      id="top"
      ref={heroRef}
      onPointerMove={follow}
      onPointerLeave={release}
      onClick={burst}
    >
      <div className="hero-grid" aria-hidden="true" />
      <span className="orbit orbit-a" aria-hidden="true">A</span>
      <span className="orbit orbit-m" aria-hidden="true">M</span>
      <span className="orbit orbit-s" aria-hidden="true">S</span>
      <span className="orbit orbit-r" aria-hidden="true">R</span>

      <div className="hero-kicker">
        <span>2026 COMEBACK</span>
        <span>32 PEOPLE</span>
      </div>

      <div className="title-stage" aria-label="아무사람대잔치">
        <span className="title-copy title-copy-1" aria-hidden="true">아무사람대잔치</span>
        <span className="title-copy title-copy-2" aria-hidden="true">아무사람대잔치</span>
        <span className="title-copy title-copy-3" aria-hidden="true">아무사람대잔치</span>
        <span className="title-copy title-copy-4" aria-hidden="true">아무사람대잔치</span>
        <h1 className="title-copy title-copy-main">아무사람대잔치</h1>
      </div>

      <div className="hero-bottom">
        <p className="hero-description">
          친구의 친구가,
          <br />
          아직 모르는 내 친구일지도 모르니까.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/apply">
            {applicationsOpen ? "참가 신청하기" : "신청서 미리보기"} <span aria-hidden="true">↗</span>
          </Link>
          <a className="text-link" href="#about">이게 무슨 파티야? ↓</a>
        </div>
      </div>
    </section>
  );
}
