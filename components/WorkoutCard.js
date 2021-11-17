import Image from 'next/image';
import Link from 'next/link';

const WorkoutCard = ({ image, name }) => {
  return (
    <div className="border-solid border-4 border-light-blue-500 rounded-lg p-8 py-4 m-4">
      <Image alt="workout" src={image} height={200} width={320} />
      <Link href={`/workout/${name.toLowerCase()}`}>
        <div>
          <h3>{name}</h3>
          <p>ADD NOW</p>
        </div>
      </Link>
    </div>
  );
};
export default WorkoutCard;
