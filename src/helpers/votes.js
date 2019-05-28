const checkIfVoted = (stat, votes) => {
  const { voteType, teacherId, courseId } = stat;
  return votes.find(
    v =>
      (v.info.foreign_key === teacherId || v.info.foreign_key === courseId) &&
      v.voteType === voteType
  );
};

export default checkIfVoted;
