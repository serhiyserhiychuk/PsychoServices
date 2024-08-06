export const selectLoading = (state) => state.psychologists.loading;

export const selectError = (state) => state.psychologists.error;

export const selectPsychologists = (state) => state.psychologists.items;

export const selectCurrentPsychologist = (state) =>
  state.psychologists.currentPsychologist;
