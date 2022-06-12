import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    body: string()
      .required("Body is required")
  }),
};

export const createInstagramPostSchema = object({
  ...payload,
});