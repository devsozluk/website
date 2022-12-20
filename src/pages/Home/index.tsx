import Entry from "@/components/Entry";
import altogic from "@/libs/altogic";
import type { IEntry } from "@/types";
import { removeUnique } from "@/utils";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<IEntry[] | null>(null);

  useEffect(() => {
    const getLatestTopics = async () => {
      const { data, errors } = await altogic.endpoint.get("/entry?sort=createdAt:desc");
      setEntries(removeUnique(data.result, "topic"));
    };
    getLatestTopics();
  }, []);

  return (
    <div className="flex flex-col max-w-3xl gap-y-10 pb-10 divide-tertiary divide-opacity-50 divide-y-[1px]">
      {entries?.map((entry, index) => (
        <div key={index} className="flex flex-col max-w-3xl gap-y-5 pt-3">
          <div className="flex justify-between items-center">
            <Link to={"/konu/" + entry.topic.slug} className="text-primary font-bold text-lg mb-1">
              {entry.topic.title}
            </Link>
            <div className="flex gap-x-3 text-xs font-bold mt-2">
              <span className="flex items-center gap-x-1">
                <AiOutlineEye size={16} />
                {entry.topic.viewCount}
              </span>
            </div>
          </div>
          <Entry entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default Home;
