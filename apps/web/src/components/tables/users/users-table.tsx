'use client';

import { useState, useMemo } from 'react';
import { CommonTable } from "../shared/common-table";
import { useUsersColumns } from "./users-columns";
import { useGetUsers } from "@/lib/hooks/auth";
import { useTranslations } from "next-intl";
import { FadeLoader } from "react-spinners";
import { Quote } from "@/lib/types/quote";

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