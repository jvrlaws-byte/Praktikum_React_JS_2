import { useTicket } from "../context/TicketContext";

const categoryNames = [
  "Hardware",
  "Software",
  "Network",
  "Account",
  "Security",
];

function TicketSummary() {
  const { tickets } = useTicket();

  const total = tickets.length;

  const open = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const categoryCounts = categoryNames.map((name) => ({
    name,
    count: tickets.filter(
      (ticket) => ticket.category === name
    ).length,
  }));

  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6 className="text-muted">Total Ticket</h6>
              <h2>{total}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6 className="text-muted">Open</h6>
              <h2>{open}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6 className="text-muted">In Progress</h6>
              <h2>{progress}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              <h6 className="text-muted">Resolved</h6>
              <h2>{resolved}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* JUMLAH TICKET PER KATEGORI */}
      <div className="row row-cols-2 row-cols-md-5 g-3 mb-4">
        {categoryCounts.map((item) => (
          <div className="col" key={item.name}>
            <div className="card shadow-sm text-center">
              <div className="card-body py-2">
                <h6 className="text-muted mb-1">{item.name}</h6>
                <h4 className="mb-0">{item.count}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TicketSummary;
