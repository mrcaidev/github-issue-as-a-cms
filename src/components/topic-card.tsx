import { Link } from "./common/link";

interface IProps {
  index?: number;
  topic: string;
  num: number;
}

export const TopicCard = ({ index = 0, topic, num }: IProps) => (
  <div
    className="flex justify-between items-center gap-x-4 relative px-6 py-4 rounded-md bg-dim animate-pop shadow-md hover:shadow-lg transition-shadow"
    style={{
      animationDelay: `${index * 0.2}s`,
      animationFillMode: "backwards",
    }}
  >
    <h2>
      <Link
        href={"/topics/" + topic}
        className="px-2 py-1 font-bold text-lg sm:text-xl lg:text-2xl hover:text-highlight before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0"
      >
        {topic}
      </Link>
    </h2>
    <p className="text-base sm:text-lg text-dim">
      {num}
      <span className="hidden sm:inline md:hidden lg:inline"> Posts</span>
    </p>
  </div>
);
