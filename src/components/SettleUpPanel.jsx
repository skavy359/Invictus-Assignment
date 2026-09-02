import { formatMoney } from "../lib/money.js";

export default function SettleUpPanel({ members, balances, transfers }) {
  return (
    <section className="card">
      <h2>Settle up</h2>

      {members.map((member) => {
        const balance = Number(balances[member.id] || 0);

        if (balance > 0.005) {
          return (
            <div className="transfer" key={member.id}>
              <strong>{member.name}</strong> is owed {formatMoney(balance)}
            </div>
          );
        }

        if (balance < -0.005) {
          return (
            <div className="transfer owe" key={member.id}>
              <strong>{member.name}</strong> owes {formatMoney(Math.abs(balance))}
            </div>
          );
        }

        return (
          <div className="transfer settled" key={member.id}>
            <strong>{member.name}</strong> is settled up.
          </div>
        );
      })}

      {transfers.length > 0 && (
        <>
          <div className="subhead">Suggested payments</div>
          {transfers.map((t, i) => (
            <div className="transfer" key={`${t.from}-${t.to}-${i}`}>
              <strong>{t.fromName}</strong> pays <strong>{t.toName}</strong>{" "}
              {formatMoney(t.amount)}
            </div>
          ))}
        </>
      )}

      <p className="hint">
        After these payments, every member's net should be $0.00.
      </p>
    </section>
  );
}