import { ExpandableContent } from "@components/ui/ExpandableContent";

interface Props {
  id: string;
  email: string;
}

export const UserInfo = ({ id, email }: Props) => {
  return (
    <ExpandableContent title="Aktualne Dane">
      <div className="flex w-full flex-col items-center justify-center bg-accent p-4">
        <p className="text-2xl">
          <span className="font-bold uppercase">ID:</span> {id}
        </p>
        <p className="text-2xl">
          <span className="font-bold uppercase">Email:</span> {email}
        </p>
      </div>
    </ExpandableContent>
  );
};
