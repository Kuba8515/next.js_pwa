import Image from 'next/image';
import Link from 'next/link';

export default function WorkoutCard(props) {
  return (
    <div className="flex border-2 p-3 rounded shadow-sm">
      <div className="flex flex-col ml-4">
        {/* <Link href={`/workouts/${props.link}`}> */}
        {/* <a> */}
        <h3 className="text-m font-bold">{props.title}</h3>
        <p className="text-l">{props.description}</p>
        <a
          className="hover:bg-blue-100 text-blue-400 pt-4"
          href={`/workouts/${props.link}`}
        >
          View this routine
        </a>
        {/* </a> */}
        {/* </Link> */}
      </div>
    </div>
  );
}
