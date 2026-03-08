'use client';


import { CommonTable } from "../shared/common-table";
import { useUsersColumns } from "./users-columns";
import { useGetUsers } from "@/lib/hooks/users";
import { useTranslations } from "next-intl";
import { FadeLoader } from "react-spinners";


export function UsersTable() {
  const { data: usersData, isPending } = useGetUsers();
  const t = useTranslations('entities.users');
  const columns = useUsersColumns();

  const handleBulkDelete = () => {
    // Logika usuwania zaznaczonych cytatów
  };

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center py-10">
          <FadeLoader color="#4B5563" />
        </div>
      ) : (
        <CommonTable
          columns={columns}
          data={usersData || []}
          searchPlaceholder={t('search.placeholder')}
          searchColumnKey="username"
          onBulkDelete={handleBulkDelete}
        />
      )}
    </>
  );
}