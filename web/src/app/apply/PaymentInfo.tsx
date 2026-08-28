"use client";

import { useState } from "react";
import styles from "./ApplicationForm.module.css";

export default function PaymentInfo() {
  const [copied, setCopied] = useState(false);

  return (
    <div className={styles.payment}>
      <div>
        <span>참가비</span>
        <strong>45,000원</strong>
      </div>
      <div>
        <span>입금 계좌</span>
        <strong>토스뱅크 100117758134</strong>
        <small>예금주 이태훈 · 신청하신 분 이름으로 입금해 주세요.</small>
      </div>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText("45000원 토스뱅크 이태훈 100117758134").then(
            () => setCopied(true),
            () => setCopied(false),
          );
        }}
      >
        {copied ? "계좌 정보 복사됨 ✓" : "계좌 정보 복사"}
      </button>
    </div>
  );
}
