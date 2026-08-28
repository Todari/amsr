import Link from "next/link";
import Hero from "./Hero";
import SceneStrip from "./SceneStrip";

const rules = [
  {
    number: "01",
    label: "AGAIN",
    title: "와본 사람은\n새 사람과 함께",
    body: "암사대에 한 번이라도 왔다면, 이번이 처음인 사람을 꼭 데려와 주세요.",
    color: "acid",
  },
  {
    number: "02",
    label: "FIRST",
    title: "처음이라면\n혼자 와도 됨",
    body: "누군가의 초대를 받지 않았어도 괜찮아요. 첫 참가자는 혼자 신청할 수 있어요.",
    color: "blue",
  },
  {
    number: "03",
    label: "MIX",
    title: "같이 왔어도\n조는 흩어짐",
    body: "익숙한 사람 옆에만 있지 않도록 조를 섞습니다. 어색함은 운영진이 책임질게요.",
    color: "coral",
  },
] as const;

const applicationsOpen = process.env.AMSR_APPLICATIONS_OPEN === "true";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <div className="site-frame">
      <header className="topbar">
        <Link className="brand" href="#top" aria-label="아무사람대잔치 처음으로">
          <span className="brand-mark" aria-hidden="true" />
          <span>AMSR</span>
        </Link>
        <span className="topbar-note">SINCE 2016 · SEOUL</span>
        <Link className="topbar-cta" href="/apply">
          {applicationsOpen ? "신청하기" : "신청서 보기"} <Arrow />
        </Link>
      </header>

      <main>
        <Hero applicationsOpen={applicationsOpen} />

        <section className="manifesto section" id="about">
          <div className="section-index">001 / ABOUT</div>
          <div className="manifesto-copy">
            <p className="eyebrow">아무나가 아니라, 아무사람.</p>
            <h2>
              내가 좋아하는 사람이
              <br />
              자기가 좋아하는 사람을
              <br />
              데려옵니다.
            </h2>
            <p className="body-copy">
              그래서 낯설지만 완전히 무작위는 아닌 사람들이 만납니다. 2016년부터 해오던 방식 그대로,
              익숙한 인맥에서 딱 한 걸음 밖으로 나가는 32명의 파티입니다.
            </p>
          </div>
          <div className="manifesto-stamp" aria-label="처음엔 아무사람, 나갈 땐 아는 사람">
            <span>처음엔</span>
            <strong>아무사람</strong>
            <span>나갈 땐</span>
            <strong>아는 사람</strong>
          </div>
        </section>

        <section className="rules section" id="rules">
          <div className="section-heading">
            <div className="section-index">002 / RULES</div>
            <h2>참여 방법은<br />조금 이상하고 간단해요.</h2>
          </div>
          <div className="rule-grid">
            {rules.map((rule) => (
              <article className={`rule-card ${rule.color}`} key={rule.number}>
                <div className="rule-meta">
                  <span>{rule.number}</span>
                  <span>{rule.label}</span>
                </div>
                <h3>{rule.title}</h3>
                <p>{rule.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="program section" id="program">
          <div className="section-heading program-heading">
            <div className="section-index">003 / BREAK THE ICE</div>
            <h2>어색함만 살짝 녹이고,<br />나머지는 사람에게 맡깁니다.</h2>
            <p>서로의 이름을 자연스럽게 익힐 수 있는 가벼운 아이스브레이킹을 준비합니다.</p>
          </div>
          <div className="icebreaker-panel">
            <p className="icebreaker-word" aria-hidden="true">BREAK<br />THE ICE</p>
            <div className="icebreaker-copy">
              <span>START EASY</span>
              <h3>처음 말을 거는 순간까지만<br />운영진이 도울게요.</h3>
              <p>구체적인 프로그램은 아직 비워둡니다. 파티의 중심은 게임이 아니라 그날 모인 사람과 대화니까요.</p>
            </div>
          </div>
        </section>

        <section className="scenes section" id="scenes">
          <div className="section-heading scenes-heading">
            <div className="section-index">004 / SCENES</div>
            <div>
              <h2>10년 치 장면이<br />이미 쌓여 있어요.</h2>
              <p>거실에서, 한강에서, 파티룸에서. 아무사람이 아는 사람이 되는 동안 남은 사진들.</p>
            </div>
          </div>
          <SceneStrip />
        </section>

        <section className="event section" id="event">
          <div className="event-poster">
            <div className="event-poster-top">
              <span>2026</span>
              <span>AMSR</span>
            </div>
            <p>OLD FRIENDS<br />BRING NEW FRIENDS</p>
            <div className="event-poster-shape" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
          </div>
          <div className="event-content">
            <div className="section-index">005 / NEXT PARTY</div>
            <h2>오랜만에,<br />다시 엽니다.</h2>
            <dl className="event-facts">
              <div><dt>인원</dt><dd>32명</dd></div>
              <div><dt>일정</dt><dd>9월 12일 토요일</dd></div>
              <div>
                <dt>장소</dt>
                <dd>
                  스페이스M
                  <br />서울 마포구 양화로15길 17 4층
                  <span className="map-links">
                    <a href="https://naver.me/F1rGEh3l" target="_blank" rel="noreferrer">네이버 지도 ↗</a>
                    <a
                      href="https://map.kakao.com/link/map/스페이스M,37.5545421,126.9190133"
                      target="_blank"
                      rel="noreferrer"
                    >
                      카카오맵 ↗
                    </a>
                  </span>
                </dd>
              </div>
              <div>
                <dt>참가비</dt>
                <dd>
                  45,000원
                  <br /><span className="fact-sub">토스뱅크 100117758134 (이태훈)</span>
                </dd>
              </div>
            </dl>
            <Link className="button button-dark" href="/apply">
              {applicationsOpen ? "32명 안에 들어가기" : "신청서 먼저 보기"} <Arrow />
            </Link>
          </div>
        </section>

        <section className="closing section">
          <p className="closing-small">DON&apos;T BE A STRANGER</p>
          <h2>아무사람으로 와서,<br />아는 사람으로 가세요.</h2>
          <Link className="closing-link" href="/apply">
            <span>{applicationsOpen ? "참가 신청" : "신청서 미리보기"}</span>
            <Arrow />
          </Link>
        </section>
      </main>

      <footer className="footer">
        <span>아무사람대잔치</span>
        <span>2016—2026</span>
        <span>MADE BY TODARI</span>
      </footer>
    </div>
  );
}
