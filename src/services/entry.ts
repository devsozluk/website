import altogic from "@/libs/altogic";

export const CreateEntry = async (userId: string, data: { content: string; topic: string }): Promise<{ errors?: any; data?: any }> => {
  const { data: entryData, errors } = await altogic.endpoint.post("/entry", { ...data, author: userId });
  if (errors) return { errors };

  return { data: entryData };
};

export const FetchEntries = async (topicId: string) => {
  const { data, errors } = await altogic.db
    .model("entry")
    .lookup({ field: "author" })
    .lookup({ field: "topic" })
    .filter(`this.topic._id == '${topicId}'`)
    .get();
  if (errors) return { errors };

  return { data };
};

export default {
  CreateEntry,
  FetchEntries,
};
