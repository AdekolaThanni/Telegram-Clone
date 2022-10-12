const useModalBestPosition = ({
  event,
  elemData: { overlayData, modalData },
}) => {
  const clickX = event.clientX;
  const clickY = event.clientY;

  if (clickX + modalData.width > overlayData.width)
    return {
      left: 0,
      top: 0,
    };
};

export default useModalBestPosition;
