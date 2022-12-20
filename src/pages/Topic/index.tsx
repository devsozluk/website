import Entry from "@/components/Entry";
import Button from "@/components/UI/Button";
import { useAuthContext } from "@/context/AuthContext";
import altogic from "@/libs/altogic";
import EntryService from "@/services/entry";
import type { IEntry, ITopic } from "@/types";
import { AddEntrySchema } from "@/validations";
import MDEditor from "@uiw/react-md-editor";
import classNames from "classnames";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Form, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TopicLoader from "./TopicLoader";

interface addEntryData {
  content: string;
}

const Topic: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [topic, setTopic] = useState<ITopic>({} as ITopic);
  const [entries, setEntries] = useState<IEntry[] | null>(null);
  const { user, isloggedIn } = useAuthContext();
  const initialValues: addEntryData = { content: "" };

  useEffect(() => {
    const getBySlugTopic = async () => {
      setIsLoading(true);
      const { data: topicData, errors } = await altogic.endpoint.get(`/topics/bySlug?slug=${slug}`);
      if (!topicData) {
        toast.warning("Aradığınız konu yok veya silinmiş.");
        return navigate("/");
      }
      const { data: entriesData } = await altogic.endpoint.get(`/entry?filter=this.topic._id == '${topicData._id}'`);
      setTopic(topicData);
      setEntries(entriesData.result);
      setIsLoading(false);
    };
    getBySlugTopic();
  }, [, location]);

  const handleAddEntry = async ({ content }: addEntryData, { setSubmitting }: any) => {
    setIsLoading(true);
    await EntryService.CreateEntry(user?._id as string, { content, topic: topic._id });
    const { data } = (await EntryService.FetchEntries(topic._id)) as { data: IEntry[] };
    setEntries(data);
    setIsLoading(false);
  };

  if (isLoading) return <TopicLoader />;

  return (
    <div className="flex flex-col max-w-3xl gap-y-5 pb-10">
      <div className="flex justify-between items-center">
        <Link to={"/konu/" + topic.slug} className="text-primary font-bold text-lg mb-1">
          {topic.title}
        </Link>
        <div className="flex gap-x-3 text-xs font-bold mt-2">
          <span className="flex items-center gap-x-1">
            <AiOutlineEye size={16} />
            {topic.viewCount}
          </span>
        </div>
      </div>
      {entries?.map((entry, index) => (
        <Entry entry={entry} key={index} />
      ))}
      {isloggedIn && (
        <Formik validationSchema={AddEntrySchema} initialValues={initialValues} onSubmit={handleAddEntry}>
          {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
            <>
              <Form className="mt-10 space-y-8 w-full">
                <div>
                  <MDEditor
                    height={200}
                    className={classNames("bg-transparent rounded-lg border-tertiary border-[1px]", { "border-red-500": errors.content })}
                    value={values.content}
                    onChange={(value) => setFieldValue("content", value)}
                    preview="edit"
                  />
                  {errors.content && <p className="pt-1 text-sm text-red-500">{errors.content}</p>}
                </div>
                <Button loading={isSubmitting} click={handleSubmit} disabled={!isValid}>
                  Gönder
                </Button>
              </Form>
            </>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Topic;
