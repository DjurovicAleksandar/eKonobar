export const warningHandler = () => {
  const response = confirm(
    `Please note that any unsaved data will be lost. If you have saved the data, please click 'Ok'. If you haven't saved the data, please click 'Cancel'.`
  );

  return response;
};

export const deleteWarning = () => {
  const response = confirm(
    `Please be aware that all deleting changes will be saved. If you wish to proceed, please click 'Ok'. If this was a mistake, please click 'Cancel'`
  );

  return response;
};
