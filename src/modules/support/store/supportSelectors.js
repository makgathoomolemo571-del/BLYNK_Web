export const selectSupportState = (state) => state.support;

export const selectSupportTickets = (state) =>
  state.support.tickets;

export const selectSupportCurrentTicket = (state) =>
  state.support.currentTicket;

export const selectSupportLoading = (state) =>
  state.support.loading;

export const selectSupportError = (state) =>
  state.support.error;