const checkIfVoted = (stat, votes) => {
  const { voteType, teacherId } = stat;
  return votes.find(v => v.teacherId === teacherId && v.voteType === voteType);
};

export default checkIfVoted;
