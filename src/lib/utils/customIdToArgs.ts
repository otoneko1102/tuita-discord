function customIdToArgs(id: string) {
  return id.split("-").slice(1);
}

export default customIdToArgs;
