import type { Metadata } from "next";
import Link from "next/link";
import ApplicationForm from "./ApplicationForm";
import PaymentInfo from "./PaymentInfo";

export const metadata: Metadata = {
  title: "참가 신청 | 아무사람대잔치",
  description: "아무사람대잔치 참가 신청서입니다.",
};

export default function ApplyPage() {
  const applicationsOpen = process.env.AMSR_APPLICATIONS_OPEN === "true";

  return (
    <main className="apply-page">
      <header className="apply-header">
        <Link href="/" className="brand" aria-label="아무사람대잔치 홈으로">
          <span className="brand-mark" aria-hidden="true" />
          <span>AMSR</span>
        </Link>
        <Link className="back-link" href="/">← 소개로 돌아가기</Link>
      </header>

      <section className="apply-intro">
        <p className="eyebrow">APPLICATION / 2026</p>
        <h1>처음엔 신청서부터<br />아는 사이가 됩니다.</h1>
        <p>
          참가 확인과 원활한 진행을 위해 몇 가지만 물어볼게요.
          답변은 행사 운영 외의 목적으로 사용하지 않습니다.
        </p>
        {!applicationsOpen && (
          <div className="preview-notice">
            <strong>현재는 신청서 미리보기 기간입니다.</strong>
            <span>신청 서버를 연결하면 이 안내 없이 바로 접수할 수 있어요.</span>
          </div>
        )}
        <details className="apply-payment">
          <summary>참가비 입금 안내 보기 ↓</summary>
          <PaymentInfo />
        </details>
      </section>

      <ApplicationForm applicationsOpen={applicationsOpen} />
    </main>
  );
}
