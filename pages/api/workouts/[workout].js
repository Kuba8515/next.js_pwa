import { getExercisebyBodypart } from '../../../util/database';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  } else {
    const exercises = getExercisebyBodypart(req.query.bodyPart);
    res.status(200).json(exercises);
  }
}
