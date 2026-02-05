import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Decide when GAI is appropriate in research</h1>

      <div className="card">
        <h2>How it works</h2>
        <p>
          In this exercise, you'll face a series of research scenarios
          where generative AI (GAI) might be used. For each scenario, you'll
          decide whether using GAI is:
        </p>
        <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem" }}>
          <li>
            <strong>Approve:</strong> GAI use is appropriate here.
          </li>
          <li>
            <strong>Approve with conditions:</strong> GAI use is OK if certain
            safeguards are met.
          </li>
          <li>
            <strong>Disapprove:</strong> GAI should not be used in this case.
          </li>
        </ul>
        <p>
          If you select "Approve with conditions," you'll choose which
          safeguards matter most to you. Your choices will help reveal your
          personal ethical framework around research AI use.
        </p>
      </div>

      <div className="card">
        <h2>Privacy & Data</h2>
        <p>
          <strong>Everything stays on your device.</strong> Your responses are
          saved only in your browser's local storage. Nothing is uploaded to any
          server, and we collect no data about you or your choices. You can see
          your results, download them as JSON, and clear them whenever you like.
        </p>
      </div>

      <div className="card">
        <h2>Ready?</h2>
        <div className="btnRow">
          <Link href="/play" className="btn btnPrimary">
            Begin Assessment →
          </Link>
          <Link href="/results" className="btn btnPrimary">
            View Results
          </Link>
        </div>
      </div>
    </div>
  );
}
