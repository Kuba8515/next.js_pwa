import { getExercises } from '../../../util/database';

export default function handler(req, res) {
  console.log('query', req.query);
  console.log('body', req.body);
  console.log('method', req.method);
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  } else {
    const exercises = getExercises();
    res.status(200).json(exercises);
  }
}
