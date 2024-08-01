export const selectLoading = (state) => state.campers.loading;

export const selectError = (state) => state.campers.error;

export const selectCampers = (state) => state.campers.items;

export const selectCurrentCamper = (state) => state.campers.currentCamper;
