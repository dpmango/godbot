const getTickDistance = ({
  targetTime,
  interval,
}: {
  targetTime: dayjs.Dayjs;
  interval: number;
}) => {
  const timeNow = dayjs();
  const diff = timeNow.diff(targetTime, 'minutes');

  return Math.floor(diff / interval);
};

const getIntervalMinues = (time: string) => {
  switch (time) {
    case '1m':
      return 1;
    case '15m':
      return 15;
    case '1h':
      return 60;
    case '1d':
      return 60 * 24;
    default:
      return 1;
  }
};

const batchFetchChart = async ({
  distanceStart,
  distanceEnd,
}: {
  distanceStart: number;
  distanceEnd: number;
}) => {
  // const intervalTotalTicks = distanceStart - distanceEnd;

  const wantedDistance = Math.ceil(distanceStart / 100);
  const requestPagesBounds = [wantedDistance - 1, wantedDistance, wantedDistance + 1] as number[];
  const promisesToRequest = [] as Promise<any>[];

  requestPagesBounds.forEach((page) => {
    const paginationParams = buildParams({ page, paginated_by: 100 });

    //   api(`get_graph/${currentCoin}/${currentTime}/`, {
    promisesToRequest.push(
      api(`get_graph/BTC/15m/`, {
        params: paginationParams,
      })
    );
  });

  let collectedData = await Promise.all(promisesToRequest);

  collectedData = collectedData
    .reduce((acc, x) => {
      acc = [...acc, ...(x.data.actual_data || [])];
      return acc;
    }, [])
    .map((x: IGraphTickDto) => ({
      ...x,
      originalTime: x.timestamp,
      timestamp: timeToTz(x.timestamp),
    }))
    .filter((x: IGraphTickDto) => x.timestamp);

  collectedData = [...new Map([...collectedData].map((x) => [x['timestamp'], x])).values()]
    .sort((a, b) => a.timestamp - b.timestamp)
    .filter((x) => {
      const timeTick = dayjs(utcToZonedTime(x.timestamp * 1000, 'Etc/UTC'));
      return (
        (timeTick.isAfter(currentStage.from) && timeTick.isBefore(currentStage.to)) ||
        timeTick.isSame(currentStage.from) ||
        timeTick.isSame(currentStage.to)
      );
    });

  dispatch(setStateDataForce(collectedData));

  return collectedData;
};
