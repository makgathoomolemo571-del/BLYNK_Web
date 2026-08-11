import "./BudgetCard.css";

export default function BudgetCard({ advertisement }) {
  if (!advertisement) return null;

  const budget = advertisement.budget || 0;
  const spent = advertisement.spent || 0;

  const remaining = budget - spent;

  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  return (
    <div className="ad-budget-card">

      <div className="ad-budget-header">

        <div>
          <h3>Campaign Budget</h3>
          <span>{advertisement.title}</span>
        </div>

        <div
          className={
            advertisement.status === "active"
              ? "status active"
              : advertisement.status === "paused"
              ? "status paused"
              : "status completed"
          }
        >
          {advertisement.status}
        </div>

      </div>

      <div className="budget-grid">

        <div className="budget-box">
          <small>Total Budget</small>
          <h2>
            R
            {budget.toLocaleString()}
          </h2>
        </div>

        <div className="budget-box">
          <small>Spent</small>
          <h2>
            R
            {spent.toLocaleString()}
          </h2>
        </div>

        <div className="budget-box">
          <small>Remaining</small>
          <h2>
            R
            {remaining.toLocaleString()}
          </h2>
        </div>

      </div>

      <div className="budget-progress">

        <div className="progress-label">

          <span>Budget Used</span>

          <span>
            {percentage.toFixed(1)}%
          </span>

        </div>

        <div className="progress">

          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`
            }}
          />

        </div>

      </div>

      <div className="budget-stats">

        <div>

          <strong>
            {advertisement.impressions?.toLocaleString()}
          </strong>

          <span>Impressions</span>

        </div>

        <div>

          <strong>
            {advertisement.clicks?.toLocaleString()}
          </strong>

          <span>Clicks</span>

        </div>

      </div>

    </div>
  );
}