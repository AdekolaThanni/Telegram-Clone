const useModalBestPosition =
  () =>
  (event, { overlayId, modalData }) => {
    const overlayData = document
      .getElementById(overlayId)
      .getBoundingClientRect();
    let left;
    let top;

    // Co ordinates of click position
    const clickX = event.clientX;
    const clickY = event.clientY;

    //   Get horizontal position
    const clickXPositionInOverlay = clickX - overlayData.left;
    const canModalFitX =
      overlayData.width - clickXPositionInOverlay > modalData.width;

    left = canModalFitX
      ? clickXPositionInOverlay
      : overlayData.width - modalData.width;

    // Get vertical position
    const clickYPositionInOverlay = clickY - overlayData.top;

    const canModalFitY =
      overlayData.height - clickYPositionInOverlay > modalData.height;

    // If click position is too close to the bottom
    top = canModalFitY
      ? clickYPositionInOverlay
      : overlayData.height - modalData.height;

    return {
      left,
      top,
    };
  };

export default useModalBestPosition;
