import Separator from "@/components/separator";
import { publications } from "@/pages/about/utils.ts";

export default function Publications() {
  return (
    <div className="py-16 w-[80%] flex flex-col items-center gap-y-8">
      <Separator title="Publications" />
      <ol className="list-decimal pl-6 gap-y-4 flex flex-col">
        {publications.map((publication, i) => (
          <li key={i}>
            {publication.desc}
            {
              <>
                <br />
                <a target="_blank" rel="noopener noreferrer" href={publication.link}>
                  {publication.link}
                </a>
              </>
            }
          </li>
        ))}
      </ol>
    </div>
  );
}
