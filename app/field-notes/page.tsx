import FieldNotesClient from "./field-notes-client";

export const metadata = {
  title: "Field Notes",
  description: "Browse every sourced story in the atlas.",
};

export default function FieldNotesPage() {
  return <FieldNotesClient />;
}
