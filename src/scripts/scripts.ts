function timeDifference(date: any) {
  let now: any = new Date();

  let diff = date - now;
  return Math.round(diff / 1000);
}

export { timeDifference };
