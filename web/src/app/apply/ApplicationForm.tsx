"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./ApplicationForm.module.css";

type AttendanceType = "" | "first" | "returning";

const mbtiTypes = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

type FormValues = {
  attendanceType: AttendanceType;
  guestName: string;
  invitedBy: string;
  name: string;
  phone: string;
  birthYear: string;
  mbti: string;
  drinkLevel: string;
  oneLiner: string;
  requirements: string;
  privacyConsent: boolean;
  website: string;
};

const oneLinerLength = (value: string) => [...value.replace(/\s/g, "")].length;

type ValidatedField = "guestName" | "name" | "phone" | "birthYear" | "mbti" | "drinkLevel" | "oneLiner" | "privacyConsent";
type FieldErrors = Partial<Record<ValidatedField, string>>;
type TouchedFields = Partial<Record<ValidatedField, boolean>>;

const initialValues: FormValues = {
  attendanceType: "",
  guestName: "",
  invitedBy: "",
  name: "",
  phone: "",
  birthYear: "",
  mbti: "",
  drinkLevel: "",
  oneLiner: "",
  requirements: "",
  privacyConsent: false,
  website: "",
};

const validatedFields: ValidatedField[] = [
  "guestName",
  "name",
  "phone",
  "birthYear",
  "mbti",
  "drinkLevel",
  "oneLiner",
  "privacyConsent",
];

const isValidatedField = (field: keyof FormValues): field is ValidatedField =>
  validatedFields.includes(field as ValidatedField);

const getFieldError = (field: ValidatedField, values: FormValues) => {
  if (field === "guestName" && values.attendanceType === "returning" && values.guestName.trim().length < 2) {
    return "함께 오는 새 사람의 이름을 두 글자 이상 입력해 주세요.";
  }
  if (field === "name" && values.name.trim().length < 2) {
    return "이름을 두 글자 이상 입력해 주세요.";
  }
  if (field === "phone" && !/^01[016789]\d{7,8}$/.test(values.phone.replaceAll("-", ""))) {
    return "연락 가능한 휴대전화 번호를 확인해 주세요.";
  }
  if (field === "birthYear") {
    const year = Number(values.birthYear);
    if (!Number.isInteger(year) || year < 1980 || year > 2010) {
      return "출생연도를 네 자리로 입력해 주세요.";
    }
  }
  if (field === "mbti" && !values.mbti) {
    return "MBTI를 선택해 주세요.";
  }
  if (field === "drinkLevel" && !values.drinkLevel) {
    return "음주 정도를 선택해 주세요.";
  }
  if (field === "oneLiner" && oneLinerLength(values.oneLiner) !== 12) {
    return "공백 빼고 딱 12자로 맞춰 주세요.";
  }
  if (field === "privacyConsent" && !values.privacyConsent) {
    return "참가 신청을 위해 개인정보 수집·이용 동의가 필요합니다.";
  }
  return "";
};

type Props = { applicationsOpen: boolean };

export default function ApplicationForm({ applicationsOpen }: Props) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [submissionError, setSubmissionError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => `${Math.round((step / 2) * 100)}%`, [step]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    const nextValues = { ...values, [key]: value };
    setValues(nextValues);
    setSubmissionError("");

    if (isValidatedField(key) && touchedFields[key]) {
      setFieldErrors((current) => ({ ...current, [key]: getFieldError(key, nextValues) }));
    }

    if (key === "attendanceType" && value !== "returning") {
      setTouchedFields((current) => ({ ...current, guestName: false }));
      setFieldErrors((current) => ({ ...current, guestName: "" }));
    }
  };

  const validateOnBlur = (field: ValidatedField) => {
    setTouchedFields((current) => ({ ...current, [field]: true }));
    setFieldErrors((current) => ({ ...current, [field]: getFieldError(field, values) }));
    setSubmissionError("");
  };

  const stepOneReady =
    values.attendanceType === "first" ||
    (values.attendanceType === "returning" && !getFieldError("guestName", values));
  const stepTwoFields: ValidatedField[] = ["name", "phone", "birthYear", "mbti", "drinkLevel", "oneLiner", "privacyConsent"];
  const stepTwoReady = stepTwoFields.every((field) => !getFieldError(field, values));

  const goNext = () => {
    if (!stepOneReady) return;
    setStep((current) => Math.min(2, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setSubmissionError("");
    setStep((current) => Math.max(1, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stepTwoReady) return;
    if (!applicationsOpen) {
      setSubmissionError("아직 신청 접수를 열지 않았어요. 폼 구성만 미리 확인할 수 있습니다.");
      return;
    }

    setSubmitting(true);
    setSubmissionError("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(payload.message || "신청서를 보내지 못했어요.");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (reason) {
      setSubmissionError(reason instanceof Error ? reason.message : "잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className={styles.success} aria-live="polite">
        <span>DONE!</span>
        <h2>신청서를 받았어요.</h2>
        <p>아래 계좌로 참가비를 입금해 주세요. 입금이 확인되면 참가 확정 안내를 보내드려요.</p>
        <div className={styles.payment}>
          <div>
            <span>참가비</span>
            <strong>45,000원</strong>
          </div>
          <div>
            <span>입금 계좌</span>
            <strong>토스뱅크 100181341775</strong>
            <small>예금주 이태훈 · 신청하신 분 이름으로 입금해 주세요.</small>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText("토스뱅크 100181341775 이태훈 45000원").then(
                () => setAccountCopied(true),
                () => setAccountCopied(false),
              );
            }}
          >
            {accountCopied ? "계좌 정보 복사됨 ✓" : "계좌 정보 복사"}
          </button>
        </div>
        <Link href="/">아무사람대잔치 소개로 돌아가기 ↗</Link>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.progress} aria-label={`신청 단계 ${step}/2`}>
        <div><span>STEP {step}</span><span>{step} / 2</span></div>
        <i style={{ width: progress }} />
      </div>

      {step === 1 && (
        <fieldset className={styles.step}>
          <legend>암사대에<br />와본 적 있나요?</legend>
          <p className={styles.lead}>참가 경험에 따라 딱 하나의 규칙이 달라집니다.</p>
          <div className={styles.choiceGrid}>
            <label className={values.attendanceType === "first" ? styles.selected : ""}>
              <input
                type="radio"
                name="attendanceType"
                value="first"
                checked={values.attendanceType === "first"}
                onChange={() => update("attendanceType", "first")}
              />
              <span className={styles.choiceNumber}>01</span>
              <strong>처음이에요</strong>
              <small>혼자 와도, 초대받아 와도 괜찮아요.</small>
            </label>
            <label className={values.attendanceType === "returning" ? styles.selected : ""}>
              <input
                type="radio"
                name="attendanceType"
                value="returning"
                checked={values.attendanceType === "returning"}
                onChange={() => update("attendanceType", "returning")}
              />
              <span className={styles.choiceNumber}>02</span>
              <strong>와봤어요</strong>
              <small>이번이 처음인 사람과 함께 와야 해요.</small>
            </label>
          </div>

          {values.attendanceType === "returning" && (
            <label className={styles.field}>
              <span>함께 오는 새 사람 이름 <b>필수</b></span>
              <input
                name="guestName"
                value={values.guestName}
                onChange={(event) => update("guestName", event.target.value)}
                onBlur={() => validateOnBlur("guestName")}
                placeholder="아직 정하지 못했다면 신청 전에 먼저 섭외해 주세요"
                autoComplete="off"
                aria-invalid={Boolean(fieldErrors.guestName)}
                aria-describedby={fieldErrors.guestName ? "guestName-error" : undefined}
              />
              {fieldErrors.guestName && (
                <small id="guestName-error" className={styles.fieldError} role="alert">{fieldErrors.guestName}</small>
              )}
            </label>
          )}

          {values.attendanceType === "first" && (
            <label className={styles.field}>
              <span>나를 초대한 사람 <em>선택</em></span>
              <input
                name="invitedBy"
                value={values.invitedBy}
                onChange={(event) => update("invitedBy", event.target.value)}
                placeholder="혼자 신청한다면 비워두세요"
                autoComplete="off"
              />
            </label>
          )}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className={styles.step}>
          <legend>조 편성에 필요한<br />기본 정보예요.</legend>
          <p className={styles.lead}>연락과 조 편성에 필요한 만큼만 받을게요.</p>
          <div className={styles.twoColumns}>
            <label className={styles.field}>
              <span>이름 <b>필수</b></span>
              <input
                name="name"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                onBlur={() => validateOnBlur("name")}
                placeholder="홍길동"
                autoComplete="name"
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
              {fieldErrors.name && (
                <small id="name-error" className={styles.fieldError} role="alert">{fieldErrors.name}</small>
              )}
            </label>
            <label className={styles.field}>
              <span>출생연도 <b>필수</b></span>
              <input
                name="birthYear"
                value={values.birthYear}
                onChange={(event) => update("birthYear", event.target.value.replace(/\D/g, "").slice(0, 4))}
                onBlur={() => validateOnBlur("birthYear")}
                placeholder="1996"
                inputMode="numeric"
                autoComplete="bday-year"
                aria-invalid={Boolean(fieldErrors.birthYear)}
                aria-describedby={fieldErrors.birthYear ? "birthYear-error" : undefined}
              />
              {fieldErrors.birthYear && (
                <small id="birthYear-error" className={styles.fieldError} role="alert">{fieldErrors.birthYear}</small>
              )}
            </label>
          </div>
          <div className={styles.twoColumns}>
            <label className={styles.field}>
              <span>휴대전화 번호 <b>필수</b></span>
              <input
                name="phone"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value.replace(/\D/g, "").slice(0, 11))}
                onBlur={() => validateOnBlur("phone")}
                placeholder="01012345678"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              />
              {fieldErrors.phone && (
                <small id="phone-error" className={styles.fieldError} role="alert">{fieldErrors.phone}</small>
              )}
            </label>
            <label className={styles.field}>
              <span>MBTI <b>필수</b></span>
              <select
                name="mbti"
                value={values.mbti}
                onChange={(event) => update("mbti", event.target.value)}
                onBlur={() => validateOnBlur("mbti")}
                aria-invalid={Boolean(fieldErrors.mbti)}
                aria-describedby={fieldErrors.mbti ? "mbti-error" : undefined}
              >
                <option value="">선택해 주세요</option>
                {mbtiTypes.map((mbti) => <option value={mbti} key={mbti}>{mbti}</option>)}
              </select>
              {fieldErrors.mbti && (
                <small id="mbti-error" className={styles.fieldError} role="alert">{fieldErrors.mbti}</small>
              )}
            </label>
          </div>
          <label className={styles.field}>
            <span>술은 어느 정도? <b>필수</b></span>
            <select
              name="drinkLevel"
              value={values.drinkLevel}
              onChange={(event) => update("drinkLevel", event.target.value)}
              onBlur={() => validateOnBlur("drinkLevel")}
              aria-invalid={Boolean(fieldErrors.drinkLevel)}
              aria-describedby={fieldErrors.drinkLevel ? "drinkLevel-error" : undefined}
            >
              <option value="">선택해 주세요</option>
              <option value="none">안마셔요</option>
              <option value="light">가볍게 마셔요</option>
              <option value="enjoy">잘 마시는 편이에요</option>
            </select>
            {fieldErrors.drinkLevel && (
              <small id="drinkLevel-error" className={styles.fieldError} role="alert">{fieldErrors.drinkLevel}</small>
            )}
          </label>
          <label className={styles.field}>
            <span>나에 대한 한줄 설명 <b>필수</b></span>
            <input
              name="oneLiner"
              value={values.oneLiner}
              onChange={(event) => update("oneLiner", event.target.value)}
              onBlur={() => validateOnBlur("oneLiner")}
              placeholder="낯가리지만 금방 친해지는 편"
              maxLength={30}
              autoComplete="off"
              aria-invalid={Boolean(fieldErrors.oneLiner)}
              aria-describedby={fieldErrors.oneLiner ? "oneLiner-error" : "oneLiner-count"}
            />
            <small id="oneLiner-count">공백 제외 {oneLinerLength(values.oneLiner)} / 12자</small>
            {fieldErrors.oneLiner && (
              <small id="oneLiner-error" className={styles.fieldError} role="alert">{fieldErrors.oneLiner}</small>
            )}
          </label>
          <label className={styles.field}>
            <span>요구사항 <em>선택</em></span>
            <textarea
              name="requirements"
              value={values.requirements}
              onChange={(event) => update("requirements", event.target.value)}
              placeholder="운영진에게 전할 요청을 적어 주세요"
              maxLength={500}
            />
            <small>{values.requirements.length} / 500</small>
          </label>
          <div className={styles.consentBox}>
            <label>
              <input
                type="checkbox"
                checked={values.privacyConsent}
                onChange={(event) => update("privacyConsent", event.target.checked)}
                onBlur={() => validateOnBlur("privacyConsent")}
                aria-invalid={Boolean(fieldErrors.privacyConsent)}
                aria-describedby={fieldErrors.privacyConsent ? "privacyConsent-error" : undefined}
              />
              <span><b>필수</b> 행사 안내를 위한 개인정보 수집·이용에 동의합니다.</span>
            </label>
            {fieldErrors.privacyConsent && (
              <small id="privacyConsent-error" className={styles.consentError} role="alert">
                {fieldErrors.privacyConsent}
              </small>
            )}
          </div>
          <label className={styles.honeypot} aria-hidden="true">
            Website
            <input
              name="website"
              value={values.website}
              onChange={(event) => update("website", event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </fieldset>
      )}

      {submissionError && <p className={styles.error} role="alert">{submissionError}</p>}

      <div className={styles.actions}>
        {step > 1 && <button type="button" className={styles.back} onClick={goBack}>이전</button>}
        {step < 2 ? (
          <button
            type="button"
            className={styles.next}
            disabled={!stepOneReady}
            onClick={(event) => {
              event.preventDefault();
              goNext();
            }}
          >
            다음 단계 ↗
          </button>
        ) : (
          <button type="submit" className={styles.next} disabled={submitting || !stepTwoReady} aria-busy={submitting}>
            {submitting ? "보내는 중…" : applicationsOpen ? "참가 신청 보내기 ↗" : "신청 접수 준비 중"}
          </button>
        )}
      </div>
    </form>
  );
}
