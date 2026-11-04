import { createContext, useContext, useRef, useState } from "react";

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const ticketCounter = useRef(0);

  // Menambahkan ticket
  const addTicket = (ticket) => {
    ticketCounter.current += 1;
    const ticketNumber = `HD-${String(
      ticketCounter.current
    ).padStart(3, "0")}`;

    setTickets((previousTickets) => [
      ...previousTickets,
      {
        ...ticket,
        id: Date.now(),
        ticketNumber,
        status: "Open",
        createdAt: new Date().toLocaleString("id-ID"),
      },
    ]);
  };

  // Mengubah status ticket
  const updateTicketStatus = (id, status) => {
    setTickets((previousTickets) =>
      previousTickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status,
            }
          : ticket
      )
    );
  };

  // Menghapus satu ticket berdasarkan id
  const deleteTicket = (id) => {
    setTickets((previousTickets) =>
      previousTickets.filter((ticket) => ticket.id !== id)
    );
  };

  // Menghapus seluruh ticket
  const clearTickets = () => {
    setTickets([]);
    ticketCounter.current = 0;
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicketStatus,
        deleteTicket,
        clearTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  return useContext(TicketContext);
}
